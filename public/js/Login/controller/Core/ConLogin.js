Ext.define('Isecure.controller.Core.ConLogin', {
    extend: 'Ext.app.Controller',

    init: function () {


        this.control({
            'visautorizacion button[action=clickLogin]': {
                click: this.IniciarsSesion
            },

            'vislogin button[action=clickLogin]': {
                click: this.AutenticacionClick
            },
            'visautorizacion button[action=clickCambiar]': {
                click: this.ShowCambiarContraseña
            },
            'viscontrasena button[action=clickCancelar]': {
                click: this.CancelarCambioContraseña
            },
            'viscontrasena button[action=clickCambiarContrasena]': {
                click: this.CambiarContraseña
            },
            'vislogin button[action=clickCancelar]': {
                click: this.Cerrar
            },
            'visautorizacion button[action=clickClear]': {
                click: this.Limpiar
            },
            'vislogin button[action=clickConexion]': {
                click: this.mostrarConexiones
            },

            'vislogin textfield[name=usuario]': {
                specialkey: this.AutenticacionEnter
            },

            'vislogin textfield[name=contrasena]': {
                specialkey: this.AutenticacionEnter
            },

            'visautorizacion gridpanel[name=cmbAplicacion]': {
                select: this.SeleccionarAplicacion
            },

            'visautorizacion gridpanel[name=cmbEntorno]': {
                itemdblclick: this.IniciarsSesion
            },

            'visconexiones gridpanel': {
                itemdblclick: this.seleccionarConexion
            },
            'visconexiones button[action=clickAceptar]': {
                click: this.seleccionarConexion
            }

        });
    },

    seleccionarConexion: function (el) {
        var win = el.up('visconexiones');
        var records = win.down('gridpanel').getSelectionModel().getSelection();

        if (records.length > 0) {
            var record = records[0];

            myMask = new Ext.LoadMask(win, { msg: WorkSpace.Msg.Autenticando });
            myMask.show();
            Ext.Ajax.request({
                url: WorkSpace.Url.Login_Select_Conexion,
                params: {
                    con: record.data.name,
                    authenticity_token:AUTH_TOKEN
                },
                success: function (response) {

                    myMask.hide();
                    win.close();
                    /*var resp = Ext.decode(response.responseText);
                    if (resp.success) {
                        WorkSpace.alert(WorkSpace.Label.Informacion, WorkSpace.Msg.ContrasenaCambiada);
                    } else {
                        WorkSpace.alert(WorkSpace.Label.Informacion, WorkSpace.Msg.NoContrasenaCambiada);
                    }*/

                },
                failure: function () {
                    myMask.hide();
                    win.close();

                }
            });

        }
    },

    CambiarContraseña: function (el) {
        var form = el.up('form');
        var win = el.up('window');
        var record = form.getForm().getValues();

        myMask = new Ext.LoadMask(form, { msg: WorkSpace.Msg.Autenticando });
        myMask.show();
        Ext.Ajax.request({
            url: WorkSpace.Url.cambiarcontrasena,
            params: {
                usuario: record.usuario,
                actual: record.ActualContrasena,
                nueva: record.NewContrasena
            },
            success: function (response) {

                myMask.hide();
                win.close();
                var resp = Ext.decode(response.responseText);
                if (resp.success) {
                    WorkSpace.alert(WorkSpace.Label.Informacion, WorkSpace.Msg.ContrasenaCambiada);
                } else {
                    WorkSpace.alert(WorkSpace.Label.Informacion, WorkSpace.Msg.NoContrasenaCambiada);
                }

            },
            failure: function () {
                myMask.hide();
                win.close();

            }
        });
    },

    ShowCambiarContraseña: function () {
        var usuario = WorkSpace.Vistas.Vislogin.down('textfield[name=usuario]').getValue();
        var wc = Ext.widget('viscontrasena', {
            usuario: usuario
        });
        wc.show();

    },

    CancelarCambioContraseña: function (el) {
        var win = el.up('window');
        win.close();
    },

    Cerrar: function () {
        window.open('', '_self', '');
        window.close();
    },

    Limpiar: function () {

        var comboApp = WorkSpace.Vistas.Visautorizacion.down('gridpanel[name=cmbAplicacion]').store.removeAll();
        var comboEntorno = WorkSpace.Vistas.Visautorizacion.down('gridpanel[name=cmbEntorno]').store.removeAll();


        var txtusuario = WorkSpace.Vistas.Vislogin.down('textfield[name=usuario]').setValue("");
        var txtpass = WorkSpace.Vistas.Vislogin.down('textfield[name=contrasena]').setValue("");

        WorkSpace.Vistas.Visautorizacion.hide();
        WorkSpace.Vistas.Vislogin.show();

        WorkSpace.Vistas.Vislogin.down('textfield[name=usuario]').focus(false, 100);


    },

    mostrarConexiones: function () {

        var win = Ext.widget("visconexiones");

        win.show();


    },

    IniciarsSesion: function () {



        //Main.IniciarVariables(sesion, params);

        var usuario = WorkSpace.Vistas.Vislogin.down('textfield[name=usuario]').getValue();
        var sele = WorkSpace.Vistas.Visautorizacion.down('gridpanel[name=cmbAplicacion]').getSelectionModel().getSelection();
        if (sele.length > 0) {
            var idaplicacion = sele[0].data.idaplicacion;
            // var idaplicacion = WorkSpace.Vistas.Vislogin.down('gridpanel[name=cmbAplicacion]').getValue();
            var sele = WorkSpace.Vistas.Visautorizacion.down('gridpanel[name=cmbEntorno]').getSelectionModel().getSelection();
            var codentorno = sele[0].data.CodEntorno;
            //var codentorno = WorkSpace.Vistas.Vislogin.down('combobox[name=cmbEntorno]').getValue();
            var clave = WorkSpace.Vistas.Vislogin.down('textfield[name=contrasena]').getValue();

            /*var usuario = 'edme115';
            var idaplicacion = 10020;
            var codentorno = 3;
            var clave = '';*/
            myMask = new Ext.LoadMask(WorkSpace.Vistas.Visautorizacion, { msg: WorkSpace.Msg.Autorizando });
            myMask.show();
            Ext.Ajax.request({
                url: WorkSpace.Url.Login,
                params: {
                    usuario: usuario,
                    idaplicacion: idaplicacion,
                    codentorno: codentorno,
                    clave: clave,
                    conexion: ''
                },
                success: function (response) {

                    var resp = Ext.decode(response.responseText);

                    if (resp.success) {

                        document.location = BasePath + 'Home';


                    } else {
                        myMask.hide();


                        WorkSpace.alert(WorkSpace.Label.Error_Login, resp.error);


                    }
                },
                failure: function () {
                    myMask.hide();

                }
            });
        }

    },


    Autenticacion: function () {
        var txtUsuario = WorkSpace.Vistas.Vislogin.down('textfield[name=usuario]');
        var txtPass = WorkSpace.Vistas.Vislogin.down('textfield[name=contrasena]');
        if (this.ValidarUsuario()) {
            myMask = new Ext.LoadMask(WorkSpace.Vistas.Vislogin, { msg: WorkSpace.Msg.Autenticando });
            myMask.show();
            var me = this;
            Ext.Ajax.request({
                url: WorkSpace.Url.Autenticacion,
                params: {
                    usuario: txtUsuario.getValue(),
                    clave: txtPass.getValue()
                },
                success: function (response) {
                    myMask.hide();
                    var resp = Ext.decode(response.responseText);

                    if (resp.success) {

                        me.TraerAplicaciones(txtUsuario.getValue(), txtPass.getValue());

                    } else {

                        WorkSpace.alert(WorkSpace.Label.Informacion, WorkSpace.Msg.DatosIncorrectos);
                    }
                },
                failure: function () {
                    myMask.hide();
                    WorkSpace.alert(WorkSpace.Label.Informacion, WorkSpace.Msg.Accion_No_Posible);

                }
            });

        } else {
            WorkSpace.alert(WorkSpace.Label.Error_Login, WorkSpace.Msg.Texto_Ingrese_Usuario);
        }
    },

    AutenticacionEnter: function (textfield, evento, opciones) {

        if (evento.getKey() == evento.ENTER) {
            this.Autenticacion();

        }
    },


    AutenticacionClick: function (textfield, evento, opciones) {
        this.Autenticacion();
    },



    TraerAplicaciones: function (usuario, pass) {

        //WorkSpace.Vistas['VisAutorizacion'] = Ext.widget('visautorizacion');


        var me = this;
        var txtusuario = WorkSpace.Vistas.Vislogin.down('textfield[name=usuario]');
        var txtpass = WorkSpace.Vistas.Vislogin.down('textfield[name=contrasena]');
        var comboApp = WorkSpace.Vistas.Visautorizacion.down('gridpanel[name=cmbAplicacion]');
        var comboEntorno = WorkSpace.Vistas.Visautorizacion.down('gridpanel[name=cmbEntorno]');
        /*
          comboApp.store.removeAll();
          comboEntorno.store.removeAll();*/
        comboApp.store.proxy.extraParams.usuario = usuario;
        myMask = new Ext.LoadMask(WorkSpace.Vistas.Vislogin, { msg: WorkSpace.Msg.Autenticando });
        myMask.show();
        comboApp.store.load(function (records, operation, success) {


            if (success == true) {
                if (comboApp.store.getCount() > 0) {
                    WorkSpace.Vistas.Vislogin.hide();
                    WorkSpace.Vistas.Visautorizacion.show();

                    WorkSpace.Vistas.Visautorizacion.down('label[name=usuario]').setText(usuario);
                    WorkSpace.Vistas.Visautorizacion.down('textfield[name=contrasena]').setValue(pass);

                    comboApp.getSelectionModel().select(comboApp.store.first());
                    var sele = comboApp.getSelectionModel().getSelection();
                    sele = sele[0];
                    me.TraerEntornos(usuario, sele.data.idaplicacion);


                } else {
                    myMask.hide();
                    WorkSpace.alert(WorkSpace.Label.Informacion_Login, WorkSpace.Msg.Sin_Aplicaciones_Asignadas);
                }
            } else {
                myMask.hide();
                WorkSpace.alert(WorkSpace.Label.Informacion_Login, WorkSpace.Msg.Accion_No_Posible);
            }

        });
    },

    TraerEntornos: function (usuario, aplicacion) {

        var combo = WorkSpace.Vistas.Visautorizacion.down('gridpanel[name=cmbEntorno]');
        combo.store.removeAll();
        combo.store.proxy.extraParams.usuario = usuario;
        combo.store.proxy.extraParams.idaplicacion = aplicacion;
        me = this;
        combo.store.load(function (records, operation, success) {
            myMask.hide();
            if (success == true) {
                combo.getSelectionModel().select(combo.store.first());

                if (records.length == 1) {
                    var app = WorkSpace.Vistas.Visautorizacion.down('gridpanel[name=cmbAplicacion]');

                    if (app.store.data.length == 1) {
                        me.IniciarsSesion();
                    }
                }
            } else {
                WorkSpace.alert(WorkSpace.Label.Informacion_Login, WorkSpace.Msg.Accion_No_Posible);
            }

        });
    },

    Login: function (textfield, evento, opciones) {
        if (evento.getKey() == evento.ENTER) {
            if (this.ValidarUsuario()) {
                this.IniciarsSesion();
            } else {
                WorkSpace.alert(WorkSpace.Label.Error_Login, WorkSpace.Msg.Texto_Ingrese_Usuario);
            }
        }
    },

    SeleccionarAplicacion: function () {

        if (this.ValidarUsuario()) {
            var txtUsuario = WorkSpace.Vistas.Vislogin.down('textfield[name=usuario]');
            var comboApp = WorkSpace.Vistas.Visautorizacion.down('gridpanel[name=cmbAplicacion]');
            var sele = comboApp.getSelectionModel().getSelection();
            sele = sele[0];
            this.TraerEntornos(txtUsuario.getValue(), sele.data.idaplicacion);
        } else {
            WorkSpace.alert(WorkSpace.Label.Error_Login, WorkSpace.Msg.Texto_Ingrese_Usuario);
        }


    },

    ValidarUsuario: function () {


        var txtUsuario = WorkSpace.Vistas.Vislogin.down('textfield[name=usuario]');
        if (txtUsuario.getValue() != '') {
            return true;
        } else {
            return false;
        }
    }



});