Ext.define('SmPlus.view.QBE.VisWinHelpQbe', {
    extend: 'Ext.window.Window',
    alias: 'widget.viswinhelpqbe',
    //title: 'Help : ' + me.myMeta.shortTitle,
    title: ' : ',
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

    initComponent: function () {

        var me = this;
        me.triggerCls = 'x-form-help-trigger';
         
        Ext.define('Model_'+ me.nemonico + me.fieldLabel, {
            extend: 'Ext.data.Model',
            fields: [
               '' + me.name
            ]

        });
        me.myStore = Ext.create('Ext.data.Store', {
            model: 'Model_' + me.nemonico + me.fieldLabel,
            proxy: {
                type: 'ajax',
                url: WorkSpace.Url.Datos_Pcl,
                reader: {
                    type: 'json',
                    root: 'rows',
                    totalProperty: 'total'
                },
                extraParams: {
                    nemonico: me.nemonico,
                    field: me.name
                }
            },
            autoLoad: false
        });
        Ext.applyIf(me, {
            items:[
                {
                    xtype:'gridpanel',
                    region: 'center',
                    store: me.myStore,
                    columns: [
                        { text: me.fieldLabel, dataIndex: me.name, flex: 1 }

                    ],
                    height: 400,
                    width: 400,
                    bbar: Ext.create('Ext.PagingToolbar', {
                        store: me.myStore,
                        displayInfo: true,
                        displayMsg: '',
                        emptyMsg: ''

                    })
                },
                {
                    xtype: 'toolbar',
                    items: [
                        {
                            height: 25,
                            xtype: 'textfield',
                            name:'txtvalue',
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
                            action:'clickText'
                        },
                        {
                            xtype: 'button',
                            width: 25,
                            text: '<',
                            tooltip: 'less than - menor que',
                            action:'clickText'
                        },
                        {
                            xtype: 'button',
                            width: 25,
                            text: '>=',
                            tooltip: 'most equal - mayor igual',
                            action:'clickText'
                        },
                        {
                            xtype: 'button',
                            width: 25,
                            text: '<=',
                            tooltip: 'less equal - menor igual',
                            action:'clickText'
                        },
                        {
                            xtype: 'button',
                            width: 25,
                            text: '<>',
                            tooltip: 'different - diferente',
                            action:'clickText'
                        },
                        {
                            xtype: 'button',
                            width: 25,
                            text: ':',
                            tooltip: 'between - entre',
                            action:'clickText'
                        },
                        {
                            xtype: 'button',
                            width: 25,
                            text: '*',
                            tooltip: 'contains - contiene',
                            action:'clickText'
                        }
                            ]
                        }
                    ],
                    region: 'north'
                }
            ], dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                defaults: { minWidth: 75 },
                items: [
                    { xtype: 'tbtext', text: '', id: me.idStBar },
                    { xtype: 'component', flex: 1 },
                    { xtype: 'button', text: WorkSpace.Label.Boton_Aceptar,  scope: me, action:'aceptar',  iconCls: 'icon-ok' },
                    { xtype: 'button', text: WorkSpace.Label.Boton_Cancelar, scope: me, action:'cancelar', iconCls: "icon-cancelar", },

                 //   { xtype: 'button', text: 'Edit', scope: me, handler: doEdit },
                 //   { xtype: 'button', text: 'New', scope: me, handler: doNew },
                ]
            }]


        });


        this.callParent(arguments);


    }

});


