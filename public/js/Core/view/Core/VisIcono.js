Ext.define("SmPlus.view.Core.VisIcono", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.visicono',
    url: '',
    name:'',
    //width: 70,
    //title:'prueba',
    padding:10,
    border: 0,
    

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
               
                        {
                            xtype: 'button',
                            //padding:20,
                           // height: 90,
                            //padding: 10,
                            width: 100,
                            name: me.name,
                            tooltip:me.tooltip,
                            text:me.text,
                            icon: me.url,
                            scale: "large",
                            iconAlign: "top"
                        }
                 
            ]


        });

        me.callParent(arguments);
    }

});
