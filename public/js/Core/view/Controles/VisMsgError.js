Ext.define('SmPlus.view.Controles.VisMsgError', {
    extend: 'Ext.window.Window',
    alias: 'widget.vismsgerror',
    /*layout:{
        type:'border'
    },*/
    msg: '',
    mshError:'',
    autoShow: true,
    width:400,
    modal: true,

    initComponent: function () {
        var me = this;
        var text = me.msg;
        var text2 = me.msgError;

        if (text == "" || text == null || text == undefined) text = "<b><center>No Hay Mensaje</center></b>";
        if (text2 == "" || text2 == null || text2 == undefined) text2 = "<b><center>No Hay Errores</center></b>";
        if (me.title == "" || me.title == null || me.title == undefined) me.title = WorkSpace.Label.Informacion;
        Ext.applyIf(me, {

       
            
            items: [
                {
                    xtype: 'panel',
                    autoScroll: true,
                    maxHeight: 380,
                    region: 'center',

                    items: [
                        {
                            html: text,
                            frame: true
                        }
                    ]
                },
                {
                    xtype: 'form',
                    title: 'Detalles',
                    collapsed:true,
                    collapsible:true,
                    items: [{
                        xtype: 'textareafield',
                        
                        allowBlank: false,
                        value:text2,
                        width: '98%',
                        height:200,
                        padding: 5

                    }]
                },
                {
                    xtype: 'toolbar',
                    items: [
                        {
                            xtype: 'label',
                            flex:1
                        },
                        {
                            xtype: 'button',
                            iconCls:'icon-ok',
                            text: 'Aceptar',
                            handler: function () {
                                me.close();
                            }
                        }
                    ]
                }

            ]
        });
        this.callParent(arguments);
    }
});