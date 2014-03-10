Ext.define('SmPlus.controller.PCL.ConPclGrid', {
    extend: 'Ext.app.Controller',
    changePage: false, // se activa mientras se cambia el tamaño de la pagina.deselectAll
    SwSelect: false,
    SwDeselect: false,
    init: function () {

        this.control({
            
            'vispclgrid button[action=clickUp]': {
                click: this.MoverRegistroArriba
            },
            'vispclgrid button[action=clickDown]': {
                click: this.MoverRegistroAbajo
            },
            'vispclgrid button[action=clickPrint]': {
                click: this.Print
            },
            'vispclgrid button[action=clickPaginar]': {
                click: this.Paginar
            },
            'vispclgrid button[action=Click-Export]': {
                click: this.Exportar
            },
            'vispclgrid button[action=clickPlot]': {
                click: this.Graficar
            },
            'vispclgrid menuitem[action=Click-Marcar]': {
                click: this.Marcar
            },
            'vispclgrid menuitem[action=Click-Desmarcar]': {
                click: this.DesMarcar
            },
            'vispclgrid colormenu[action=Click-MarcarColor]': {
                select: this.Marcar
            },
            'vispclgrid menuitem[action=Click-LimpiarMarcas]': {
                click: this.LimpiarMarcas
            },
            'vispclgrid menuitem[action=Click-TodasMarcas]': {
                click: this.TodasMarcas
            },
            'vispclgrid menuitem[action=Click-Notas]': {
                click: this.Notas
            },
            'vispclgrid': {
                cellclick:this.cellclick,
                itemclick: this.seleccion,
                celldblclick: this.dblClick,
                activate: this.ActiveTab,
                deselect: this.deseleccion,
                beforeedit: this.CellEditing,
                validateedit: this.validateedit,
                viewready:this.viewready

            }, 'vispclgrid numberfield[action=changePageSize]': {
                change: this.cambiarTamañoPagina
            }
        });

    },

    CellEditing: function (el, opt) {
        opt.column.field.RecordData = opt.record;

        var pcl = el.grid.up('vispcl');
        if (opt.column.name == "SM001MKNOTAS") {
            this.Notas(opt.column);
            return false;
        } else {
            if (pcl.ModoEdicion != true || opt.column.EDITALLOW == "RO") {
                return false;
            } else {
                if (opt.record.phantom) {
                    if (opt.column.EDITALLOW == 'UO') {
                        return false;
                    }
                } else {
                    if (opt.column.EDITALLOW == 'IO') {
                        return false;
                    }
                }
            }
        }
        var SMEvent_beforeCellEdit = {
            cancel: false,
            pcl: pcl,
            Global: pcl.metaData.Global,
            field: el,
            name: opt.field,
            inForm: false,
            record: opt.record
        };
        if (pcl.metaData.eventosPcl.beforeCellEdit) {
            try {
                pcl.metaData.eventosPcl.beforeCellEdit(SMEvent_beforeCellEdit);
            } catch (e) {
                console.log('SMError 116 error en la ejecucion del evento beforeEdit en la grilla: ' + e.message);
                SMEvent_beforeCellEdit.cancel = false;
            }

        }
        if (SMEvent_beforeCellEdit.cancel != false) {
            return false;
        }
        //Main.getController("PCL.ConCrud").focusGrid(opt.column.field, null, null);
        return true;
    },

    validateedit: function (editor, opt) {
        opt.column.field.RecordData = opt.record;

        if (opt.column.field.xtype != 'viszoom') {
            var grid = opt.column.field.up('vispclgrid');
            var crud = Main.getController("PCL.ConCrud")
            var vec = crud.validateFieldGrid(opt.column.field, opt.value, opt.record, true);
            opt.value = vec[0];
            opt.record = vec[1];
            if (vec[2] != true) {
                opt.cancel = true;
                Ext.Msg.alert(WorkSpace.Label.Informacion, vec[2]);
            }
        } else {
            var grid = opt.column.field.up('vispclgrid');
            var vec = Main.getController("Controles.ConZoom").complete(opt.column.field, opt.column.field.value, opt.column.field.originalValue, null, true);
            opt.value = vec[0];
            opt.record = vec[1];
            console.log(vec);
            if (vec[2] != true) {
                opt.cancel = true;
                Ext.Msg.alert(WorkSpace.Label.Informacion, vec[2]);
            }
        }
        Main.getController("PCL.ConCrud").blurGrid(opt.column.field, null, null);
    },

    cellclick: function (el, td, cellIndex, record, tr, rowIndex) {
        var pcl = el.up('vispcl');
        var grid = el.up('vispclgrid');
        var opt = grid.columns[cellIndex];
        grid.gRow = rowIndex;
        grid.gCell = cellIndex;

        if (opt.name == "SM001MKNOTAS") {
            this.Notas(opt);
        } else {

            WorkSpace['Vistas']['VisPrincipal'].down('statusbar[name=estado]').setStatus({
                text: opt.help,
                clear: {
                    wait: 8000,
                    anim: true,
                    useDefaults: false
                }
            });

            var SMEvent_cellSelect = {
                pcl: pcl,
                Global: pcl.metaData.Global,
                el: el,
                column: opt,
                grid:grid,
                td: td,
                cellIndex: cellIndex,
                record: record,
                tr: tr,
                rowIndex: rowIndex
            };
            if (pcl.metaData.eventosPcl.cellSelect) {
                try {
                    pcl.metaData.eventosPcl.cellSelect(SMEvent_cellSelect);
                } catch (e) {
                    console.log('SMError 111 error en la ejecucion del evento cellSelect: ' + e.message);                    
                }

            }
        }
        
    },

    viewready: function( grid ) {
        /*este evento permite copiar y pegar en la grilla, pendiente para la version 2.0*/
        var map = new Ext.KeyMap(grid.getEl(), 
        [/*{
            key: "c",
            ctrl:true,
            fn: function(keyCode, e) {

                var recs = grid.getSelectionModel().getSelection();

                if (recs && recs.length != 0) {

                    var clipText = grid.getCsvDataFromRecs(recs,grid.store);

                    var ta = document.createElement('textarea');

                    ta.id = 'cliparea';
                    ta.style.position = 'absolute';
                    ta.style.left = '-1000px';
                    ta.style.top = '-1000px';
                    ta.value = clipText;
                    document.body.appendChild(ta);
                    document.designMode = 'off';

                    ta.focus();
                    ta.select();

                    setTimeout(function(){

                        document.body.removeChild(ta);

                    }, 100);
                }
            }
        },
        {

            key: "v",
            ctrl: true,
            fn: function () {
                
                var ta = document.createElement('textarea');
                ta.id = 'cliparea';

                ta.style.position = 'absolute';
                ta.style.left = '-1000px';
                ta.style.top = '-1000px';
                ta.value = '';

                document.body.appendChild(ta);
                document.designMode = 'off';

                setTimeout(function () {

                    grid.getRecsFromCsv(grid, ta);
                }, 100);

                ta.focus();
                ta.select();
            }
        }*/
        ]);
    },

    Graficar: function (el) {
        var grid = el.up('vispclgrid');

        var VentanaGraficar = Ext.widget('visgraficar', { grid: grid });
        VentanaGraficar.show();


    },

    dblClick: function (el, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var pcl = el.up('vispcl');
       
        if (pcl.ModoEdicion != true) {


            if (pcl.metaData.eventosPcl.dblClick) {
                var columns = el.up('vispclgrid').columns;

                var SMEvent_dblClick = {
                    pcl: pcl,
                    Global: pcl.metaData.Global,
                    el: el,
                    td: td,
                    cellIndex: cellIndex,
                    record: record,
                    tr: tr,
                    rowIndex: rowIndex,
                    e: e,
                    eOpts: eOpts,
                    field: columns[cellIndex],
                    name: columns[cellIndex].dataIndex
                };
                
                try {
                    pcl.metaData.eventosPcl.dblClick(SMEvent_dblClick);
                } catch (e) {
                    console.log('SMError 110 error en la ejecucion del evento dblClick: ' + e.message);
                }
               
            }
        }

    },

    cambiarTamañoPagina: function (el, newValue, oldValue, eOpts) {
        if (el.isValid()) {
            if (this.changePage != true) {
                this.changePage = true;
                var vispclgrid = el.up('vispclgrid');
                var tabs = el.up('vispcltabgrid');
                var grids = tabs.items.items;

                for (var i = 0; i < grids.length; i++) {
                    var grid = grids[i];
                    var pagintool = grid.down('pagingtoolbar');
                    
                    pagintool.down('numberfield[action=changePageSize]').setValue(newValue);

                }
                this.changePage = false;
                vispclgrid.store.proxy.extraParams.limit = newValue;
                vispclgrid.store.pageSize = newValue;
                vispclgrid.store.loadPage(1);
            }
        }
    },

    Print: function (el) {
        var grid = el.up('vispclgrid');
        

        Ext.ux.grid.Printer.printAutomatically = false;
        Ext.ux.grid.Printer.print(grid);
       
    },

    Paginar: function (el) {
        var vispclgrid = el.up('vispclgrid');
        var tabs = el.up('vispcltabgrid');
        var grids = tabs.items.items;
        var pt = vispclgrid.down('pagingtoolbar');
        if (vispclgrid.store.proxy.extraParams.paginar) {
            vispclgrid.store.proxy.extraParams.paginar = false;

            for (var i = 0; i < grids.length; i++) {
                var grid = grids[i];
                var pagintool = grid.down('pagingtoolbar');
                pagintool.setVisible(false);

            }
            vispclgrid.store.load();
           

        } else {
            vispclgrid.store.proxy.extraParams.paginar = true;

            for (var i = 0; i < grids.length; i++) {
                var grid = grids[i];
                var pagintool = grid.down('pagingtoolbar');
                pagintool.setVisible(true);

            }
            vispclgrid.store.load();
        }
        

        

    },


    getSelectedRowIndex: function (grid) {

        var r = grid.getSelectionModel().getSelection();
        var s = grid.getStore();
        return s.indexOf(r[0]);

    },

    MoverRegistroArriba: function (el, e, opt) {
        var grilla = el.up('vispclgrid');
        var storegrilla = grilla.store;
        var rowIndex = this.getSelectedRowIndex(grilla);
        var selrecords = grilla.getSelectionModel().getSelection();
        if (selrecords.length == 1) {
            if (rowIndex != 0) {
                grilla.getSelectionModel().select(rowIndex - 1);
                this.seleccion(grilla,true);
            }
        } else {
            
            if (storegrilla.data.length > 0) {
                grilla.getSelectionModel().select(storegrilla.getCount() - 1);
                this.seleccion(grilla,true);
            }
        }
    },

    MoverRegistroAbajo: function (el, e, opt) {
        var grilla = el.up('vispclgrid');
        var storegrilla = grilla.store;
        var rowIndex = this.getSelectedRowIndex(grilla);
        var selrecords = grilla.getSelectionModel().getSelection();
        if (selrecords.length > 0) {
            if (rowIndex != storegrilla.getCount() - 1) {
                grilla.getSelectionModel().select(rowIndex + 1);
                this.seleccion(grilla,true);
            }
        } else {
            
            if (storegrilla.data.length > 0) {
                grilla.getSelectionModel().select(0);
                this.seleccion(grilla,true);
            }
        }
    },

    ActiveTab: function (el) {
        if (el.activo != true) {
            el.activo = true;
            var Pcl = el.up('vispcl');

            var Grids = Pcl.down('tabpanel[name=Pcl-contenido]');


            for (var i = 0; i < Grids.items.items.length; i++) {

                if (Grids.items.items[i].title != el.title) {
                     if (Grids.items.items[i].rendered === true) {
                        var records = Grids.items.items[i].getSelectionModel().getSelection();
                        if (records.length > 0) {
                            this.SwSelect = true;
                            el.getSelectionModel().select(records[0]);
                            this.SwSelect = false;
                        }
                        break;

                    }
                }
            }
        }
    },

    seleccion: function (el,sw) {
        
        if (this.SwSelect === false) {
            if (sw == true) {
                var grid = el;
            } else {
                var grid = el.up('gridpanel');
            }
            var Pcl = grid.up('vispcl');
            var record = {};
            var records = grid.getSelectionModel().getSelection()
            if (records.length > 0) {
                record = records[0];
                if (grid.seleccionadoId == record.internalId) { return; } 
            } else {
                return;
            }

            grid.seleccionadoId = record.internalId;
            var Pcl = grid.up('vispcl');

            var Grids = Pcl.down('tabpanel[name=Pcl-contenido]');

            this.SwSelect = true;
            for (var i = 0; i < Grids.items.items.length; i++) {

                Grids.items.items[i].getSelectionModel().select(record);
                Grids.items.items[i].seleccionadoId = record.internalId;
            }
            this.SwSelect = false;
            if (!Pcl.isLink && !Pcl.isZoom && !Pcl.isDinamico) {



                var link = Pcl.down('tabpanel[name=Pcl-links]');
                if (link.items.length > 0) {

                    for (var k = 0; k < link.items.items.length; k++) {
                        var element = link.items.items[k];

                        var PclFields = element.campoPcl.split(',');
                        var LnkFields = element.campoLnk.split(',');
                        var fl = "";

                        for (var i = 0; i < PclFields.length; i++) {


                            if (PclFields[i] != "") {
                                fl += " and " + LnkFields[i] + " = '" + record.get(PclFields[i]) + "'";

                            }
                        }
                        for (var j = 0; j < LnkFields.length; j++) {

                            if (LnkFields[j] != "") {

                                if (LnkFields[j].indexOf("=") != -1) {
                                    fl += " and " + LnkFields[j];
                                }
                            }
                        }
                        flbk = fl;
                        var SMEvent_getLinkFilter = {
                            pcl: Pcl,
                            Global: Pcl.metaData.Global,
                            filtro: fl,
                            nemonicoLink: element.nemonico,
                            record: record
                        };
                        if (Pcl.metaData.eventosPcl.getLinkFilter) {
                            try {
                                Pcl.metaData.eventosPcl.getLinkFilter(SMEvent_getLinkFilter);
                                fl = SMEvent_getLinkFilter.filtro;
                                
                            } catch (e) {
                                console.log('SMError 119 error en la ejecucion del evento getLinkFilter: ' + e.message);
                                fl = flbk;
                            }

                        }
                        element.filtro = fl;
                        element.store.proxy.extraParams.filtro = fl;
                        element.store.load();

                    }

                   

                }
            }

            if (Pcl.isDinamico) {

                var pclDINAMICA = grid.up('vispcldinamica');

                if (pclDINAMICA.hijos) {

                    var visOpcion = pclDINAMICA.view;
                    for (var i = 0; i < pclDINAMICA.hijos.length; i++) {
                        var hijo = visOpcion.down('vispcldinamica[name=' + pclDINAMICA.hijos[i] + ']');
                        if (hijo.items.length > 0) {
                            var element = hijo.down('vispcl');


                            var fl = "";

                            var keys = hijo.llaves;

                            for (var k = 0; k < keys.length; k++) {
                                if (keys[k].padre != pclDINAMICA.name) {
                                    var padre = visOpcion.down('vispcldinamica[name=' + keys[k].padre + ']');
                                    if (padre.items.length > 0) {
                                        var gridP = padre.down('vispclgrid');

                                        var recordP = gridP.getSelectionModel().getSelection();

                                        if (recordP.length > 0) {
                                            fl += " and " + keys[k].campoLink + " = '" + recordP[0].data[keys[k].campoPadre] + "'";
                                        } else {
                                            fl += " and " + keys[k].campoLink + " = ''";
                                        }
                                    } else {
                                        fl += " and " + keys[k].campoLink + " = ''";
                                    }


                                } else {
                                    fl += " and " + keys[k].campoLink + " = '" + record.get(keys[k].campoPadre) + "'";
                                }

                            }


                            element.store.proxy.extraParams.filtro = fl;
                            element.filtro = fl;
                            var me = this;
                            element.store.load(function (records, operation, success) {
                                //los siguiente permite seleccionar el rpimer registro de la grilla hijo:
                                if (records.length > 0) {
                                    // element.down('vispclgrid').getSelectionModel().select(0);
                                } else {
                                    var gr = element.down('vispclgrid');
                                    //me.seleccion(gr, new gr.store.model())
                                    element.down('vispclgrid').getSelectionModel().select(new gr.store.model());
                                }

                            });
                        }

                    }
                }
            }
        }

    },

    deseleccion: function (el, record) {
        if (this.SwDeselect === false) {
            var grid = el.view;
            record = new grid.store.model();

            var Pcl = grid.up('vispcl');

            var Grids = Pcl.down('tabpanel[name=Pcl-contenido]');

            this.SwDeselect = true;

            for (var i = 0; i < Grids.items.items.length; i++) {

                Grids.items.items[i].getSelectionModel().deselectAll;
            }

            this.SwDeselect = false;

            if (!Pcl.isLink && !Pcl.isZoom && !Pcl.isDinamico) {
                var link = Pcl.down('tabpanel[name=Pcl-links]');
                if (link.items.length > 0) {

                    for (var k = 0; k < link.items.items.length; k++) {
                        var element = link.items.items[k];

                        var PclFields = element.campoPcl.split(',');
                        var LnkFields = element.campoLnk.split(',');
                        var fl = "";

                        for (var i = 0; i < PclFields.length; i++) {


                            if (PclFields[i] != "") {
                                fl += " and " + LnkFields[i] + " = '" + record.get(PclFields[i]) + "'";

                            }
                        }
                        for (var j = 0; j < LnkFields.length; j++) {

                            if (LnkFields[j] != "") {

                                if (LnkFields[j].indexOf("=") != -1) {
                                    fl += " and " + LnkFields[j];
                                }
                            }
                        }
                        element.store.proxy.extraParams.filtro = fl;
                        element.store.removeAll();

                    }


                   
                }
            }

            if (Pcl.isDinamico) {

                var pclDINAMICA = grid.up('vispcldinamica');

                if (pclDINAMICA.hijos) {

                    var visOpcion = pclDINAMICA.view;
                    for (var i = 0; i < pclDINAMICA.hijos.length; i++) {
                        var hijo = visOpcion.down('vispcldinamica[name=' + pclDINAMICA.hijos[i] + ']');
                        if (hijo.items.length > 0) {
                            var element = hijo.down('vispcl');


                            var fl = "";

                            var keys = hijo.llaves;

                            for (var k = 0; k < keys.length; k++) {
                                if (keys[k].padre != pclDINAMICA.name) {
                                    var padre = visOpcion.down('vispcldinamica[name=' + keys[k].padre + ']');
                                    if (padre.items.length > 0) {
                                        var gridP = padre.down('vispclgrid');

                                        var recordP = gridP.getSelectionModel().getSelection();

                                        if (recordP.length > 0) {
                                            fl += " and " + keys[k].campoLink + " = '" + recordP[0].data[keys[k].campoPadre] + "'";
                                        } else {
                                            fl += " and " + keys[k].campoLink + " = ''";
                                        }
                                    } else {
                                        fl += " and " + keys[k].campoLink + " = ''";
                                    }


                                } else {
                                    fl += " and " + keys[k].campoLink + " = '" + record.get(keys[k].campoPadre) + "'";
                                }

                            }


                            element.store.proxy.extraParams.filtro = fl;
                            element.filtro = fl;
                            var me = this;

                            element.store.removeAll();
                            var gr = element.down('vispclgrid');
                            element.down('vispclgrid').getSelectionModel().select(new grid.store.model());
                            //me.seleccion(gr, new gr.store.model());
                        }

                    }
                }
            }
        }
    },

    Exportar: function (el) {

        var type = el.Exptype;

        var urlfunc = el.urlfunc;
        var target = el.target;

        var grilla = el.up('vispclgrid');
        var pcl = el.up('vispcl');

        var nemonico = pcl.nemonico;

        var filtro = pcl.filtro;

        var filtroQbe = pcl.filtroQbe;

        var st = grilla.store;

        var columns = grilla.getView().getHeaderCt().getVisibleGridColumns();

        var colArray = [];
        var colSizes = [];

        for (i = 1; i < columns.length; i++) {

            colArray.push(columns[i].text)
            if (columns[i].width == undefined) {
                colSizes.push(columns[i].flex)
            } else {
                colSizes.push(columns[i].width)
            }

        }
        var strCol = Ext.encode(colArray);
        var strSizes = Ext.encode(colSizes);

        var datos = [];

       
        for (var i = 0; i < st.data.items.length; i++) {
            var row = [];
            for (j = 1; j < columns.length; j++) {
                row.push(st.data.items[i].data[columns[j].dataIndex])
            }
            datos.push(row);
        }

        var encDatos = Ext.encode(datos);


        win = Ext.widget('window', {
            width: 200,
            height: 200,
            items: [{
                xtype: 'form',
                standardSubmit: true,
                items: [

                        {
                            xtype: 'textfield',
                            value: nemonico,
                            name: 'nemonico'
                        }, {
                            xtype: 'textfield',
                            value: filtro,
                            name: 'filtro'
                        }, {
                            xtype: 'textfield',
                            value: filtroQbe,
                            name: 'filtroQbe'
                        }, {
                            xtype: 'textfield',
                            value: strCol,
                            name: 'columnas'
                        }, {
                            xtype: 'textfield',
                            value: strSizes,
                            name: 'tamanios'
                        }, {
                            xtype: 'textfield',
                            value: encDatos,
                            name: 'datos'
                        }
                ]
            }

            ]
        });

        win.show();
        form = win.down('form');
        form.getForm().submit({
            target: target,
            method: 'POST',
            url: urlfunc
        });

        win.hide();

    },
   
    DesMarcar: function (el) {
       
        var marca = "";
        var grid = el.up('vispclgrid');
        var pcl = grid.up('vispcl');
        var records = grid.getSelectionModel().getSelection();
        if (records.length > 0) {
            var record = records[0];
            var keys = pcl.metaData.keys;
            
            for (var i = 0; i < keys.length; i++) {
                marca = marca + record.data[keys[i]]+"-";

            }
            WorkSpace.MostrarMascara();
            Ext.Ajax.request({
                method: 'POST',
                url: WorkSpace.Url.eliminarMarca,
                params: {
                    nemonico: grid.nemonico,
                    marca: marca
                },
                success: function (response) {
                    try {
                        WorkSpace.OcultarMascara();
                        var resp = Ext.decode(response.responseText);

                        
                            if (resp.success) {
                                grid.store.load();
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
        }
       
    },

    LimpiarMarcas: function (el) {

        var marca = "";
        var grid = el.up('vispclgrid');

        
       
            WorkSpace.MostrarMascara();
            Ext.Ajax.request({
                method: 'POST',
                url: WorkSpace.Url.limpiarMarcas,
                params: {
                    nemonico: grid.nemonico
                },
                success: function (response) {
                    try {
                        WorkSpace.OcultarMascara();
                        var resp = Ext.decode(response.responseText);

                       
                            if (resp.success) {
                                grid.store.load();
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

    Marcar: function (el, color) {
        if (el.action == "Click-Marcar") {
            color = el.color;
        } else {
            el.value = "FFFFFF";//esto permite seleccionar el mismo color
        }
       
        
        var marca = "";
        var grid = el.up('vispclgrid');
        var pcl = grid.up('vispcl');
        var records = grid.getSelectionModel().getSelection();
        if (records.length > 0) {
            var record = records[0];
            var keys = pcl.metaData.keys;
            
            for (var i = 0; i < keys.length; i++) {
                marca = marca + record.data[keys[i]] + "-";

            }
            WorkSpace.MostrarMascara();
            Ext.Ajax.request({
                method: 'POST',
                url: WorkSpace.Url.marcar,
                params: {
                    nemonico: grid.nemonico,
                    marca: marca,
                    color: color
                },
                success: function (response) {
                    try {
                        WorkSpace.OcultarMascara();
                        var resp = Ext.decode(response.responseText);

                       
                            if (resp.success) {
                                grid.store.load();
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
        }

    },


    TodasMarcas: function (el) {

        grid = el.up("vispclgrid");

        Main.getController('PCL.ConPcl').LoadData(grid, grid.filtroqbe, true);
    },

    

    Notas: function (el) {
        var grid = el.up('vispclgrid');
        var pcl = grid.up('vispcl');
        var records = grid.getSelectionModel().getSelection();
        if (records.length > 0) {
            var record = records[0];
            var marca = "";


            var keys = pcl.metaData.keys;

            for (var i = 0; i < keys.length; i++) {
                marca = marca + record.data[keys[i]] + "-";

            }
            if (record.raw.SM002MKCOLOR != "" && record.raw.SM002MKCOLOR != undefined) {
                Ext.widget('visnota', {
                    title: "Nota(s)",
                    msg: record.raw.SM001MKNOTAS,
                    width: 500,
                    fn: function (btn) {

                        var value = btn.up('visnota').down('textareafield').value;
                        btn.up('visnota').close();
                        WorkSpace.MostrarMascara();
                        Ext.Ajax.request({
                            method: 'POST',
                            url: WorkSpace.Url.NotaMarca,
                            params: {
                                nemonico: grid.nemonico,
                                marca: marca,
                                nota: value
                            },
                            success: function (response) {
                                try {
                                    WorkSpace.OcultarMascara();
                                    var resp = Ext.decode(response.responseText);


                                    if (resp.success) {
                                        grid.store.load();
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

                    }
                }).show();
            }

        }
        
            
        

        

    }

    
});