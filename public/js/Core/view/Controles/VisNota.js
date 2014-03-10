Ext.define('SmPlus.view.Controles.VisNota', {
    extend: 'Ext.window.Window',
    alias: 'widget.visnota',
    /*layout:{
        type:'border'
    },*/
    autoShow:true,
    
    modal:true,
    
    initComponent: function () {
        var me = this;
        var text = me.msg;
      
        if (text == "" || text ==null || text == undefined) text = "<b><center>No Hay Notas</center></b>";
        Ext.applyIf(me, {

            title: me.nemo + me.titulo,

            items: [
                {
                    xtype: 'panel',
                    autoScroll: true,
                    maxHeight:380,
                    region: 'center',
                    
                    items: [
                        {
                            html: text,
                            frame:true
                        }
                    ]                
                },
                {
                    xtype:'form',
                    items: [{
                        xtype: 'textareafield',
                        value: '',
                        allowBlank:false,
                        region: 'south',
                        width: '98%',
                        padding: 5

                    }],
                    buttons: [
                        {
                            text: 'Guardar',
                            iconCls: 'icon-disk',
                            handler: me.fn,
                            formBind:true
                        }
                    ]
                    

                }
                
            ]
        });
        this.callParent(arguments);
    }
});