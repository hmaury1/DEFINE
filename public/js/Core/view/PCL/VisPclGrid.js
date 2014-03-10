Ext.define("SmPlus.view.PCL.VisPclGrid", {
    extend: 'Ext.grid.Panel',
    alias: 'widget.vispclgrid',
    //closable: true,
    layout: { type: 'border' },
    flex: 1,
    //iconCls: 'icon-pcl',
    gRow: -1,
    gCell: -1,
    seleccionadoId:'',
    getCsvDataFromRecs: function (records, countryStore) {
        var clipText = '';
        var currRow = countryStore.find('id',records[0].data.id);
        for (var i=0; i<records.length; i++) {

            var index = countryStore.find('id',records[i].data.id);

            var r = index;

            var rec = records[i];
            var cv = this.columns;

            for(var j=0; j < cv.length;j++) {

                var val = rec.data[cv[j].dataIndex];

                if (r === currRow) {

                    clipText = clipText.concat(val,"\t");

                } else {

                    currRow = r;

                    clipText = clipText.concat("\n", val, "\t");

                }
            }

        }

        return clipText;
    },

    getRecsFromCsv: function (grid, ta) {
            var countryStore = grid.store;
            document.body.removeChild(ta);

            var del = '';

            if (ta.value.indexOf("\r\n")) {

                del = "\r\n";

            } else if (ta.value.indexOf("\n")) {

                del = "\n"

            }

            var rows = ta.value.split("\n");
            for (var i=0; i<rows.length; i++) {

                var cols = rows[i].split("\t");
        
                var columns = grid.columns;
                var clearColumns = [];
                Ext.each(columns, function (column) {
                    if ((column) && (!column.hidden)) {
                        clearColumns.push(column);
                    }
                });
                columns = clearColumns;
        
                if (cols.length > columns.length)
        
                    cols = cols.slice(0, columns.length-1)
        
                if (grid.gRow === -1 ) {
        
                    Ext.Msg.alert('Seleccione una celda e intente de nuevo!');
        
                    return;
        
                }
        
                var cfg = {};
        
                var tmpRec = countryStore.getAt(grid.gRow);
        
                var existing = false;
        
                if ( tmpRec ) {
        
                    cfg = tmpRec.data;
                
                    existing = true;
        
                }
        
                var l = cols.length;
                       
                if ( cols.length > columns.length )
        
                    l = columns.length;
        
                for (var j=0; j<l; j++) {
        
                    /*if (cols[j] === "") {
                
                        return;
                
                    }*/
                    if (j >= columns.length) break;
                    cfg[columns[j + grid.gCell].dataIndex] = cols[j];
                }

                me.storeInitialCount++;
                            
                cfg['id'] = me.storeInitialCount;
        
                var tmpRow = grid.gRow;
        
                grid.getSelectionModel().clearSelections(true);
        
                var tmpRec = new grid.store.model(cfg)
        
                if (existing)    
                countryStore.removeAt(tmpRow);        

                countryStore.insert(tmpRow, tmpRec);
        
                grid.gRow = ++tmpRow;
        
            }
        /*
            if (grid.gRow === countryStore.getCount()) {
                console.log("count 2 -> "+countryStore.getCount());
                var RowRec = new grid.store.model({})
        
                grid.store.add(RowRec);

            }
            */
            grid.gRow = 0;
            grid.gCell = 0;

        },
   
    initComponent: function () {
        var me = this;
        me.isADD = false;
        me.isUPD = false;
        me.isDEL = false;
        me.isPRN1 = false;
        me.isQRY = false;
        me.isEXP = false;

       
       
        for (var i = 0; i < me.operaciones.length; i++) {
           
            if (me.operaciones[i] == "ADD") me.isADD = true;
            if (me.operaciones[i] == "MRK") me.isMRK = true;
            if (me.operaciones[i] == "UPD") me.isUPD = true;
            if (me.operaciones[i] == "DEL") me.isDEL = true;
            if (me.operaciones[i] == "PRN1") me.isPRN1 = true;
            if (me.operaciones[i] == "GRAF") me.GRAF = true;
            if (me.operaciones[i] == "QRY") me.isQRY = true;
            if (me.operaciones[i] == "EXP") me.isEXP = true;
        }
       

        Ext.applyIf(me, { 
            
            viewConfig: {
                getRowClass: function (record, index, row, store) {
                    var clase = '';
                    if (record.raw.SM002MKCOLOR != null) {

                        clase = "cls" + record.raw.SM002MKCOLOR;

                        WorkSpace.AddColor("#" + record.raw.SM002MKCOLOR, clase);
                        
                    }
                    sw = false;
                    var SMEvent_rowRender = {
                        grid: me,
                        pcl:me.pcl,
                        record: record,
                        clase: clase
                    };
                    if (me.pcl.metaData.eventosPcl.rowRender) {
                        try {
                            me.pcl.metaData.eventosPcl.rowRender(SMEvent_rowRender);                            
                        } catch (e) {
                            console.log('SMError 114 error en la ejecucion del evento rowRender: ' + e.message);
                            SMEvent_rowRender.clase = clase;
                        }
                       
                    }
                   
                    if (SMEvent_rowRender.clase != '') {
                        return SMEvent_rowRender.clase;
                    }
                   
                    
                },
                enableTextSelection:true
            },
            plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1,
                validateEdit: function (value, startValue) {
                    var me = this,
                    context = me.context;
                    //context.record.set(context.field, value);
                    context.value = value;
                    context["startValue"] = startValue;
                    var sw = (me.fireEvent('validateedit', me, context) !== false && !context.cancel);
                    var vec = [sw, context.value];
                    if (!context.record.isEqual(value, context.value)) {
                        context.record.set(context.field, context.value);
                    }                   
                    return vec;
                },
                onEditComplete: function (ed, value, startValue) {
                    var me = this,
                        grid = me.grid,
                        activeColumn = me.getActiveColumn(),
                        sm = grid.getSelectionModel(),
                        record;

                    if (activeColumn) {
                        record = me.context.record;

                        me.setActiveEditor(null);
                        me.setActiveColumn(null);
                        me.setActiveRecord(null);
                        var reps = me.validateEdit(value, startValue);
                        if (!reps[0]) {
                            return;
                        }
                        value = reps[1];
                        // Only update the record if the new value is different than the
                        // startValue. When the view refreshes its el will gain focus
                        console.log(value, startValue);
                        if (!record.isEqual(value, startValue)) {
                            record.set(activeColumn.dataIndex, value);
                        }

                        // Restore focus back to the view's element.
                        if (sm.setCurrentPosition) {
                            sm.setCurrentPosition(sm.getCurrentPosition());
                        }
                        grid.getView().getEl(activeColumn).focus();

                        me.context.value = value;
                        me.fireEvent('edit', me, me.context);
                    }
                }
            })],
            camposCargados: true,
            tbar: {
                xtype: 'toolbar',
                hidden: !me.herramientas,
            //height:28,
            items: [
                    {
                        xtype: 'toolbar',
                        hidden: true,
                        name: 'tbmodoedicion',
                        items: [
                            {
                                xtype: 'button',
                                iconCls: 'icon-Guardar',
                                //text: WorkSpace.Label.Boton_Add,
                                //hidden: !me.isADD,
                                action: 'clickGuardar',
                                tooltip: WorkSpace.Msg.Tooltip_Boton_Guardar_Cambios
                            }, {
                                xtype: 'button',
                                iconCls: 'icon-disk',
                                //text: WorkSpace.Label.Boton_Add,
                                //hidden: !me.isADD,
                                action: 'clickGuardarContinuar',
                                tooltip: WorkSpace.Msg.Tooltip_Boton_Guardar_Continuar
                            }, {
                                xtype: 'button',
                                iconCls: 'icon-cancelar',
                                //text: WorkSpace.Label.Boton_Add,
                                //hidden: !me.isADD,
                                action: 'clickModEdicion',
                                tooltip: WorkSpace.Msg.Tooltip_Boton_Cancelar_Edicion
                            },

                            '-',
                           
                            {
                                xtype: 'button',
                                iconCls: 'icon-add',
                                //text: WorkSpace.Label.Boton_Add,
                                hidden: !me.isADD,
                                action: 'clickAdd',
                                tooltip: WorkSpace.Msg.Tooltip_Add_Pcl
                            },
                            {
                                xtype: 'button',
                                iconCls: 'icon-edit',
                                //text: WorkSpace.Label.Boton_Edit,
                                hidden: !me.isUPD,
                                action: 'clickEdit',
                                tooltip: WorkSpace.Msg.Tooltip_Edit_Pcl
                            },
                            {
                                xtype: 'button',
                                iconCls: 'icon-delete',
                                //text: WorkSpace.Label.Boton_Remove,
                                hidden: !me.isDEL,
                                action: 'clickRemove',
                                tooltip: WorkSpace.Msg.Tooltip_Remove_Pcl
                            },
                            '-',
                            {
                                xtype: 'button',
                                iconCls: 'icon-up',
                                //text: WorkSpace.Label.Boton_Comando,
                                action: 'clickUp',
                                tooltip: WorkSpace.Msg.Tooltip_Boton_Up
                            }, {
                                xtype: 'button',
                                iconCls: 'icon-down',
                                //text: WorkSpace.Label.Boton_Comando,
                                action: 'clickDown',
                                tooltip: WorkSpace.Msg.Tooltip_Boton_Down
                            }, '-', {
                                xtype: 'label',
                                html:WorkSpace.Label.Modo_Edicion

                            }
                        ]
                    },
                       
                    {
                        xtype: 'toolbar',
                        name: 'tbsololectura',
                        items: [
                            {
                                xtype: 'button',
                                iconCls: 'icon-ModEdit',
                                //text: WorkSpace.Label.Boton_Add,
                                hidden: !me.isADD && !me.isUPD &&  !me.isDEL,
                                action: 'clickModEdicion',
                                tooltip: WorkSpace.Msg.Tooltip_Boton_Modo_Edicion
                            },
                            
                            '-',
                            {
                                xtype: 'button',
                                iconCls: 'icon-pages',
                                hidden: !me.paginado,
                                action: 'clickPaginar',
                                tooltip: WorkSpace.Msg.Paginado
                            },
                            {
                                xtype: 'button',
                                iconCls: 'icon-print',
                                //text: WorkSpace.Label.Boton_Comando,
                                action: 'clickPrint',
                                hidden: !me.isGRAF,
                                tooltip: WorkSpace.Msg.Tooltip_Boton_Imprimir
                            }, {
                                xtype: 'button',
                                //text: WorkSpace.Label.Exp_Excel,
                                iconCls: 'icon-excel',
                                action: 'Click-Export',
                                urlfunc: WorkSpace.Url.Exp_Excel,
                                Exptype: 0,
                                target: '_top'

                            } /*,{
                                xtype: 'button',
                                iconCls: 'icon-export',
                                //text: WorkSpace.Label.Boton_Comando,
                                action: 'clickExportar',
                                hidden: !me.isEXP,
                                tooltip: WorkSpace.Msg.Tooltip_Boton_Export,
                                menu: [
                                    {
                                        text: WorkSpace.Label.Exp_Excel,
                                        iconCls: 'icon-excel',
                                        action: 'Click-Export',
                                        urlfunc: WorkSpace.Url.Exp_Excel,
                                        Exptype: 0,
                                        target: '_top'

                                    },
                                    {
                                        text: WorkSpace.Label.Exp_Word,
                                        iconCls: 'icon-word',
                                        action: 'Click-Export',
                                        urlfunc: WorkSpace.Url.Exp_Word,
                                        target: '_top',
                                        Exptype: 1
                                    },
                                    {
                                        text: WorkSpace.Label.Exp_Pdf,
                                        iconCls: 'icon-pdf',
                                        action: 'Click-Export',
                                        urlfunc: WorkSpace.Url.Exp_Pdf,
                                        target: '_blank',
                                        Exptype: 2
                                    }
                                ]
                            }*/
                            , {
                                xtype: 'button',
                                iconCls: 'icon-vbar',
                                //text: WorkSpace.Label.Boton_Comando,
                                action: 'clickPlot',
                                hidden: !me.isPRN1,
                                tooltip: WorkSpace.Msg.Graficar
                            },
                            '-',

                            {
                                xtype: 'button',
                                iconCls: 'icon-filter',
                                //text: WorkSpace.Label.Boton_Comando,
                                action: 'clickqbe',
                                hidden: !me.isQRY,
                                tooltip: WorkSpace.Msg.Tooltip_Filtro_Qbe
                            },
                            {
                                xtype: 'textfield',
                                emptyText: WorkSpace.Label.Boton_Find,
                                hidden: !me.isQRY,
                                value:"",
                                name: 'txtFind'
                            }, {
                                xtype: 'button',
                                iconCls: 'icon-find',
                                //text: WorkSpace.Label.Boton_Edit,
                                action: 'clickFind',
                                hidden: !me.isQRY,
                                tooltip: WorkSpace.Msg.Texto_Boton_Buscar
                            },
                            {
                                xtype: 'button',
                                iconCls: 'icon-Limpiar',
                                //text: WorkSpace.Label.Boton_Remove,
                                action: 'clickLimpiar',
                                hidden: !me.isQRY,
                                tooltip: WorkSpace.Msg.Texto_Boton_Limpiar
                            }, '-',
                             {
                                 xtype: 'button',
                                 iconCls: 'icon-marker',
                                 hidden:!me.isMRK,
                                 tooltip: WorkSpace.Msg.Tooltip_Boton_Marcas,
                                 menu: [
                                     {
                                         text: WorkSpace.Label.Marcar,
                                         iconCls: 'icon-marker',
                                         action: 'Click-Marcar',
                                         color: '00CCFF'
                                     },
                                     {
                                         text: WorkSpace.Label.EliminarMarca,
                                         iconCls: 'icon-delete',
                                         action: 'Click-Desmarcar'

                                     },
                                     {
                                         text: WorkSpace.Label.MarcaAvanzada,
                                         iconCls: 'icon-colormenu',
                                         action: 'ExportExcel',
                                         menu: {
                                             xtype: 'colormenu',
                                             //value: '993300',  // initial selected color
                                             action: 'Click-MarcarColor'
                                         }

                                     },
                                     {
                                         text: WorkSpace.Label.LimpiarMarca,
                                         iconCls: 'icon-Limpiar',
                                         action: 'Click-LimpiarMarcas'

                                     },

                                     {
                                         text: WorkSpace.Label.TodasMarcas,
                                         iconCls: 'icon-taskbar',
                                         action: 'Click-TodasMarcas'

                                     },

                                     {
                                         text: 'Notas',
                                         iconCls: 'icon-stikyNotes',
                                         action: 'Click-Notas'

                                     }
                                 ]
                             }, '-', {
                                    xtype: 'button',
                                    iconCls: 'icon-up',
                                    //text: WorkSpace.Label.Boton_Comando,
                                    action: 'clickUp',
                                    tooltip: WorkSpace.Msg.Tooltip_Boton_Up
                            }, {
                                    xtype: 'button',
                                    iconCls: 'icon-down',
                                    //text: WorkSpace.Label.Boton_Comando,
                                    action: 'clickDown',
                                    tooltip: WorkSpace.Msg.Tooltip_Boton_Down
                            }
                        ]
                    }
                    

            ]
        },
            bbar:{
                xtype: 'pagingtoolbar',
                store: me.store,  
                dock: 'botton',
                displayMsg: '{0} - {1} de {2}',
                emptyMsg: "",
                hidden:!me.paginado,
                displayInfo: true,
                items: [
                        '-', {
                            xtype: 'numberfield',
                            value: me.cantidad,
                            action: 'changePageSize',
                            allowBlank:false,
                            hideTrigger:true,
                            width:30
                        },
                        '-', {
                            xtype: 'button',
                            iconCls: 'icon-ok',
                            text: WorkSpace.Label.Boton_Aceptar,
                            action: 'clickAceptarZoom',
                            hidden: !me.pcl.isZoom
                            //tooltip: WorkSpace.Msg.Texto_Boton_Limpiar
                        }, {
                            xtype: 'button',
                            iconCls: 'icon-cancelar',
                            text: WorkSpace.Label.Boton_Cancelar,
                            action: 'clickCancelarZoom',
                            hidden: !me.pcl.isZoom
                            //tooltip: WorkSpace.Msg.Texto_Boton_Limpiar
                        }
                ]
                
            }
            
               
           
        });

        me.callParent(arguments);
    }
});

