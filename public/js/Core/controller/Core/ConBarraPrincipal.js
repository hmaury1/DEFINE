Ext.define('SmPlus.controller.Core.ConBarraPrincipal', {
    extend: 'Ext.app.Controller',
    init: function () {
        this.control({
            'visbarraprincipal button[action=clickConsole]': {
                click: this.Consola
            },
            'visbarraprincipal button[action=clickPanelControl]': {
                click: this.PanelDeControl
            },
            'visbarraprincipal button[action=clickCerrarSesion]': {
                click: this.CerrarSesion
            }
        });
    },

   Consola: function (el, e) {
       Main.getController('Core.ConOpcion').openConsole();
   },

   PanelDeControl: function (el, e) {
               if (WorkSpace['Vistas']['VisPanelDeControl'] != null) {
                   WorkSpace['Vistas']['VisPrincipal'].down('tabpanel[name=tpContenido]').setActiveTab(WorkSpace['Vistas']['VisPanelDeControl']);
               } else {
                  Main.CargarPanelControl();
               }
   },

   CerrarSesion: function () {
       Ext.Ajax.request({
           url: WorkSpace.Url.CerrarSesion,
           success: function (response) {
               var resp = Ext.decode(response.responseText);
               if (resp.success) {
               document.location = BasePath +'Home';
               } else {
                   WorkSpace.alert(WorkSpace.Label.Informacion, WorkSpace.Msg.NoConexion);
               }
           },
           failure: function () {
           }
       });
   }
});