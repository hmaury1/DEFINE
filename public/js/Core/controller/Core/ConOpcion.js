Ext.define('SmPlus.controller.Core.ConOpcion', {
    extend: 'Ext.app.Controller',

    init: function () {
    },

    openConsole: function(){
        Ext.MessageBox.prompt(WorkSpace.Label.Titulo_Ventana_Comando, WorkSpace.Msg.Texto_Ingrese_Comando,
        function (btn, nemo) {
            if (btn == 'ok') {

                WorkSpace.Variables['ComandoActual'] = nemo;
                Main.getController('Core.ConOpcion').opcion(0, nemo.toUpperCase());
            }
        }, this, false, WorkSpace['Variables']['ComandoActual']);
    },

    opcion: function (tipo, nemonico, filtro, container, campoPcl, campoLnk, opcionesDinamicas) {
        
        me = this;
        var existe = false;
        if (tipo === 0) {
            var tabs = WorkSpace.Vistas.VisPrincipal.down('tabpanel[name=tpContenido]');
            for (i = 1; i < tabs.items.items.length ; i++) {
                if (tabs.items.items[i].nemonico == nemonico) {
                    existe = tabs.items.items[i];

                }

            }
        }
        if (existe != false) {
            Ext.Msg.confirm(WorkSpace.Label.Informacion, WorkSpace.Msg.ExisteOpcion, function (button) {
                if (button === 'yes') {

                    me.abrirOpcion(tipo, nemonico, filtro, container, campoPcl, campoLnk, opcionesDinamicas);

                } else {
                    tabs.setActiveTab(existe);

                }
            });
        }
        else {
            me.abrirOpcion(tipo, nemonico, filtro, container, campoPcl, campoLnk, opcionesDinamicas);
        }
    },

    abrirOpcion: function (tipo, nemonico, filtro, container, campoPcl, campoLnk, opcionesDinamicas) {
        if (!filtro) filtro = "";
        var url = WorkSpace.Url.Opcion;

        if (tipo == 2) {
            url = WorkSpace.Url.OpcionZoom;
        }

        Ext.Ajax.request({
            url: url,
            method: 'POST',
            //timeout: 15000,
            params: {
                nemonico: nemonico
            },
            success: function (response) {
                /*try {*/
                WorkSpace.OcultarMascara();
                var resp = Ext.decode(response.responseText);

              


                    if (resp.found) {
                        if (resp.clase == 'codigo') {
                            Main.getController('Codigo.ConCodigoOpcion').AbrirCodigoOpcion(resp, nemonico);
                        } else {
                            if (resp.clase == 'SM.PCL') {

                                

                                switch (tipo) {
                                    case 0: Main.getController('QBE.ConQBE').QBE(tipo, nemonico, filtro, false, resp);// pcl basica encabezado detalle.
                                        break;
                                    case 1: Main.getController('QBE.ConQBE').QBE(tipo, nemonico, filtro, false, resp, container, campoPcl, campoLnk);//pcl link para detalles de otras pcl.
                                        break;
                                    case 2:
                                        resp.personalizacion = false;
                                        Main.getController('QBE.ConQBE').QBE(tipo, nemonico, filtro, false, resp);// pcl Zoom.
                                        break;
                                    case 3:

                                        if (opcionesDinamicas) {
                                            if (opcionesDinamicas.operacion) resp.operacion = opcionesDinamicas.operacion;

                                            if (opcionesDinamicas.titulo) resp.titulo = opcionesDinamicas.titulo;

                                            if (opcionesDinamicas.defaultqbe) resp.defaultqbe = opcionesDinamicas.defaultqbe;

                                            if (opcionesDinamicas.herramientas==false) resp.herramientas = opcionesDinamicas.herramientas;

                                            if (opcionesDinamicas.paginado == false) resp.paginado = opcionesDinamicas.paginado;

                                            if (opcionesDinamicas.personalizacion == false) resp.personalizacion = opcionesDinamicas.personalizacion;

                                        }
                                        Main.getController('QBE.ConQBE').QBE(tipo, nemonico, filtro, false, resp, container);
                                        break;
                                    case 4: Main.getController('QBE.ConQBE').QBE(tipo, nemonico, filtro, false, resp);// independizar.
                                        break;
                                }
                            } else {

                                WorkSpace.alert(WorkSpace.Label.Informacion, WorkSpace.Msg.Carga_Opcion_Fallida);


                            }
                        }
                    }
               
                /* } catch (e) {
                     WorkSpace.OcultarMascara();
                     WorkSpace.alert(WorkSpace.Label.Informacion, WorkSpace.Msg.NoConexion);
                 }*/



            },
            failure: function (response) {
                WorkSpace.alert(WorkSpace.Label.Informacion, WorkSpace.Msg.Carga_Opcion_Fallida);
            }

        });
    },

    help: function () {
        var url = WorkSpace.dataUser.help + "/hlp";
        var tabs = WorkSpace.Vistas.VisPrincipal.down('tabpanel[name=tpContenido]');
        var total = tabs.items.items.length;
        if (total > 1) {
            var opcion = tabs.getActiveTab();
            url = url + "/" + opcion.nemonico + ".html";
        }            
        window.open(url);
    }

});