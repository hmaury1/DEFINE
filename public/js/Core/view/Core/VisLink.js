// no esta en uso, el link se definen en VisNavegador
Ext.define("SmPlus.view.Core.VisLink", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.vislink',
    url: '',
    name: '',
    width:'100%',
    layout:{
        type:'hbox'
    },
    //width: 70,
    //title:'prueba',
    padding: 10,
    border: 0,


    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                        {
                            xtype: 'label',
                            text:'',
                            flex:1
                        },
                        {
                            xtype: 'button',
                            //padding:20,
                            // height: 90,
                            //padding: 10,
                            width: 120,
                            text: me.tooltip,
                            tooltip: me.tooltip,
                            iconCls: 'icon-link',
                            scale: "large",
                            iconAlign: "top"
                        },
                        {
                            xtype: 'label',
                            text: '',
                            flex: 1
                        }

            ]


        });

        me.callParent(arguments);
    }

});
