Ext.define("Isecure.view.Core.VisLogin", {
    extend: 'Ext.window.Window',
    alias: 'widget.vislogin',
    //iconCls:'icon-fingerprint',
    layout:{
        type:'border'
    },
    border: 0,
    autoHeight: true,
    resizable:false,
    width: 400,
    height:200,
    title: "Define",
    closable:false,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                        {
                            xtype: 'form',
                            region: 'center',
                            flex: 1,
                            padding:2,
                            //frame:true,
                            layout:{
                                type:'border'
                            },
                            items: [
                                    {
                                        type: 'container',
                                        region: 'west',
                                        padding: 2,
                                        //frame:true,
                                        bodyCls: "background-login",
                                        width:140
                                    },
                                    {
                                        type: 'container',
                                        region: 'center',
                                        padding: 2,
                                        //frame:true,
                                        
                                        flex:1,
                                        items:[
                                            
                                            {
                                                xtype: 'textfield',
                                                //flex: 1,
                                                padding: 10,
                                                labelWidth: 70,
                                                name: 'usuario',
                                                //emptyText: 'Usuario',
                                                fieldLabel: WorkSpace.Label.Textfield_Usuario


                                            },
                                            {
                                                xtype: 'textfield',
                                                inputType: 'password',
                                                padding: 10,
                                                //flex: 1,
                                                name: 'contrasena',
                                                //emptyText: 'Clave',
                                                fieldLabel: WorkSpace.Label.Textfield_Contraseña,
                                                labelWidth: 70
                                            }
                                        ]
                                    }
                                   

                            ],
                            buttons: [
                                {
                                    xtype: 'button',
                                    text: WorkSpace.Label.Boton_Aceptar,
                                    tooltip: WorkSpace.Label.Titulo_Ventana_Autenticacion,
                                    action: 'clickLogin',
                                    iconCls: 'icon-fingerprint'
                                    

                                }, {
                                    xtype: 'button',
                                    text: WorkSpace.Label.Boton_Cancelar,
                                    //tooltip: WorkSpace.Label.Titulo_Ventana_Autenticacion,
                                    action: 'clickCancelar',
                                    iconCls: 'icon-cancelar'
                                    

                                }

                            ]

                        }

            ],
            tools: [
                {
                    xtype: 'button',
                    //text: WorkSpace.Label.Boton_DataBaseEdit,
                    action: 'clickConexion',
                    iconCls: 'icon-databaseEdit'

                }
                

            ]


        });

        me.callParent(arguments);
    }

});