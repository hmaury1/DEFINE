Ext.define("Isecure.view.Core.VisContrasena", {
    extend: 'Ext.window.Window',
    alias: 'widget.viscontrasena',
    //iconCls:'icon-fingerprint',
    modal:true,
    region: 'center',
    border: 0,
    autoHeight: true,
    width: 270,
    title: WorkSpace.Label.Title_Cambio_contrasena,
    closable: false,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                        {
                            xtype: 'form',

                            frame: true,
                            items: [

                                    {
                                        xtype: 'textfield',
                                        flex: 1,
                                        padding: 10,
                                        labelWidth: 70,
                                        name: 'usuario',
                                        value:me.usuario,
                                        hidden:true,
                                        fieldLabel: WorkSpace.Label.Textfield_Usuario

                                    },
                                    {
                                        xtype: 'textfield',
                                        inputType: 'password',
                                        padding: 10,
                                        flex: 1,
                                        name: 'ActualContrasena',
                                        allowBlank:false,
                                        //emptyText: 'Clave',
                                        fieldLabel: WorkSpace.Label.Textfield_Contraseña_actual,
                                        labelWidth: 70
                                    },
                                    {
                                        xtype: 'textfield',
                                        inputType: 'password',
                                        padding: 10,
                                        flex: 1,
                                        name: 'NewContrasena',
                                        allowBlank: false,
                                        //emptyText: 'Clave',
                                        fieldLabel: WorkSpace.Label.Textfield_Contraseña_nueva,
                                        labelWidth: 70
                                    },
                                    {
                                        xtype: 'textfield',
                                        inputType: 'password',
                                        padding: 10,
                                        flex: 1,
                                        name: 'ConfContrasena',
                                        allowBlank: false,
                                        validator: function () {
                                            var CONFIRMACION = this.value;
                                            var NEW = this.up('form').down('textfield[name=NewContrasena]').value;
                                            if (NEW != CONFIRMACION) {
                                                return "No coincide"
                                            } else {
                                                return true;
                                            }
                                            
                                        },
                                        //emptyText: 'Clave',
                                        fieldLabel: WorkSpace.Label.Textfield_Contraseña_confirmacion,
                                        labelWidth: 70
                                    }

                            ],
                            buttons: [
                                {
                                    xtype: 'button',
                                    text: WorkSpace.Label.Boton_Aceptar,
                                    tooltip: WorkSpace.Label.Titulo_Ventana_Autenticacion,
                                    action: 'clickCambiarContrasena',
                                    iconCls: 'icon-fingerprint',
                                    formBind:true

                                }, {
                                    xtype: 'button',
                                    text: WorkSpace.Label.Boton_Cancelar,
                                    tooltip: WorkSpace.Label.Titulo_Ventana_Autenticacion,
                                    action: 'clickCancelar',
                                    iconCls: 'icon-cancelar'


                                }

                            ]

                        }

            ]


        });

        me.callParent(arguments);
    }

});