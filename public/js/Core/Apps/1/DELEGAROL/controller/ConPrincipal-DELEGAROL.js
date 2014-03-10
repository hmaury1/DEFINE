Ext.define('SmPlus.Apps.1.DELEGAROL.controller.ConPrincipal-DELEGAROL', {
    extend: 'Ext.app.Controller',
    
    views: [
        'SmPlus.Apps.1.DELEGAROL.view.VisPrincipal-DELEGAROL'
    ],
    stores:[
        'SmPlus.Apps.1.DELEGAROL.store.stoUsuarios-DELEGAROL',
       
        'SmPlus.Apps.1.DELEGAROL.store.stoRoles-DELEGAROL'

    ],

    isload: false,
    

    init: function () {
        
        if (!this.isload) {
            
            this.isload = true;
            WorkSpace.DELEGAROL.vistas['VisPrincipal'] = Ext.widget("viscodigoopcion", {
                nemonico: "DELEGAROL",
                aplicacion: "1",
                title: "Delegación de roles",

                items: [
                    Ext.create('SmPlus.Apps.1.DELEGAROL.view.VisPrincipal-DELEGAROL')
                ]
            });

            WorkSpace.Vistas.VisPrincipal.down('tabpanel[name=tpContenido]').add(WorkSpace.DELEGAROL.vistas['VisPrincipal']);
            WorkSpace.Vistas.VisPrincipal.down('tabpanel[name=tpContenido]').setActiveTab(WorkSpace.DELEGAROL.vistas['VisPrincipal']);

            var gridUsuario = WorkSpace.DELEGAROL.vistas['VisPrincipal'].down('gridpanel[name=gpUsuarioRoles]');
            gridUsuario.store.removeAll();
            var gridRoles = WorkSpace.DELEGAROL.vistas['VisPrincipal'].down('gridpanel[name=gpRoles]');
            gridRoles.store.removeAll();

            this.control({
                'visprincipalDELEGAROL': {
                    destroy: this.CerrarOpcion
                },
                'visprincipalDELEGAROL vispclgrid[nemonico=SGRLADMIN]': {
                    select: this.seleccionarRolAdmin,
                    deselect: this.deseleccionarRolAdmin
                },
                'visprincipalDELEGAROL actioncolumn[name=checkBoxUsuarios]': {
                    click: this.checkUsuario
                },
                'visprincipalDELEGAROL actioncolumn[name=checkBoxRoles]': {
                    click: this.checkRoles
                }
            });

        } 

        
       
    },

    CerrarOpcion: function () {
        this.isload = false;
        WorkSpace.DELEGAROL = null;
    },

    seleccionarRolAdmin: function (el, record, index, eOpts) {

        var gridUsuario = el.view.up('visprincipalDELEGAROL').down('gridpanel[name=gpUsuarioRoles]');
        console.log(record);
        var vecParam = [record.data.IDROL];

        gridUsuario.store.proxy.extraParams.parametros = Ext.encode(vecParam);

        gridUsuario.store.load();

        var gridRoles = el.view.up('visprincipalDELEGAROL').down('gridpanel[name=gpRoles]');

        var vecParam2 = [record.data.IDROL, record.data.IDAPLICACION];

        gridRoles.store.proxy.extraParams.parametros = Ext.encode(vecParam2);

        gridRoles.store.load();

        
       


    },

    deseleccionarRolAdmin: function (el, record, index, eOpts) {
        var gridUsuario = el.view.up('visprincipalDELEGAROL').down('gridpanel[name=gpUsuarioRoles]');

        gridUsuario.store.removeAll();

        var gridRoles = el.view.up('visprincipalDELEGAROL').down('gridpanel[name=gpRoles]');

        gridRoles.store.removeAll();
    },

    checkUsuario: function (grid, view, recordIndex, cellIndex, item, record) {

        var gridRoles = grid.up('visprincipalDELEGAROL').down('vispclgrid[nemonico=SGRLADMIN]');
        var recRol = gridRoles.getSelectionModel().getSelection();

        if (recRol.length > 0) {
            if (record.get('IDUSUARIO2') != null) {

                Ext.Ajax.request({
                    method: 'POST',
                    waitMsg: WorkSpace.Label.Enviando,
                    url: WorkSpace.DELEGAROL.url.ExecStoredProcedure,
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
                    url: WorkSpace.DELEGAROL.url.ExecStoredProcedure,
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

        var gridRoles = grid.up('visprincipalDELEGAROL').down('vispclgrid[nemonico=SGRLADMIN]');
        var recRol = gridRoles.getSelectionModel().getSelection();

        if (recRol.length > 0) {
            if (record.get('IDROLUSUARIO') != null) {

                Ext.Ajax.request({
                    method: 'POST',
                    waitMsg: WorkSpace.Label.Enviando,
                    url: WorkSpace.DELEGAROL.url.ExecStoredProcedure,
                    params: {
                        sp: 'deleteDelegacionRoles',
                        parametros: Ext.encode([recRol[0].data.IDROL, record.data.IDROL])
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
                    url: WorkSpace.DELEGAROL.url.ExecStoredProcedure,
                    params: {
                        sp: 'insertDelegacionRoles',
                        parametros: Ext.encode([recRol[0].data.IDROL, record.data.IDROL, '@USUARIO'])
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



    }


});


