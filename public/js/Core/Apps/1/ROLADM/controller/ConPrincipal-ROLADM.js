Ext.define('SmPlus.Apps.1.ROLADM.controller.ConPrincipal-ROLADM', {
    extend: 'Ext.app.Controller',
    
    views: [
        'SmPlus.Apps.1.ROLADM.view.VisPrincipal-ROLADM'
    ],
    stores:[
        'SmPlus.Apps.1.ROLADM.store.stoRoles-ROLADM',
        'SmPlus.Apps.1.ROLADM.store.stoOperaciones-ROLADM',
        'SmPlus.Apps.1.ROLADM.store.stoMenuOpciones-ROLADM',
        'SmPlus.Apps.1.ROLADM.store.stoAplicaciones-ROLADM',
        'SmPlus.Apps.1.ROLADM.store.stoEntornos-ROLADM'
    ],

    isload: false,
    

    init: function () {
        
        if (!this.isload) {
            this.isload = true;
            WorkSpace.ROLADM.vistas['VisPrincipal'] = Ext.widget("viscodigoopcion", {
                nemonico: "ROLADM",
                aplicacion: "1",
                title: "Roles Opciones Operaciones",

                items: [
                    Ext.create('SmPlus.Apps.1.ROLADM.view.VisPrincipal-ROLADM')
                ]
            });

            WorkSpace.Vistas.VisPrincipal.down('tabpanel[name=tpContenido]').add(WorkSpace.ROLADM.vistas['VisPrincipal']);
            WorkSpace.Vistas.VisPrincipal.down('tabpanel[name=tpContenido]').setActiveTab(WorkSpace.ROLADM.vistas['VisPrincipal']);

            var gridOperacionRoles = WorkSpace.ROLADM.vistas['VisPrincipal'].down('gridpanel[name=gpOperacionRoles]');
            gridOperacionRoles.getSelectionModel().deselectAll();
            gridOperacionRoles.store.removeAll();

            var gridRolesOperacion = WorkSpace.ROLADM.vistas['VisPrincipal'].down('gridpanel[name=gpRolesOperacion]');
            gridRolesOperacion.getSelectionModel().deselectAll();
            gridRolesOperacion.store.removeAll();

            this.control({
                'visprincipalROLADM': {
                    destroy: this.CerrarOpcion
                },
                /*'visprincipalROLADM vispclgrid[nemonico=SGAPPLUS]': {
                    select: this.seleccionarAplicacion
                    //deselect: this.deseleccionarOpcion
                },
                */
                'visprincipalROLADM combobox[name=IdAplicacion]': {
                    select: this.seleccionarAplicacion
                },
                'visprincipalROLADM combobox[name=IdEntorno]': {
                    select: this.seleccionarEntorno
                },
                'visprincipalROLADM vispclgrid[nemonico=SGOPPLUS]': {
                    select: this.seleccionarOpcion,
                    deselect: this.deseleccionarOpcion
                },
                'visprincipalROLADM vispclgrid[nemonico=SGROLPLUS]': {
                    select: this.seleccionarRol,
                    deselect: this.deseleccionarRol
                },
                'visprincipalROLADM vispclgrid[nemonico=SGOPEPLUS]': {
                    render: this.ActiveOperaciones,
                    select: this.seleccionarOperacion,
                    deselect: this.deseleccionarOperacion
                },
                'visprincipalROLADM actioncolumn[name=checkBoxOperacion]': {
                    click: this.checkOperacion
                },
                'visprincipalROLADM actioncolumn[name=checkBoxRoles]': {
                    click: this.checkRoles
                },
                'visprincipalROLADM treepanel[name=menuROLOP]': {
                    select: this.seleccionarOpcionMenu
                }
            });
        }

        
       
    },

    seleccionarOpcionMenu: function (el, record, index, eOpts) {
        
        var gridOpciones = el.view.up('visprincipalROLADM').down('vispclgrid[nemonico=SGOPPLUS]');
     
        var records = gridOpciones.store.data.items;
        for (var i = 0; i < records.length; i++) {
          
            if (records[i].data.OPCION == record.data.nemonico) {
               
                gridOpciones.getSelectionModel().select(records[i]);
                return;
            }
        }
        
       

    },

    deseleccionarOperacion: function (el, record, index, eOpts) {
        
        var gridRolesOperacion = el.view.up('visprincipalROLADM').down('gridpanel[name=gpOperacionRoles]');
        gridRolesOperacion.getSelectionModel().deselectAll();
        gridRolesOperacion.store.removeAll();
        
    },

    deseleccionarRol: function (el, record, index, eOpts) {

        var gridRolesOperacion = el.view.up('visprincipalROLADM').down('gridpanel[name=gpRolesOperacion]');
        gridRolesOperacion.getSelectionModel().deselectAll();
        gridRolesOperacion.store.removeAll();

    },

    deseleccionarOpcion: function (el, record, index, eOpts) {

        var gridRolesOperacion = el.view.up('visprincipalROLADM').down('gridpanel[name=gpRolesOperacion]');
        gridRolesOperacion.getSelectionModel().deselectAll();
        gridRolesOperacion.store.removeAll();

    },


    ActiveOperaciones: function (el, opt) {

        var gridOpcion = el.up('visprincipalROLADM').down('vispclgrid[nemonico=SGOPPLUS]');

        var recOp = gridOpcion.getSelectionModel().getSelection();

        if (recOp.length > 0) {
            gridOpcion.getSelectionModel().deselectAll();
            gridOpcion.getSelectionModel().select(recOp[0]);
        }
    },

    CerrarOpcion: function () {
        this.isload = false;
        WorkSpace.ROLADM = null;
    },

    checkOperacion: function (grid, view, recordIndex, cellIndex, item, record) {
      
        var gridRoles = grid.up('visprincipalROLADM').down('vispclgrid[nemonico=SGROLPLUS]');
        recRol = gridRoles.getSelectionModel().getSelection();
        
        if (recRol.length > 0) {
            if (record.get('IDOPCIONOP2') != null) {
                
                Ext.Ajax.request({
                    method: 'POST',
                    waitMsg: WorkSpace.Label.Enviando,
                    url: WorkSpace.ROLADM.url.ExecStoredProcedure,
                    params: {
                        sp: 'deleteRolesOpciones',
                        parametros: Ext.encode([recRol[0].data.IDROL, record.data.IDOPCIONOP])
                    },
                    success: function (response) {
                        grid.store.load();
                    },
                    failure: function (form, action) {
                        WorkSpace.alert(WorkSpace.Label.Informacion, WorkSpace.Msg.NoConexion);
                    }
                });
            } else {
                
                Ext.Ajax.request({
                    method: 'POST',
                    waitMsg: WorkSpace.Label.Enviando,
                    url: WorkSpace.ROLADM.url.ExecStoredProcedure,
                    params: {
                        sp: 'insertRolesOpciones',
                        parametros: Ext.encode([recRol[0].data.IDROL, record.data.IDOPCIONOP, recRol[0].data.IDENTORNO, '@USUARIO'])
                    },
                    success: function (response) {
                        grid.store.load();
                    },
                    failure: function (form, action) {
                        WorkSpace.alert(WorkSpace.Label.Informacion, WorkSpace.Msg.NoConexion);
                    }
                });
            }
        }
       
        
  
    },

    checkRoles: function (grid, view, recordIndex, cellIndex, item, record) {

        var gridOperacion = grid.up('visprincipalROLADM').down('vispclgrid[nemonico=SGOPEPLUS]');
        var recOpe = gridOperacion.getSelectionModel().getSelection();
       
        if (recOpe.length > 0) {
            if (record.get('IDROL2') != null) {

                Ext.Ajax.request({
                    method: 'POST',
                    waitMsg: WorkSpace.Label.Enviando,
                    url: WorkSpace.ROLADM.url.ExecStoredProcedure,
                    params: {
                        sp: 'deleteRolesOpciones',
                        parametros: Ext.encode([record.data.IDROL, recOpe[0].data.IDOPCIONOP])
                    },
                    success: function (response) {
                        grid.store.load();
                    },
                    failure: function (form, action) {
                        WorkSpace.alert(WorkSpace.Label.Informacion, WorkSpace.Msg.NoConexion);
                    }
                });
            } else {

                Ext.Ajax.request({
                    method: 'POST',
                    waitMsg: WorkSpace.Label.Enviando,
                    url: WorkSpace.ROLADM.url.ExecStoredProcedure,
                    params: {
                        sp: 'insertRolesOpciones',
                        parametros: Ext.encode([record.data.IDROL, recOpe[0].data.IDOPCIONOP,record.data.IDENTORNO, '@USUARIO'])
                    },
                    success: function (response) {
                        grid.store.load();
                    },
                    failure: function (form, action) {
                        WorkSpace.alert(WorkSpace.Label.Informacion, WorkSpace.Msg.NoConexion);
                    }
                });
            }
        }
    },

    seleccionarAplicacion: function (el, records, index, eOpts) {
        //limpiar pcl de 3er nivel:

        var gridRoles = el.up('visprincipalROLADM').down('vispclgrid[nemonico=SGROLPLUS]');
        if (gridRoles != null) {
            gridRoles.getSelectionModel().deselectAll();
            gridRoles.store.removeAll();
        }
        var gridOperaciones = el.up('visprincipalROLADM').down('vispclgrid[nemonico=SGOPEPLUS]');

        if (gridOperaciones != null) {
            gridOperaciones.getSelectionModel().deselectAll();
            gridOperaciones.store.removeAll();
        }


        //combo entornos:

        var ComboEntorno = el.up('visprincipalROLADM').down('combobox[name=IdEntorno]');
        var vecParam = ['@IDUSUARIO', records[0].data.IDAPLICACION];
        ComboEntorno.store.proxy.extraParams.parametros = Ext.encode(vecParam);
        ComboEntorno.store.load(function () { 
            ComboEntorno.select(ComboEntorno.store.data.items[0].data.IDENTORNO);
           
            var PclRoles = el.up('visprincipalROLADM').down('vispclgrid[nemonico=SGROLPLUS]');
            if (PclRoles != null) {
                PclRoles.store.proxy.extraParams.filtro = "and IDENTORNO = '" + ComboEntorno.store.data.items[0].data.IDENTORNO + "'";
                PclRoles.store.load();
            }
        });

        //Pcl Opciones:


        var PclOpciones = el.up('visprincipalROLADM').down('vispclgrid[nemonico=SGOPPLUS]');
        if (PclOpciones != null) {
            PclOpciones.store.proxy.extraParams.filtro = "and IDAPLICACION = '" + records[0].data.IDAPLICACION + "'";
            PclOpciones.store.load();
        }


        //menu:

        var menu = el.up('visprincipalROLADM').down('treepanel[name=menuROLOP]');
        
        menu.store.proxy.extraParams.IdAplicacion = records[0].data.IDAPLICACION;
        //menu.store.proxy.extraParams.node = '/';
        var root = menu.getRootNode();
       /* console.log(root);
        if(root){
            root.destroy();
        }*/
        menu.setRootNode({
                text: 'Inicio',

                id: '/',
                expanded: false
        });
        
        
        menu.getRootNode().expand();

       
        
       
        
        


    },

    seleccionarEntorno: function (el, recordS, index, eOpts) {
        var gridRoles = el.up('visprincipalROLADM').down('vispclgrid[nemonico=SGROLPLUS]');
        if (gridRoles != null) {
            gridRoles.getSelectionModel().deselectAll();
            gridRoles.store.removeAll();
        }
        var gridOperaciones = el.up('visprincipalROLADM').down('vispclgrid[nemonico=SGOPEPLUS]');

        if (gridOperaciones != null) {
            gridOperaciones.getSelectionModel().deselectAll();
            gridOperaciones.store.removeAll();
        }

        var PclRoles = el.up('visprincipalROLADM').down('vispclgrid[nemonico=SGROLPLUS]');
        if (PclRoles != null) {
            PclRoles.store.proxy.extraParams.filtro = "and IDENTORNO = '" + recordS[0].data.IDENTORNO + "'";
            PclRoles.store.load();
        }

    },

    seleccionarOperacion: function (el, record, index, eOpts) {

        var gridRolesOperacion = el.view.up('visprincipalROLADM').down('gridpanel[name=gpOperacionRoles]');

        
        var ComboEntorno = el.view.up('visprincipalROLADM').down('combobox[name=IdEntorno]');
        var IDENTORNO = ComboEntorno.getValue();

        
            
            var vecParam = [IDENTORNO, '@IDUSUARIO', record.data.IDOPCIONOP];

            gridRolesOperacion.store.proxy.extraParams.parametros = Ext.encode(vecParam);

            gridRolesOperacion.store.load();
        
    },

    seleccionarOpcion: function (el, record, index, eOpts) {
      
        var gridRolesOperacion = el.view.up('visprincipalROLADM').down('gridpanel[name=gpRolesOperacion]');

        var gridRoles = el.view.up('visprincipalROLADM').down('vispclgrid[nemonico=SGROLPLUS]');
       
        var recRol = gridRoles.getSelectionModel().getSelection();
       
        var IDROL = 0;

        if (recRol.length > 0) {
            IDROL = recRol[0].data.IDROL;
            var vecParam = [record.data.IDAPLICACION, record.data.IDOPCION, IDROL];

            gridRolesOperacion.store.proxy.extraParams.parametros = Ext.encode(vecParam);

            gridRolesOperacion.store.load();
        }

       
    },

    seleccionarRol: function (el, record, index, eOpts) {

        var gridRolesOperacion = el.view.up('visprincipalROLADM').down('gridpanel[name=gpRolesOperacion]');

        var gridOpciones = el.view.up('visprincipalROLADM').down('vispclgrid[nemonico=SGOPPLUS]');

        var recOP = gridOpciones.getSelectionModel().getSelection();

        var IDOPCION = 0;
        var IDAPLICACION = 0;

        if (recOP.length > 0) {
            IDOPCION = recOP[0].data.IDOPCION;
            IDAPLICACION = recOP[0].data.IDAPLICACION;
            var vecParam = [IDAPLICACION, IDOPCION, record.data.IDROL];

            gridRolesOperacion.store.proxy.extraParams.parametros = Ext.encode(vecParam);

            gridRolesOperacion.store.load();
        }
        
        
    }
});


