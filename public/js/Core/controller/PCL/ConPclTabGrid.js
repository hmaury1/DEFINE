Ext.define('SmPlus.controller.PCL.ConPclTabGrid', {
    extend: 'Ext.app.Controller',

    init: function () {

        this.control({
            'vispcltabgrid menuitem[action=clickReset]': {
                click:this.reset
            },
            'vispcltabgrid menuitem[action=clickReload]': {
                click: this.Reload
            },
            'vispcltabgrid menuitem[action=ClickGuardarTabs]': {
                click: this.GuardarTabs
            },
            'vispcltabgrid button[action=ClickAgregarTabs]': {
                click: this.CrearTab
            },
            'vispcltabgrid button[action=ClickMoverIzquierda]': {
                click: this.moverIzquierda
            },
            'vispcltabgrid button[action=ClickMoverDerecha]': {
                click: this.moverDerecha
            }
        });

    },

    ConstruirTabs: function (el, tabCls) {
        
        if (!tabCls)  tabCls = 'vispcltabgrid';
        var me = el.down(tabCls + '[name=Pcl-contenido]');
        var ne = el.nemonico;
        var tabNemo = el.nemonico;
        if (el.criterio) {
            tabNemo = el.criterio;
        }
        else {
            if (el.isLink) tabNemo = el.nemonico +"."+  el.PclPadre;
        }
        Ext.Ajax.request({
            url: WorkSpace.Url.Meta_Pcl,
            method: 'POST',
            params: {
                nemonico: ne,
                criterio: tabNemo,
                tipo: 'pcl'
            },
            success: function (response) {

                var resp = Ext.decode(response.responseText);

              
                    el.metaData = resp.metaData;

                    var itemstabs = new Array();

                    var filt = el.filtro;
                    var cant = el.cantidadReg;
                    el.seleccion = 0;

                    if (!el.filtroQbe) el.filtroQbe = '[]';
                    // me.campos = fields;

                    var camposPcl = new Array();

                    for (var i = 0; i < el.metaData.fields.length; i++) {
                        camposPcl.push(el.metaData.fields[i].name);
                    }

                    el.camposPcl = camposPcl;

                    var paginado = true;
                    if (el.opciones.paginado == false) {
                        paginado = false;
                    }
                    var herramientas = true;
                    if (el.opciones.herramientas == false) {
                        herramientas = false;
                    }

                    el.store = stoDatosPcl.newStore(camposPcl, {
                        nemonico: el.nemonico,
                        filtro: el.filtro,
                        filtroInicio: el.filtroInicio,
                        filtroQbe: el.filtroQbe,
                        paginar: paginado,
                        tipo: 'pcl'
                    }, cant);


                    var sto = el.store;
                    el.store = sto;

                    var pa = el;

                    var colums = new Array();
                    WorkSpace['Vistas']['VisPrincipal'].down('statusbar[name=estado]').setStatus({
                        text: WorkSpace.Msg.metadataOk,
                        //iconCls: 'icon-ok',
                        clear: {
                            wait: 8000,
                            anim: true,
                            useDefaults: false
                        }
                    });

                    resp = resp.metaData.tabs;
                    if (el.isZoom) {

                        colums.push({
                            name: 'SM001MKNOTAS',
                            text: '',
                            menuDisabled: true,
                            resizable: false,
                            hideable: false,
                            xtype: "gridcolumn",
                            width: 25,
                            renderer: WorkSpace['TipMarca'],
                            editor : { xtype: 'textfield' }
                        });
                        for (var i = 0; i < el.metaData.fields.length; i++) {
                            colums.push({
                                dataIndex: el.metaData.fields[i].name,
                                flex: 1,
                                text: el.metaData.fields[i].label,
                                xtype: "gridcolumn"/*,
                                renderer: function () {

                                }*/
                            });
                        }
                        for (j = 1; j < colums.length; j++) {

                            var type = '';

                            if (colums[j].zoomRef != '') {
                                type = 'viszoom';
                                colums[j].editor = {
                                    xtype: type, zoomFilter: colums[j].zoomFilter, zoomRef: colums[j].zoomRef, zoomKey: colums[j].zoomKey, nemonico: colums[j].nemonico, validable: true, heredados: colums[j].heredados, inForm: false, editable: true
                                };
                            } else if (colums[j].tipo == 'MEM') {
                                colums[j].editor = {
                                    xtype: 'vissmtext', name: colums[j].name, nemonico: colums[j].nemonico
                               }
                                
                            } else {
                                if (colums[j].tipo == 'date') type = 'datefield';

                                if (colums[j].tipo == 'TEX') type = 'textfield';
                                if (colums[j].tipo == 'NUM' || colums[j].tipo == 'DEC') type = 'numberfield';
                                colums[j].editor = {
                                    xtype: type
                                };

                            }
                        }
                       
                        var basic = Ext.widget('vispclgrid', {
                            store: sto,

                            pcl: el,
                            campos: el.campos,
                            defaults: el.defaults,
                            nemonico: ne,
                            tipo: 'pcl',
                            rowCant: cant,
                            link: el.isLink,
                            tabCr: tabNemo,
                            paginado: paginado,
                            herramientas: herramientas,
                            height: 500,
                            title: 'Basicas',
                            basica: true,
                            // id:me.id+resp[0].tab+idTable,
                            filtro: filt,
                            columnas: colums,
                            cantidad: cant,
                            columns: colums,

                            operaciones: pa.opciones.operacion

                        });
                        me.add(basic);
                        me.setActiveTab(basic);



                    }

                    else {
                        
                        for (i = 0; i < resp.length; i++) {
                            var basica = false;
                            if (i == 0) {
                                basica = true;
                            }
                            colums = new Array();
                            colums.push({
                                name: 'SM001MKNOTAS',
                                text: '',
                                menuDisabled: true,
                                resizable: false,
                                draggable: false,
                                hideable: false,
                                xtype: "gridcolumn",
                                width: 25,
                                renderer: WorkSpace['TipMarca'],
                                editor: { xtype: 'textfield' }
                            });
                            for (var j = 0; j < resp[i].campos.length; j++) {
                                colums.push(resp[i].campos[j]);
                            }
                            for (j = 1; j < colums.length; j++) {
                                colums[j].renderer = function (value, metaData, record, row, col, store, gridView) {
                                    var pcl = gridView.up('vispcl');
                                    var SMEvent = {}
                                    if (pcl.metaData.eventosPcl.columnRender) {

                                        SMEvent = {
                                            Global: pcl.metaData.Global,
                                            value: value,
                                            metaData: metaData,
                                            record: record,
                                            row: row,
                                            col: col,
                                            store: store,
                                            gridView: gridView,
                                            colum: colums[j],
                                            pcl: pcl
                                        };

                                        try {
                                            pcl.metaData.eventosPcl.columnRender();
                                        } catch (e) {
                                            console.log('SMError: 112 error en la ejecucion del evento columnRender' + e.message);
                                            SMEvent.value = value;
                                        }



                                        return SMEvent.value;
                                    }
                                    return value;
                                }
                                var type = '';

                                if (colums[j].zoomRef != '') {
                                    type = 'viszoom';
                                    colums[j].editor = {
                                        xtype: type, zoomFilter: colums[j].zoomFilter, zoomRef: colums[j].zoomRef, zoomKey: colums[j].zoomKey, nemonico: colums[j].nemonico, validable: true, heredados: colums[j].heredados, inForm: false, editable: true
                                    };
                                } else if (colums[j].tipo == 'MEM') {
                                    colums[j].editor = {
                                        xtype: 'vissmtext', name: colums[j].name, nemonico: colums[j].nemonico
                                    };
                                } else {
                                    if (colums[j].tipo == 'date') type = 'datefield';

                                    if (colums[j].tipo == 'TEX') type = 'textfield';
                                    if (colums[j].tipo == 'NUM' || colums[j].tipo == 'DEC') type = 'numberfield';
                                    colums[j].editor = {
                                        xtype: type
                                    };

                                }
                            }

                           
                            var tabb = Ext.widget('vispclgrid', {
                                store: sto,

                                closable: !basica,
                                pcl: el,
                                campos: el.campos,
                                defaults: el.defaults,
                                nemonico: ne,
                                rowCant: cant,
                                tipo: 'pcl',
                                paginado: paginado,
                                herramientas: herramientas,
                                link: el.isLink,
                                tabCr: tabNemo,
                                height: 500,
                                title: resp[i].tab,
                                columnas: colums,
                                filtro: filt,
                                cantidad: cant,
                                basica: basica,
                                columns: colums,

                                operaciones: el.opciones.operacion

                            });
                            me.add(tabb);
                            if (i == 0) {
                                me.setActiveTab(tabb);
                            }
                        }
                    }
                    
                    
                    
                    var Eventos = {};
                    var Global = {};
                    if (!SM.Debug) {
                        try {
                            eval(el.metaData.eventosPcl);
                        } catch (e) {
                            console.log('SMError - Carga de eventos: ' + e.message);
                        }
                    } else {
                        eval(el.metaData.eventosPcl);
                    }
                    el.metaData.eventosPcl = Eventos;
                    el.metaData.Global = window['' + el.nemonico.toUpperCase()];
                    window['' + el.nemonico.toUpperCase()] = null;
                    Eventos = null;                    
                    if (el.metaData.eventosPcl.pclLoad) {
                        var SMEvent_pclLoad = {
                            Global: el.metaData.Global,
                            pcl: el
                        };
                        try {
                            el.metaData.eventosPcl.pclLoad(SMEvent_pclLoad);
                            
                        } catch (e) {
                            console.log('SMError 113 error en la ejecucion del evento pclLoad: ' + e.message);
                        }
                       
                    }
                    sto.on("load", function (element, records, successful, eOpts) {
                        if (successful) {
                            if (el.metaData.eventosPcl.rowLoad) {
                                Ext.Array.each(records, function (item) {
                                    var SMEvent_rowLoad = {
                                        Global: el.metaData.Global,
                                        pcl: el,
                                        record: item
                                    };
                                    try {
                                        el.metaData.eventosPcl.rowLoad(SMEvent_rowLoad);
                                        sto.commitChanges();
                                    } catch (e) {
                                        console.log('SMError 120 error en la ejecucion del evento rowLoad: ' + e.message);
                                    }
                                });
                            }
                        }
                    });
               
                    sto.load();
                    sto.proxy.extraParams.filtroInicio = '';
                    WorkSpace.OcultarMascara();

                
            },
            failure: function () {
                WorkSpace.OcultarMascara();
                WorkSpace.alert(WorkSpace.Label.Informacion, WorkSpace.Msg.TabSFallo);
            }

           


        });

     
       
    },

    Reload:  function(el){
        
        var pcl = el.up('vispcl');
        var tabs = pcl.down(tabCls + '[name=Pcl-contenido]');

        tabs.removeAll();
        this.ConstruirTabs(pcl,'vispcltabgrid');
    },

    reset: function (el) {

       

        var pcl = el.up('vispcl');
        var nemonico = pcl.nemonico;
        if (pcl.isLink) nemonico = pcl.PclPadre + "." + pcl.nemonico;

        var me = this;
        Ext.Ajax.request({
            url: WorkSpace.Url.ResetTabs,
            method: 'POST',
            params: {
                nemonico: nemonico
               
            },
            success: function (response) {
                var resp = Ext.decode(response.responseText);
                if (!resp.success) {
                    WorkSpace.alert(WorkSpace.Label.Informacion, WorkSpace.Msg.NoConexion);
                } else {
                    me.Reload(el);
                }

            },
            failure: function (form, action) {
                WorkSpace.alert(WorkSpace.Label.Informacion, WorkSpace.Msg.NoConexion);
            }
        });
    },

    CrearTab: function (el) {
        var pcl = el.up('vispcl');
        var tabs = pcl.down(tabCls + '[name=Pcl-contenido]');
        Ext.MessageBox.prompt(WorkSpace.Label.Informacion,WorkSpace.Msg.NuevaPestaña ,
                   function (btn, title) {
                       if (btn == 'ok') {
                         
                           var swTitulo = false;
                           for (var i = 0; i < tabs.items.items.length; i++) {
                               
                               if (tabs.items.items[i].title.toLowerCase() == title.toLowerCase()) {
                                   swTitulo = true;
                               }
                           }
                           
                           if (swTitulo) {
                               Ext.Msg.alert(WorkSpace.Label.Informacion, WorkSpace.Msg.Ya_Existe_Pestaña + title);
                           } else
                           {
                               var tab = tabs.getActiveTab();
                               Main.getController('PCL.ConPclTabGrid').NuevoTab(pcl, title, tab);
                           }
                       }
                   }, this, false, "");



    },

    NuevoTab: function (pcl,title,tab,index) {
       
        var tabs = pcl.down(tabCls + '[name=Pcl-contenido]');

       // var tab = tabs.getActiveTab();
        if (!index) index = index = tabs.items.length; 
        var tabNemo = pcl.nemonico;
        if (pcl.criterio) {
            tabNemo = pcl.criterio;
        }
        else {
            if (pcl.isLink) nemonico = pcl.nemonico + "." + pcl.PclPadre;
        }
        var cl = true;
       /* if (tab.basica==true) {
            cl = false; 
        }
        */
        var paginado = true;
        if (pcl.opciones.paginado == false) {
            paginado = false;
        }
        var herramientas = true;
        if (pcl.opciones.herramientas == false) {
            herramientas = false;
        }

        var n = Ext.widget('vispclgrid', {
            store: tab.store,
            
            pcl: pcl,
            campos: pcl.campos,
            defaults: pcl.defaults,
            nemo: pcl.nemonico,
            tipo: 'pcl',
            rowCant: tabs.cantidadReg,
            link: pcl.isLink,
            tabCr: tabNemo,
            paginado: paginado,
            herramientas: herramientas,
            height: 500,
            basica:!cl,
            title: title,
            closable: cl,
            filtro: pcl.filtro,
            cantidad: tab.cantidad,
            columns: tab.columnas,
            columnas: tab.columnas,
            operaciones: pcl.opciones.operacion

        });

        tabs.insert(index,n);

        tabs.setActiveTab(n);

    },

    
    moverDerecha: function (el) {

        var pcl = el.up('vispcl');
        var tabs = pcl.down(tabCls + '[name=Pcl-contenido]');
        var total = tabs.items.length;
        var tab = tabs.getActiveTab();

        if (!tab.basica) {
            var index = tabs.items.indexOf(tab);

            if (index < (total - 1)) {

                this.NuevoTab(pcl, tab.title, tab, index + 2);
                tabs.remove(tab);
            }
        }
        


    },

    moverIzquierda: function (el) {

        var pcl = el.up('vispcl');
        var tabs = pcl.down(tabCls + '[name=Pcl-contenido]');
        var total = tabs.items.length;
        var tab = tabs.getActiveTab();

        if (!tab.basica) {
            var index = tabs.items.indexOf(tab);

            if (index > 1) {

                this.NuevoTab(pcl, tab.title, tab, index - 1);
                tabs.remove(tab);
            }
        }

    },

    GuardarTabs: function (el) {
        var pcl = el.up('vispcl');
        var tabs = pcl.down(tabCls + '[name=Pcl-contenido]').items.items;

        var tabsItems = new Array();

        for (var i = 0; i < tabs.length; i++) {

            var campos = new Array();

            var columns = tabs[i].getView().getHeaderCt().getVisibleGridColumns();
            for (var k = 0; k < columns.length; k++) {

                if (columns[k].name != 'SM001MKNOTAS') {//para no mandar la columna de notas
                    var width = columns[k].width;
                    if (!width) {
                        width = 70;
                    }
                    if(columns[k].hidden!=true){
                        campos.push({
                            field: columns[k].COLNUMBER,
                            dataIndex: columns[k].dataIndex,
                            flex: width,
                            hidden: columns[k].hidden,
                            text: columns[k].text
                        });
                    }
                    
                }
                
            }
            tabsItems.push({
                tab: tabs[i].title,
                index: i,
                campos: campos
            });
            
        }
        var nemonico = pcl.nemonico;
        if (pcl.isLink) nemonico = pcl.nemonico + "." + pcl.PclPadre;
        Ext.Ajax.request({
            url: WorkSpace.Url.SaveTabs,
            method: 'POST',
            params: {
                nemonico: nemonico,
                data: Ext.encode(tabsItems)
            },
            success: function (response) {
                var resp = Ext.decode(response.responseText);
                if (!resp.success) {
                    WorkSpace.alert(WorkSpace.Label.Informacion, WorkSpace.Msg.NoConexion);
                }

            },
            failure: function (form, action) {
                WorkSpace.alert(WorkSpace.Label.Informacion, WorkSpace.Msg.NoConexion);
            }
        });


    }

   

});
