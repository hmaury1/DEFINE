Ext.define('SmPlus.controller.Core.ConMenu', {
    extend: 'Ext.app.Controller',
    
    init: function () {
        

        this.control({
            'visprincipal treepanel[name=tpMenu]': {
               
                itemdblclick: this.SeleccionarItem,
                itemclick: this.MostrarNemonico,
                itemcontextmenu: this.clickDerechoMenu,
                load: this.LoadNodos


            }, 'visprincipal button[action=clickLoadMenu]': {

                click: this.CargarMenu


            },

            'viscontextmenu menuitem[action=clickAdirecto]': {
                click: this.clickAccesodirecto
            }
        });
    },

    LoadNodos: function (el, node, records, successful, eOpts) {
/*
        for (var i = 0; i < records.length; i++) {
            if (records[i].data.iconCls != "NA") {
                console.log(records[i]);
                var css = document.createElement('style');
                css.type = 'text/css';

                var styles = '.' + records[i].data.iconCls + ' {     background-image: url(' + records[i].data.srcIcon + ')!important;   }';

                if (css.styleSheet) css.styleSheet.cssText = styles;
                else css.appendChild(document.createTextNode(styles));

                document.getElementsByTagName("head")[0].appendChild(css);

              //  console.log(document);
            }
        }
        */
    },

    CargarMenu: function () {
        WorkSpace.Vistas.VisPrincipal.down('visnavegador').down('treepanel[name=tpMenu]').store.load();
    },

    clickAccesodirecto: function (el) {
        WorkSpace.MostrarMascara();
        Ext.Ajax.request({
            method: 'POST',
            url: WorkSpace.Url.crearAccesoDirecto,
            params: {
                record:Ext.encode(el.record.data)
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

   /* onLoad:function(el, node, records, successful, eOpts){
      
        if (successful) {
            for (var i = 0; i < records.length; i++) {
                WorkSpace.AddIcon(records[i].data.iconUrl, records[i].data.iconCls);
            }
        }

    },*/

   /* cargarOpcion: function (el, record, item, index, e, eOpts) {
        
         
         if (record.data.topcion != 'M') {
             Main.getController('Core.ConOpciones').opcion(record.data.nemonico);
         }
          
         
    },

    
*/
    SeleccionarItem: function (el, record, item, index, e, eOpts) {
       
       
                WorkSpace.Vistas.VisPrincipal.down('visnavegador').down('label[name=txtNemonico]').setText(record.data.nemonico);
                
                if (record.data.topcion != 'M') {
                    Main.getController('Core.ConOpcion').opcion(0,record.data.nemonico);
                } 
       


    },

    MostrarNemonico: function (el, record, item, index, e, eOpts) {

       
                WorkSpace.Vistas.VisPrincipal.down('visnavegador').down('label[name=txtNemonico]').setText(record.data.nemonico);
                
       
        
    },

    

    clickDerechoMenu: function (el, record, item, index, e, eOpts) {
       
        if (record.data.topcion != "M") {

            var menu = Ext.widget('viscontextmenu', {record:record});
            menu.showAt(e.xy);

        }

    }

});