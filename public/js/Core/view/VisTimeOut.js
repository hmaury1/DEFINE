Ext.define('SmPlus.view.VisTimeOut', {
    extend: 'Ext.window.Window',
    alias: 'widget.vistimeout',
    title: WorkSpace.Msg.SesionCaducada,
    autoShow: true,
    width: 250,
    modal: true,
    data: {
        Aplicacion : "",
        Entorno : "",
        Usuario : "",
        session: "",
        UserName: "",
        Empresa : "",
        IdAplicacion : "",
        IdEntorno : ""
    },
    closable:false,
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
                              name: 'conexion',
                              hidden: true,
                              value: me.data.conexion,
                              fieldLabel: 'conexion',
                              readOnly:true,

                          }, {
                              xtype: 'textfield',
                              flex: 1,
                              padding: 10,
                              labelWidth: 70,
                              name: 'entorno',
                              hidden: true,
                              value: me.data.IdEntorno,
                              fieldLabel: 'entorno',
                              readOnly: true,

                          }, {
                              xtype: 'textfield',
                              flex: 1,
                              padding: 10,
                              labelWidth: 70,
                              value: me.data.IdAplicacion,
                              name: 'aplicacion',
                              hidden: true,
                              fieldLabel: 'aplicacion',
                              readOnly: true,

                          }, {
                              xtype: 'textfield',
                              flex: 1,
                              padding: 10,
                              labelWidth: 70,
                              name: 'usuario',
                              value: me.data.UserName,
                              //emptyText: 'Usuario',
                              fieldLabel: WorkSpace.Label.Textfield_Usuario,
                              readOnly: true,

                          },
                           {
                               xtype: 'textfield',
                               inputType: 'password',
                               padding: 10,
                               flex: 1,
                               name: 'contrasena',
                               //emptyText: 'Clave',
                               fieldLabel: WorkSpace.Label.Textfield_Contraseña,
                               labelWidth: 70
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
                           text: WorkSpace.Label.CambiarUsuario,
                           //tooltip: WorkSpace.Label.Titulo_Ventana_Autenticacion,
                           action: 'clickCambiarUsuario0',
                           iconCls: 'icon-cancelar'


                       }

                   ]

               }

            ]
        });
        this.callParent(arguments);
    }
});