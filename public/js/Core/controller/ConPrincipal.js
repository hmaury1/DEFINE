Ext.define('SmPlus.controller.ConPrincipal', {
    extend: 'Ext.app.Controller',
    
    views: [

            'VisPrincipal',
            'VisTimeOut',

            'Core.VisNavegador',
            'Core.VisBarraPrincipal',
            'Core.VisContextMenu',
            
            'Core.VisPanelDeControl',
            'QBE.VisQBE',
            'PCL.VisPcl',
            'PCL.VisPclTabGrid',
            'PCL.VisPclGrid',
            'PCL.VisPclForm',
            'PCL.VisGraficar',

            'Controles.VisZoom',
            'Controles.VisSmText',
            'Controles.VisNota',
            'Controles.VisMsgError',

            'QBE.VisHelpQbe',
            'QBE.VisWinHelpQbe',

            'Codigo.VisCodigoOpcion',

            'PCL.VisPclDinamica'
            

    ],
    stores: [

            'stoIconPanel',
            'stoLinks',
            'stoCriterio'
    ],

    init: function () {

        this.control({
            'vistimeout button[action=clickLogin]': {
                click:this.Session
            },
            'vistimeout button[action=clickCambiarUsuario]': {
                click:this.CambiarUsuario
            }
        });
       

        Main = this;
        this.BodyConfig();
        this.IniciarVariables();
  
       
    },

    BodyConfig: function(){


        //document.getElementById('Idbody').innerHTML="";
        //la siguiete intruccion deshabilitar el menu contextual del navegador:

        var map = new Ext.util.KeyMap({
            target: Ext.getBody(),
            binding: [{
                key: [113],
                //shift: true,
                fn: function () { Main.getController('Core.ConOpcion').openConsole(); }
            },
            {
                key: [112],
                //shift: true,
                fn: function () { Main.getController('Core.ConOpcion').help(); }
            },
            {
                key: [77],
                shift: true,
                ctrl:true,
                fn: function () { WorkSpace.OcultarMascara(); }
            }]
        });

        Ext.getBody().on("contextmenu", Ext.emptyFn, null, { preventDefault: true });

        Ext.Ajax.addListener('requestcomplete', function (conn, response, options, eOpts) {
            var resp = Ext.decode(response.responseText);
            if (resp.session == false) {

                if (WorkSpace.dataUser != null) {
                    var winTimeOut = Ext.widget("vistimeout", {
                        data: WorkSpace.dataUser
                    });
                }
            }
        });
    },

    IniciarVariables: function () {

        document.getElementById('Idbody').innerHTML = "";

        WorkSpace['Vistas']['VisPrincipal'] = Ext.widget('visprincipal');


        WorkSpace['Variables']['ComandoActual'] = '';

        WorkSpace.MostrarMascara();
        
        Ext.Ajax.request({
            method: 'POST',
            url: WorkSpace.Url.DatosDeSesion,
            success: function (response, opts) {
                try {
                    WorkSpace.OcultarMascara();
                    var obj = Ext.decode(response.responseText);

                        WorkSpace.dataUser = obj;
                        WorkSpace.Vistas.VisPrincipal.down('visbarraprincipal').down('label[name=txtEmpresa]').setText(obj.Empresa);
                        WorkSpace.Vistas.VisPrincipal.down('visbarraprincipal').down('label[name=txtAplicacion]').setText(obj.Aplicacion);
                        WorkSpace.Vistas.VisPrincipal.down('visbarraprincipal').down('label[name=txtEntorno]').setText(obj.Entorno);
                        WorkSpace.Vistas.VisPrincipal.down('visbarraprincipal').down('splitbutton[name=btnUsuario]').setText(obj.Usuario);


                        WorkSpace.Vistas.VisPrincipal.down('visbarraprincipal').show();
                        WorkSpace.Vistas.VisPrincipal.down('visbarraprincipal').down('button[action=clickCerrarSesion]').setWidth(WorkSpace.Vistas.VisPrincipal.down('visbarraprincipal').down('splitbutton[name=btnUsuario]').getWidth() - 13);
                        WorkSpace.Vistas.VisPrincipal.down('visnavegador').down('treepanel').getRootNode().expand();
                        WorkSpace.Vistas.VisPrincipal.down('visnavegador').show();
                    
                } catch (e) {
                    WorkSpace.OcultarMascara();
                    WorkSpace.alert(WorkSpace.Label.Informacion, WorkSpace.Msg.NoConexion);
                }

               
                

            },
            failure: function (result, request) {
                WorkSpace.OcultarMascara();
                WorkSpace.alert(WorkSpace.Label.Informacion, WorkSpace.Msg.Sin_Sesion);
            }
        });


    },


    nuevaAplicacion: function (appmvc) {

        for (var i = 0; i < appmvc.controllers.length; i++) {
            //Ext.require('SmPlus.Apps.' + opcion.aplicacion + "." + nemonico + ".controller." + appmvc.controllers[i]);
            var controlador = Main.getController('SmPlus.Apps.' + appmvc.app + "." + appmvc.name + ".controller." + appmvc.controllers[i]);
            controlador.init();
        }
        /*for (var i = 0; i < appmvc.models.length; i++) {
            Ext.require('SmPlus.Apps.' + opcion.aplicacion + "." + nemonico + ".model." + appmvc.models[i]);
            
        }
        for (var i = 0; i < appmvc.stores.length; i++) {
            Ext.require('SmPlus.Apps.' + opcion.aplicacion + "." + nemonico + ".store." + appmvc.stores[i]);

        }
        for (var i = 0; i < appmvc.views.length; i++) {
            Ext.require('SmPlus.Apps.' + opcion.aplicacion + "." + nemonico + ".view." + appmvc.views[i]);

        }*/
        
    },

    Session: function (el) {
        var form = el.up('form');
        var win = el.up('vistimeout');
        var values = form.getValues();
        myMask = new Ext.LoadMask(win, { msg: WorkSpace.Msg.Autorizando });
        myMask.show();
        Ext.Ajax.request({
            url: WorkSpace.Url.Login,
            params: {
                usuario: values.usuario,
                idaplicacion: values.aplicacion,
                codentorno: values.entorno,
                clave: values.contrasena,
                conexion: values.conexion
            },
            success: function (response) {

                var resp = Ext.decode(response.responseText);

                if (resp.success) {
                    WorkSpace.dataUser.session = resp.session;
                    win.close();


                } else {
                    myMask.hide();


                    WorkSpace.alert(WorkSpace.Label.Error_Login, resp.error);


                }
            },
            failure: function () {
                myMask.hide();

            }
        });
    },

    CambiarUsuario: function () {
        document.location = '/Home';
    }



   

   
   

});