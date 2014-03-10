Ext.define('SmPlus.controller.PCL.ConLink', {
    extend: 'Ext.app.Controller',

    init: function () {

        this.control({
            'vispcl tabpanel[name=Pcl-links]':
                {
                    remove:this.EstaVacio
                },
            'visnavegador dataview[name=dvLink]': {
                itemdblclick:this.addLink
            }
        });

    },

    ActivarLink: function (nemonico, el) {
      /*  nemonico = nemonico || "";*/
        var linkView = WorkSpace.Vistas.VisPrincipal.down('visnavegador').down('dataview[name=dvLink]');
        
        linkView.store.removeAll();
       
        linkView.store.proxy.extraParams.nemonico = nemonico;
        linkView.store.load(function () {
           
                var link = el.down('tabpanel[name=Pcl-links]');
                if (link.items.items.length > 0) {
                    var record1 = linkView.store.data.items[0].data;
                    if (record1.link != "independizar") {
                        linkView.store.insert(0, {
                            campoLnk: "",
                            campoPadre: "",
                            caption: "Independizar",
                            link: "independizar",
                            secuencia: 0,
                            tipo: "",
                            tipoLnk: "O",
                            tooltip: "Independizar",
                            img: 'Recursos/Imagenes/independizar.png'
                        });
                    }

                }
            
        });
        
        linkView.refresh();
        /*if (linkView.store.data.length == 0) {
            WorkSpace.Vistas.VisPrincipal.down('visnavegador').down('panel[name=tpMenu]').show();
        } else {*/
        
        

        
        WorkSpace.Vistas.VisPrincipal.down('visnavegador').down('panel[name=links]').show();
        if (el.ModoEdicion == true) {
            WorkSpace.Vistas.VisPrincipal.down('visnavegador').down('panel[name=links]').disable();
        } else {
            WorkSpace.Vistas.VisPrincipal.down('visnavegador').down('panel[name=links]').enable();
        }
       /* }*/
    },

    addLink: function (view, record, item) {
       
        var nemo = record.data.link;
        var campoPcl = record.data.campoPadre;
        var campoLnk = record.data.campoLnk;
        var tipoLnk = record.data.tipoLnk;
        if (nemo != 'independizar') {

            el = WorkSpace.Vistas.VisPrincipal.down('tabpanel[name=tpContenido]').getActiveTab();
            var clase = 'vispcltabgrid';
            if (tipoLnk == 'GROUP') clase = 'vistabgroupinggrid';
            var link = el.down('tabpanel[name=Pcl-links]');

            if (link.items.items.length > 0) {
                //var ActLnk=Pcl.link.getActiveTab();
                for (var i = 0; i < link.items.items.length; i++) {
                    var element = link.items.items[i];
                    var text1 = element.nemonico + "";
                    var text2 = nemo + "";

                    if (text1 == text2) {
                        link.setActiveTab(element);
                        return;
                    }

                }


            }
            WorkSpace.MostrarMascara();
            var tg = el.down('tabpanel[name=Pcl-contenido]');

            var PclFields = campoPcl.split(',');
            var LnkFields = campoLnk.split(',');


            var fl = "";
            var records = tg.getActiveTab().getSelectionModel().getSelection();
            if (records.length > 0) {
                for (var i = 0; i < PclFields.length; i++) {
                    
                    
                    if (PclFields[i] != "") {
                        fl += " and " + LnkFields[i] + " = '" + records[0].get(PclFields[i]) + "'";
                        
                    } 
                }
                for (var j = 0; j < LnkFields.length; j++) {

                    if (LnkFields[j] != "") {

                        if (LnkFields[j].indexOf("=") != -1) {
                            fl += " and " + LnkFields[j];
                        }
                    } 
                }
            } else {
                fl = " and 1=2 ";
            }
            /*var defaults = new Array();
            for (i = 0; i < PclFields.length; i++) {
                var records = tg.getActiveTab().getSelectionModel().getSelection();
                var key = '-1';
                if (records.length > 0) {
                    key = records[0].get(PclFields[i]);
                }
                fl = fl + LnkFields[i] + "='" + key + "' and ";
                defaults[LnkFields[i]] = key;
            }
            fl = fl.substring(0, fl.length - 4);*/

            var linkView = WorkSpace.Vistas.VisPrincipal.down('dataview[name=dvLink]');
            var record1 = linkView.store.data.items[0].data;
            if (record1.link != "independizar") {
                linkView.store.insert(0, {
                    campoLnk: "",
                    campoPadre: "",
                    caption: "Independizar",
                    link: "independizar",
                    secuencia: 0,
                    tipo: "",
                    tipoLnk: "O",
                    tooltip: "Independizar",
                    img: 'Recursos/Imagenes/independizar.png'
                });
            }
            var flbk = fl;
            var SMEvent_getLinkFilter = {
                filtro: fl,
                nemonicoLink: nemo,
                record: records.length > 0 ? records[0] : null
            };
            if (el.metaData.eventosPcl.getLinkFilter) {
                try {
                    el.metaData.eventosPcl.getLinkFilter(SMEvent_getLinkFilter);
                    fl = SMEvent_getLinkFilter.filtro;
                } catch (e) {
                    console.log('SMError 119 error en la ejecucion del evento getLinkFilter: ' + e.message);
                    fl = flbk;
                }

            }
            Main.getController('Core.ConOpcion').opcion(1,nemo, fl, link, campoPcl, campoLnk);

        } else {
            var link = el.down('tabpanel[name=Pcl-links]');
            if (link.items.items.length > 0) {
                var ActLnk = link.getActiveTab();
                if (ActLnk) {
                    link.remove(ActLnk);
                    console.log(ActLnk, ActLnk.filtro);
                    Main.getController('Core.ConOpcion').opcion(4,ActLnk.nemonico.toUpperCase(), ActLnk.filtro);
                    
                }
                
            }
        }
    },

    EstaVacio: function (el) {
    
        if (el.items.length == 0) {
            var linkView = WorkSpace.Vistas.VisPrincipal.down('dataview[name=dvLink]');
            var record1 = linkView.store.data.items[0].data;
            
            if (record1.link == "independizar") {
                
                linkView.store.removeAt(0);
                el.collapse();
            }
        }
        
    

    }

   

    



});