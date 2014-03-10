Ext.define('SmPlus.view.VisPrincipal', {
    extend: 'Ext.container.Viewport',
    autoRender: true,
    alias: 'widget.visprincipal',
    layout: {
        type: 'border'
    },

    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype:'panel',
                    region: 'south',
                    layout: {
                        type:'hbox'
                    },
                    items:[
                         
                         {
                             xtype: 'visbarraprincipal',
                             hidden: true,
                             flex:1
                         }
                    ]
                },
               
                {
                    xtype:'visnavegador',
                    region: 'west',
                    bodyCls: "background-SM",
                    hidden:true
                },
                {
                    xtype: 'tabpanel',
                    region: 'center',
                    
                    activeTab: 0,
                    layout: {
                        type: 'border'
                    },
                    name: 'tpContenido',
                    items: [
                        {
                            xtype: 'visPanelControl'
                           
                        }
                    ]
    
                }

            ]
        });

        me.callParent(arguments);
    }

});