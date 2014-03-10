Ext.define('SmPlus.controller.Core.ConPanelControl', {
    extend: 'Ext.app.Controller',

    init: function () {


        this.control({
            'visPanelControl dataview[name=dvpanel]': {
                itemdblclick: this.clickOpcion,
                itemcontextmenu: this.menuOpcion
            },
            'viscontextmenu menuitem[action=clickDdirecto]': {
                click: this.clickDeleteAccesodirecto
            }
        });
    },

    clickDeleteAccesodirecto: function (el) {
        WorkSpace.MostrarMascara();
        Ext.Ajax.request({
            method: 'POST',
            url: WorkSpace.Url.eliminarAccesoDirecto,
            params: {
                record: Ext.encode(el.record.data)
            },
            success: function (response) {
                try {
                    WorkSpace.OcultarMascara();
                    var resp = Ext.decode(response.responseText);

                    
                        if (resp.success) {
                            WorkSpace['Vistas']['VisPrincipal'].down('dataview[name=dvpanel]').store.load();

                        } else {

                            WorkSpace.alert(WorkSpace.Label.Informacion, resp.message);
                        }


                   
                } catch (e) {
                    WorkSpace.OcultarMascara();

                    WorkSpace.alert(WorkSpace.Label.Informacion, WorkSpace.Msg.NoConexion);


                }

            },
            failure: function (form, action) {
                WorkSpace.OcultarMascara();

                WorkSpace.alert(WorkSpace.Label.Informacion, WorkSpace.Msg.NoConexion);

            }
        });

    },


    menuOpcion: function (el, record, item, index, e, eOpts) {

        if(record.data.usuario != "PUBLICO" ){
            var menu = Ext.widget('viscontextmenu', { panel: true, record: record });
            menu.showAt(e.xy);
        }
    },

    clickOpcion: function (view, record, item) {
        Main.getController('Core.ConOpcion').opcion(0, record.data.nemonico);
    }

});