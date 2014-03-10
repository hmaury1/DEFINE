Ext.define('SmPlus.controller.PCL.ConPcl', {
    extend: 'Ext.app.Controller',

    init: function () {

        this.control({
            'vispcl': {
                activate:this.activarLink,
                deactivate:this.activarArbol,
                beforeclose: this.cerrar

            },

            'vispcldinamica': {
                render:this.cargarPclDinamica
            }
        });

    },

    cargarPclDinamica: function (el) {
        var op = { filtro: '' };
        if (el.opciones) op = el.opciones;
        var filtro = "";
        if (op.filtro) filtro = op.filtro;
        Main.getController('Core.ConOpcion').opcion(3, el.nemonico, filtro, el, "", "", el.opciones);
    
    },

    abrePcl: function abrePcl(nemonico, filtroInicio ,filtQbe, tabCls, filtro, opciones, fields, qbe) {
        if (!tabCls) tabCls ='vispcltabgrid';
        if (!filtro) { filtro = ''; }
        else {
            //filtroInicio = filtro;
        }
      
        if (filtroInicio == "1=2") { filtroInicio = ""; }
        

        var Pcl = Ext.widget('vispcl',{
            nemonico: nemonico,
            
            claseTab: tabCls,
            campos: fields,
            filtro: filtro,
            filtroInicio:filtroInicio,
            opciones: opciones,
            filtroQbe: filtQbe,
            qbe: qbe,
            isLink: false,
            campoPcl: '',
            campoLnk: '',
            padreLink: '',
            isZoom: false,
            isDinamico:false
            
        });
        Pcl.add(Ext.widget('tabpanel', {
            
            flex: 1,
            height:250,
            
            name:'Pcl-links',
            region:'south',
            title: 'Detalles',
             collapsible: true,
            //tabPosition: 'bottom',
              collapsed: true
                   
        }));
        Main.getController('PCL.ConPclTabGrid').ConstruirTabs(Pcl, tabCls);
        WorkSpace.Vistas.VisPrincipal.down('tabpanel[name=tpContenido]').add(Pcl);
        WorkSpace.Vistas.VisPrincipal.down('tabpanel[name=tpContenido]').setActiveTab(Pcl);
        //WorkSpace['pest']++;
       
        WorkSpace.Vistas.VisPrincipal.down('visnavegador').down('panel[name=links]').show();
        

    },

    abrePclLink: function abrePcl(nemonico, filtQbe, tabCls, filtro, opciones, fields, qbe) {
        if (!tabCls) tabCls = 'vispcltabgrid';
        if (!filtro) filtro = '';

        if (opciones) {
            if (opciones.filtroInicio) {
                var filt = opciones.filtroInicio;
                if ((filt.trim() != '1=2') && (filt.trim() != '')) {
                    /*filt = filt.replace(/\{(\S+)\}/g,
                        function (value) {
                            var campo = value.substring(1, value.length - 1);
                            var valor = value;
                            if (campo.charAt(0) == '@') {
                                // if(campo=='@HrSrv')valor=horaact; // Trae la Hora servidor. Creada por William Torres
                                if (campo == '@ip') valor = ipAdress; // Trae la Ip (Terminal PC). Creada por William Torres 25/10/2011
                                if (campo == '@usuario') valor = NombreUsuario;
                                if (campo == '@idUsuario') valor = usuario;
                                if (campo == '@login') valor = usrLogin;
                                if (campo == '@fechaSrv') valor = fechaServidor.format('d/m/Y');
                                if (campo == '@FECHASRV') valor = fechaServidor.format('d/m/Y');
                            }
                            return valor;
                        }
                        );*/
                    if (filtro.trim() != '') {
                        filtro = filtro + ' and ' + filt;
                    }
                    else {
                        filtro = filt;
                    }
                }
            }
        }

        var Pcl = Ext.widget('vispcl', {
            nemonico: nemonico,
            title: opciones.titulo,
            claseTab: tabCls,
            campos: fields,
            filtro: filtro,
            opciones: opciones,
            filtroQbe: filtQbe,
            qbe: qbe,
            isLink: false,
            campoPcl: '',
            campoLnk: '',
            padreLink: '',
            isZoom: false

        });
        Pcl.add(Ext.widget('tabpanel', {

            flex: 1,
            height: 250,

            name: 'Pcl-links',
            region: 'south',
            title: 'Detalles',
            collapsible: true,
            //tabPosition: 'bottom',
            collapsed: true

        }));
        Main.getController('PCL.ConPclTabGrid').ConstruirTabs(Pcl, tabCls);
        WorkSpace.Vistas.VisPrincipal.down('tabpanel[name=tpContenido]').add(Pcl);
        WorkSpace.Vistas.VisPrincipal.down('tabpanel[name=tpContenido]').setActiveTab(Pcl);
        
        WorkSpace['pest']++;

        WorkSpace.Vistas.VisPrincipal.down('visnavegador').down('panel[name=links]').show();


    },
    

    activarLink: function (el, opt) {
        if (!el.isLink && !el.isZoom) {
            Main.getController('PCL.ConLink').ActivarLink(el.nemonico, el);
        }
       

    },

    activarArbol: function (el) {
        if (!el.isLink && !el.isZoom) {
            WorkSpace.Vistas.VisPrincipal.down('visnavegador').down('panel[name=tpMenu]').show();
            var linkView = WorkSpace.Vistas.VisPrincipal.down('visnavegador').down('dataview[name=dvLink]');
            
            linkView.store.removeAll();

        } 

    },


    cerrar: function (el) {
        if (el.ModoEdicion == true) {
            Ext.Msg.alert(WorkSpace.Label.Informacion, WorkSpace.Msg.No_Cerrar_Modo_Edicion);
            return false;
        }
        if (!el.isLink && !el.isZoom) {
            WorkSpace.Vistas.VisPrincipal.down('visnavegador').down('panel[name=tpMenu]').show();
            var linkView = WorkSpace.Vistas.VisPrincipal.down('visnavegador').down('dataview[name=dvLink]');
            WorkSpace.Vistas.VisPrincipal.down('tabpanel[name=tpContenido]').setActiveTab(WorkSpace.Vistas.VisPrincipal.down('tabpanel[name=tpContenido]').items.items[0]);
            linkView.store.removeAll();

        }

    },

    LoadData: function (pcl, filtroQbe, allMarker) {
        pcl.store.proxy.extraParams.allMarker = false;
        if (allMarker) {
            pcl.store.proxy.extraParams.allMarker = true;
        }
        pcl.store.proxy.extraParams.filtroQbe = filtroQbe;
        pcl.store.currentPage = 1;
        pcl.store.load();
    }



});