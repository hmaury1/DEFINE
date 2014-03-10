Ext.define('SmPlus.Apps.1.ROLUSU.controller.ConPrincipal-ROLUSU', {
    extend: 'Ext.app.Controller',
    
    views: [
        'SmPlus.Apps.1.ROLUSU.view.VisPrincipal-ROLUSU'
    ],
    stores:[
        'SmPlus.Apps.1.ROLUSU.store.stoRoles-ROLUSU',
        'SmPlus.Apps.1.ROLUSU.store.stoUsuarios-ROLUSU',
        'SmPlus.Apps.1.ROLUSU.store.stoAplicaciones-ROLUSU',
        'SmPlus.Apps.1.ROLUSU.store.stoEntornos-ROLUSU'
    ],

    isload: false,
    

    init: function () {
        
        if (!this.isload) {
            this.isload = true;
            WorkSpace.ROLUSU.vistas['VisPrincipal'] = Ext.widget("viscodigoopcion", {
                nemonico: "ROLUSU",
                aplicacion: "1",
                title: "Roles Usuario",

                items: [
                    Ext.create('SmPlus.Apps.1.ROLUSU.view.VisPrincipal-ROLUSU')
                ]
            });

            WorkSpace.Vistas.VisPrincipal.down('tabpanel[name=tpContenido]').add(WorkSpace.ROLUSU.vistas['VisPrincipal']);
            WorkSpace.Vistas.VisPrincipal.down('tabpanel[name=tpContenido]').setActiveTab(WorkSpace.ROLUSU.vistas['VisPrincipal']);

            var gridRolesUsuario = WorkSpace.ROLUSU.vistas['VisPrincipal'].down('gridpanel[name=gpRolesUsuario]');
            gridRolesUsuario.getSelectionModel().deselectAll();
            gridRolesUsuario.store.removeAll();

            gridRolesUsuario = WorkSpace.ROLUSU.vistas['VisPrincipal'].down('gridpanel[name=gpUsuarioRoles]');
            gridRolesUsuario.getSelectionModel().deselectAll();
            gridRolesUsuario.store.removeAll();

            this.control({
                'visprincipalROLUSU': {
                    destroy: this.CerrarOpcion
                },
                'visprincipalROLUSU combobox[name=IdAplicacion]': {
                    select: this.seleccionarAplicacion
                },
                'visprincipalROLUSU combobox[name=IdEntorno]': {
                    select: this.seleccionarEntorno
                },
                'visprincipalROLUSU vispclgrid[nemonico=SGUSPLUS]': {
                    select: this.seleccionarUsuario,
                    deselect: this.deseleccionarUsuario
                },
                'visprincipalROLUSU vispclgrid[nemonico=SGROLPLUS]': {
                    afterrender: this.ActiveRoles,
                    select: this.seleccionarRol,
                    deselect: this.deseleccionarRol

                },
                'visprincipalROLUSU actioncolumn[name=checkBoxUsuarios]': {
                    click: this.checkUsuario
                },
                'visprincipalROLUSU actioncolumn[name=checkBoxRoles]': {
                    click: this.checkRoles
                }
            });

        }

       
       
    },

    ActiveRoles: function (el, opt) {
      
        var comboEntorno = el.up('visprincipalROLUSU').down('combobox[name=IdEntorno]');
        var PclRoles = el.up('visprincipalROLUSU').down('vispclgrid[nemonico=SGROLPLUS]');

        PclRoles.store.proxy.extraParams.filtro = "and IDENTORNO = '" + comboEntorno.getValue() + "'";
       
        PclRoles.store.load();
        
        
    },

    checkUsuario: function (grid, view, recordIndex, cellIndex, item, record) {
      
        var gridRoles = grid.up('visprincipalROLUSU').down('vispclgrid[nemonico=SGROLPLUS]');
        var recRol = gridRoles.getSelectionModel().getSelection();
        
        if (recRol.length > 0) {
            if (record.get('IDUSUARIO2') != null) {
                
                Ext.Ajax.request({
                    method: 'POST',
                    waitMsg: WorkSpace.Label.Enviando,
                    url: WorkSpace.ROLUSU.url.ExecStoredProcedure,
                    params: {
                        sp: 'deleteRolesUsuario',
                        parametros: Ext.encode([recRol[0].data.IDROL, record.data.IDUSUARIO])
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
                    url: WorkSpace.ROLUSU.url.ExecStoredProcedure,
                    params: {
                        sp: 'insertRolesUsuario',
                        parametros: Ext.encode([recRol[0].data.IDROL, record.data.IDUSUARIO, '@USUARIO'])
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

        var gridUsuario = grid.up('visprincipalROLUSU').down('vispclgrid[nemonico=SGUSPLUS]');
        var recUs = gridUsuario.getSelectionModel().getSelection();
        
        if (recUs.length > 0) {
            if (record.get('IDROL2') != null) {

                Ext.Ajax.request({
                    method: 'POST',
                    waitMsg: WorkSpace.Label.Enviando,
                    url: WorkSpace.ROLUSU.url.ExecStoredProcedure,
                    params: {
                        sp: 'deleteRolesUsuario',
                        parametros: Ext.encode([record.data.IDROL, recUs[0].data.IDUSUARIO])
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
                    url: WorkSpace.ROLUSU.url.ExecStoredProcedure,
                    params: {
                        sp: 'insertRolesUsuario',
                        parametros: Ext.encode([record.data.IDROL, recUs[0].data.IDUSUARIO, '@USUARIO'])
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

    CerrarOpcion:function(){
        this.isload = false;
        WorkSpace.ROLUSU = null;
    },

   
    seleccionarAplicacion: function (combo, records, eOpts) {

        var ComboEntorno = combo.up('visprincipalROLUSU').down('combobox[name=IdEntorno]');

        var vecParam = ['@IDUSUARIO', records[0].data.IDAPLICACION];

        ComboEntorno.store.proxy.extraParams.parametros = Ext.encode(vecParam);

        ComboEntorno.store.load(function () {
            ComboEntorno.select(ComboEntorno.store.data.items[0].data.IDENTORNO);
            var gridUsuarioRoles = combo.up('visprincipalROLUSU').down('gridpanel[name=gpUsuarioRoles]');
            gridUsuarioRoles.getSelectionModel().deselectAll();
            gridUsuarioRoles.store.removeAll();

            var gridRolesUsuario = combo.up('visprincipalROLUSU').down('gridpanel[name=gpRolesUsuario]');

            gridRolesUsuario.getSelectionModel().deselectAll();
            gridRolesUsuario.store.removeAll();

            var PclRoles = combo.up('visprincipalROLUSU').down('vispclgrid[nemonico=SGROLPLUS]');
            if (PclRoles != null) {
                PclRoles.store.proxy.extraParams.filtro = "and IDENTORNO = '" + ComboEntorno.store.data.items[0].data.IDENTORNO + "'";
                PclRoles.store.load();
            }
        });
       


    },

    seleccionarEntorno: function (el, recordS, index, eOpts) {
        var gridUsuarioRoles = el.up('visprincipalROLUSU').down('gridpanel[name=gpUsuarioRoles]');
        gridUsuarioRoles.getSelectionModel().deselectAll();
        gridUsuarioRoles.store.removeAll();

        var gridRolesUsuario = el.up('visprincipalROLUSU').down('gridpanel[name=gpRolesUsuario]');
        gridRolesUsuario.getSelectionModel().deselectAll();

        gridRolesUsuario.store.removeAll();

        var PclRoles = el.up('visprincipalROLUSU').down('vispclgrid[nemonico=SGROLPLUS]');
        if (PclRoles != null) {
            PclRoles.store.proxy.extraParams.filtro = "and IDENTORNO = '" + recordS[0].data.IDENTORNO + "'";
            PclRoles.store.load();
        }
       
    },

    seleccionarUsuario: function (el, record, index, eOpts) {
       
        var gridRolesUsuario = el.view.up('visprincipalROLUSU').down('gridpanel[name=gpRolesUsuario]');

        var ComboEntorno = el.view.up('visprincipalROLUSU').down('combobox[name=IdEntorno]');

        
        var IDENTORNO = ComboEntorno.getValue();

        if (IDENTORNO!="") {
           
            var vecParam = [IDENTORNO, '@IDUSUARIO', record.data.IDUSUARIO];

            gridRolesUsuario.store.proxy.extraParams.parametros = Ext.encode(vecParam);

            gridRolesUsuario.store.load();
        }

    }
    ,

        deseleccionarUsuario: function (el, record, index, eOpts) {
            
            var gridRolesUsuario = el.view.up('visprincipalROLUSU').down('gridpanel[name=gpRolesUsuario]');

            gridRolesUsuario.getSelectionModel().deselectAll();
            gridRolesUsuario.store.removeAll();
        
        },

    seleccionarRol: function (el, record, index, eOpts) {

        var gridUsuarioRoles = el.view.up('visprincipalROLUSU').down('gridpanel[name=gpUsuarioRoles]');

        var ComboEntorno = el.view.up('visprincipalROLUSU').down('combobox[name=IdEntorno]');

        
        var IDENTORNO = ComboEntorno.getValue();
            var vecParam = [IDENTORNO, '@IDUSUARIO', record.data.IDROL];

            gridUsuarioRoles.store.proxy.extraParams.parametros = Ext.encode(vecParam);

            gridUsuarioRoles.store.load();
        
        
    },

    deseleccionarRol: function (el, record, index, eOpts) {
        
        var gridUsuarioRoles = el.view.up('visprincipalROLUSU').down('gridpanel[name=gpUsuarioRoles]');
        gridUsuarioRoles.getSelectionModel().deselectAll();
        gridUsuarioRoles.store.removeAll();
        
    }
});


