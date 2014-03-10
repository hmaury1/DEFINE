Ext.define('SmPlus.view.Controles.VisHelpQbe', {
    extend: 'Ext.form.field.Trigger',
    alias: 'widget.vishelpqbe',

    triggerCls: Ext.baseCSSPrefix + 'form-search-trigger',
    autoWidth: true,
    isLoaded: false,

    initComponent: function () {

        var me = this;
        me.triggerCls = 'x-form-help-trigger';
        me.createHelpWindow(me);

        this.callParent(arguments);

        this.on(
            'specialkey', function (f, e) {
                if (e.getKey() == e.ENTER) {

                    this.enterKey();
                    // this.onTriggerClick();
                }
            },
        this);



    },



    createHelpWindow: function (me) {

        Ext.define('Model_' + me.fieldLabel, {
            extend: 'Ext.data.Model',
            fields: [
               '' + me.name
            ]

        });

        this.myStore = Ext.create('Ext.data.Store', {
            model: 'Model_' + me.fieldLabel,
            proxy: {
                type: 'ajax',
                url: WorkSpace.Url.Datos_Pcl,
                reader: {
                    type: 'json',
                    root: 'data',
                    totalProperty: 'totalCount'
                },
                extraParams: {
                    nemonico:me.nemonico,
                    field: me.name
                }
            },
            autoLoad: false
        });

        var HelpGrid = Ext.create('Ext.grid.Panel', {
            //title: 'Simpsons',
            region: 'center',
            store: this.myStore,
            columns: [
                { text: me.fieldLabel, dataIndex: me.name, flex: 1 }

            ],
            height: 400,
            width: 400,
            bbar: Ext.create('Ext.PagingToolbar', {
                store: this.myStore,
                displayInfo: true,
                displayMsg: '',
                emptyMsg: ''

            })
        });


        HelpGrid.on({
            itemdblclick: {
                fn: function (el, record, item, index, e, eOpts) {

                    me.selectValue();
                }, scope: me
            }
        });



        me.win = Ext.widget('window', {
            //title: 'Help : ' + me.myMeta.shortTitle,
            title:  ' : ',
            // iconCls: me.myMeta.protoIcon,
            closeAction: 'hide',
            //layout: 'fit',
            modal: true,
            width: 400, minWidth: 400,
            height: 400, minHeight: 400,
            resizable: true,
            layout: {
                type: 'border'

            },

            items: [{
                xtype: 'toolbar',
                items: [
                    {
                        height: 25,
                        xtype: 'textfield',
                        flex: 1,
                        validator: function (value) {
                            if (value == "") {
                                this.up('toolbar').down('container[name=_TOOLS_]').disable();
                            } else {
                                this.up('toolbar').down('container[name=_TOOLS_]').enable();
                            }
                            return true;
                        }

                    },
                    {
                        xtype: 'container',
                        name: '_TOOLS_',
                        disabled: true,
                        items: [

                    {
                        xtype: 'button',
                        width: 25,
                        text: '>',
                        tooltip: 'greater than - mayor que',
                        handler: function () { this.up('window').addText(this); }
                    },
                    {
                        xtype: 'button',
                        width: 25,
                        text: '<',
                        tooltip: 'less than - menor que',
                        handler: function () { this.up('window').addText(this); }
                    },
                    {
                        xtype: 'button',
                        width: 25,
                        text: '>=',
                        tooltip: 'most equal - mayor igual',
                        handler: function () { this.up('window').addText(this); }
                    },
                    {
                        xtype: 'button',
                        width: 25,
                        text: '<=',
                        tooltip: 'less equal - menor igual',
                        handler: function () { this.up('window').addText(this); }
                    },
                    {
                        xtype: 'button',
                        width: 25,
                        text: '<>',
                        tooltip: 'different - diferente',
                        handler: function () { this.up('window').addText(this); }
                    },
                    {
                        xtype: 'button',
                        width: 25,
                        text: ':',
                        tooltip: 'between - entre',
                        handler: function () { this.up('window').addText(this); }
                    },
                    {
                        xtype: 'button',
                        width: 25,
                        text: '*',
                        tooltip: 'contains - contiene',
                        handler: function () { this.up('window').addText(this); }
                    }
                        ]
                    }
                ],
                region: 'north'
            }, HelpGrid],

            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                defaults: { minWidth: 75 },
                items: [
                    { xtype: 'tbtext', text: '', id: me.idStBar },
                    { xtype: 'component', flex: 1 },
                    { xtype: 'button', text: WorkSpace.Label.Boton_Aceptar, scope: me, handler: me.doReturn, iconCls: 'icon-ok' },
                    { xtype: 'button', text: WorkSpace.Label.Boton_Cancelar, scope: me, handler: doCancel, iconCls: "icon-cancelar" }

                 //   { xtype: 'button', text: 'Edit', scope: me, handler: doEdit },
                 //   { xtype: 'button', text: 'New', scope: me, handler: doNew },
                ]
            }],

            addText: function (el) {
                var text = this.down('textfield').getValue();
                var text2 = "";
                for (i = 0; i < text.length; i++) {
                    var c = text.substring(i, i + 1);
                    if (!(c == '>' || c == '<' || c == '=' || c == '*')) {
                        if (c == ':') {
                            break;
                        } else {
                            text2 = text2 + c;
                        }

                    }

                }
                switch (el.text) {
                    case ':':

                        this.down('textfield').setValue(text2 + "" + el.text);
                        break;
                    case '*':

                        this.down('textfield').setValue(el.text + "" + text2 + "" + el.text);
                        break;

                    default:

                        this.down('textfield').setValue(el.text + "" + text2);

                }



            }

        });

        me.isLoaded = true;

        function doCancel() {
            //me.resetHelp()
            me.win.hide();
        }



    },



    onTriggerClick: function () {

        this.showHelpForm(this);
    },

    showHelpForm: function (me) {
        if (!me.isLoaded) return;
        me.win.show();
        me.win.down('textfield').setValue(me.getValue());
        me.myStore.load();
    },

    selectValue: function () {



        var records = this.win.down('gridpanel').getSelectionModel().getSelection();

        var record = records[0];

        var text = this.win.down('textfield').getValue();
        op = text.substring(text.length - 1, text.length);
        if (op == ':') {
            this.win.down('textfield').setValue(text + record.data[this.name]);
        } else {
            this.win.down('textfield').setValue(record.data[this.name]);
        }

    },

    doReturn: function () {

        this.setValue(this.win.down('textfield').getValue());

        this.win.hide();
    }





});


