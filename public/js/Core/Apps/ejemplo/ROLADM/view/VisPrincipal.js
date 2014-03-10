Ext.define('SmPlus.Apps.ejemplo.ROLADM.view.VisPrincipal', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.visprincipalROLADM',
    layout: {
        type: 'border'
    },
    region:'center',
    /*width: 500,
    height:500,*/
    flex: 1,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'toolbar',
                    region: 'north',
                    height:28,
                    items: [
                        {
                            xtype: 'button',
                            flex:1,
                            text: 'ok',
                            name:'ok'
                            
                        }
                    ]
                },{
                    xtype: 'panel',
                    bodyCls: "background-SM",
                    region: 'center',
                    flex:1

                }

            ]
        });

        me.callParent(arguments);
    }
    
});