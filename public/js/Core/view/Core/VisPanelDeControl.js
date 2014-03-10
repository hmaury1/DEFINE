Ext.define('SmPlus.view.Core.VisPanelDeControl', {
    extend: 'Ext.panel.Panel',
    bodyCls: "background-SM",
    iconCls: 'icon-controlpanel',
    //autoRender: true,
    alias: 'widget.visPanelControl',
    layout: {
        type: 'column'
    },
    //closable:true,
    bodyPadding: 30,
    title: 'SM',
    nemonico:'index',
    //title: WorkSpace.Label.Titulo_Vista_Panel_Control,
    initComponent: function () {
        var me = this;
        
/*
        for (var i = 0; i < me.records.length; i++) {
            me.records[i]['xtype'] = 'visicono';
        }
        */

        Ext.applyIf(me, {
            items: [

                {
                    xtype: 'dataview',
                    name: 'dvpanel',
                    itemSelector: 'div.thumb-wrap',
                    //emptyText: '',
                    loadMask:false,
                    trackOver: true,
                    overItemCls: 'x-item-over',
                    store: 'stoIconPanel',
                    tpl: [
                        '<tpl for=".">',
                        '<div class="thumb-wrap" id="{nemonico}" unselectable="on" style="width:120px;  text-align: center; float: left; margin: 5px;">',
                        '<div class="thumb"><img src="{srcIcon}" title="{tooltip}"></div>',
                        '<span>{text}</span>',
                        '</div>',
                        '</tpl>',
                        '<div class="x-clear"></div>'
                    ]
                }
            ],
            listeners: {
                render: function (view) {
                    view.el.unselectable();
                }
            }


        });

        me.callParent(arguments);
    }

});