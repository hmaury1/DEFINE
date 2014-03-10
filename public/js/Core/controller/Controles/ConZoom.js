Ext.define('SmPlus.controller.Controles.ConZoom', {
    extend: 'Ext.app.Controller',
    field: {},
    init: function () {

        this.control({
            'vispclgrid': {
                itemdblclick: this.asignarValor
            },
            'vispclgrid button[action=clickAceptarZoom]': {
                click: this.asignarValorClick
            },
            'vispclgrid button[action=clickCancelarZoom]': {
                click: this.Cerrar
            }
            
        });

    },

    complete: function (field, value, oldValue, eOpts, validate) {
        var recordEditor = field.RecordData;
        var respuesta = [];
        if (field.inForm) {
            respuesta = true;
        } else {
            respuesta = [value, recordEditor, true];
        }
        if (value != '') {
            
            
            var recordFilter = {};
            if (field.inForm) {
                recordFilter = field.up('form').getRecord();
                var form = field.up('vispclform');
                var grilla = form.grid;
                var pcl = grilla.pcl;
            } else {
                recordFilter = recordEditor;
                grilla = field.up('vispclgrid');
                pcl = grilla.pcl;
            }
            var filtro = field.zoomFilter;
            var filtFail = false;
            filtro = filtro.replace(/\{(\S+)\}/g,
                function (value) {
                    var campo = value.substring(1, value.length - 1);
                    var valor = recordFilter.data[campo];
                    if (valor == '') filtFail = true;
                    return "'" + valor + "'";
                }
                );
            filtro = filtro.replace(/''/gi, "'");

            if (filtFail) {
                return WorkSpace.Msg.No_Zoom;
            }
           
               
            if (filtro != "") {
                filtro = " and " + filtro + " and " + field.zoomKey + "='" + value + "'";
            } else {
                filtro = " and " + field.zoomKey + "='" + value + "'";
            }
            var SMEvent_zoomConfigure = {
                pcl: pcl,
                field: field,
                Global: pcl.metaData.Global,
                record: recordFilter,
                zoomFilter: filtro,
                zoomKey: field.zoomKey
            };
            if (pcl.metaData.eventosPcl.zoomConfigure) {
                try {
                    pcl.metaData.eventosPcl.zoomConfigure(SMEvent_zoomConfigure);
                    filtro = SMEvent_zoomConfigure.zoomFilter;
                } catch (e) {
                    console.log('SMError 101 error en la ejecucion del evento zoomConfigure en el formulario: ' + e.message);
                    
                }

            }
            Ext.Ajax.async = false;
            Ext.Ajax.request({
                url: WorkSpace.Url.validar_Zoom,
                method: 'POST',
                params: {
                    nemonico: field.zoomRef,
                    filtro: filtro
                },

            /*$.ajax({
                url: WorkSpace.Url.validar_Zoom,
                type: 'POST',
                async: false,
                data: {
                    nemonico: field.zoomRef,
                    filtro: filtro
                },*/
                success: function (response) {
                    Ext.Ajax.async = true;
                    var resp = Ext.decode(response.responseText);

                    if (resp.session) {
                        var form = field.form;
                        var cf = form;
                        if (resp.total > 0) {
                            var registro = resp.rows[0];
                            if (field.inForm) {
                                var record = field.up('form').getRecord();
                                record.data[field.name] = value;
                                if (field.heredados) {
                                    var heredados = field.heredados;
                                    for (var k = 0; k < heredados.length; k++) {
                                        record.data[heredados[k].campoHeredado] = registro[heredados[k].campoZoom];
                                    }
                                }
                                
                                respuesta = Main.getController("PCL.ConCrud").validateField(field, value);
                            } else {
                                //recordEditor.set(field.name, value);                                
                                if (field.heredados) {
                                    var heredados = field.heredados;
                                    for (var k = 0; k < heredados.length; k++) {
                                        recordEditor.set(heredados[k].campoHeredado, registro[heredados[k].campoZoom]);
                                    }
                                }
                                respuesta = Main.getController("PCL.ConCrud").validateFieldGrid(field, value, recordEditor);
                                console.log(respuesta);
                            }
                        } else {
                            if (field.inForm) {
                                respuesta = WorkSpace.Msg.ZoomNoLista;
                            } else {
                                respuesta = [value, recordEditor, WorkSpace.Msg.ZoomNoLista];
                            }
                        }
                    }

                },
                failure: function () {
                    Ext.Ajax.async = true;
                    if (field.inForm) {
                        respuesta = WorkSpace.Msg.NoConexion;
                    } else {
                        respuesta = [value, recordEditor, WorkSpace.Msg.NoConexion];
                    }
                }

            });



        } else {
            if (field.inForm) {
                var form = field.form;
                var record = field.up('form').getRecord();
                if (field.heredados) {
                    var heredados = field.heredados;
                    for (var k = 0; k < heredados.length; k++) {
                        record.data[heredados[k].campoHeredado] = '';
                    }
                }
                //Main.getController('PCL.ConCrud').LoadRecordForm(form, record);
            } else {

                //field.RecordData.set(field.name, value);
                if (field.heredados) {
                    var heredados = field.heredados;

                    for (var k = 0; k < heredados.length; k++) {
                        field.RecordData.set(heredados[k].campoHeredado, '');

                    }

                }
            }
        }
        return respuesta;
    },

    

    validarZoom: function (el, value, oldValue, record) {
        if (value != '') {
            var field = el;



            var field = el;
            if (field.inForm) {
                var form = field.form;
                var dataR = field.up('form').getRecord();
                if (field.heredados) {
                    var heredados = field.heredados;
                    for (var k = 0; k < heredados.length; k++) {
                        dataR.data[heredados[k].campoHeredado] = record.get(heredados[k].campoZoom);
                    }
                }
               // Main.getController('PCL.ConCrud').LoadRecordForm(form, dataR);
            } else {
                field.up('vispclgrid').getSelectionModel().getSelection()[0].set(field.name, value);
                if (field.heredados) {
                    
                    var heredados = field.heredados;

                    for (var k = 0; k < heredados.length; k++) {
                        field.up('vispclgrid').getSelectionModel().getSelection()[0].set(heredados[k].campoHeredado, record.get(heredados[k].campoZoom));

                    }

                }
            }
        }
       
    },

    asignarValor: function (grilla, record, item, index, e, eOpts) {
        if (grilla.up('vispcl').isZoom) {
            
            if (this.field.inForm == true) {
                this.field.setValue(record.get(this.field.zoomKey));
                this.complete(this.field, record.get(this.field.zoomKey), this.field.originalValue, null, false);
            } else {
                if (typeof this.field.nemonico != 'undefined') {
                   var recordPadre = this.field.up('vispclgrid').getSelectionModel().getSelection()[0];
                   var valorz = record.get(this.field.zoomKey);
                   var crud = Main.getController("PCL.ConCrud")
                   var vec = crud.validateFieldGrid(this.field, valorz, recordPadre, true);

                   if (vec[2] != true) {
                       Ext.Msg.alert(WorkSpace.Label.Informacion, vec[2]);
                       if (!recordPadre.isEqual(valorz, vec[0])) {
                           recordPadre.set(this.field.name, vec[0]);
                       }
                   } else {
                       if (!recordPadre.isEqual(valorz, vec[0])) {
                           recordPadre.set(this.field.name, vec[0]);
                       } else {
                           recordPadre.set(this.field.name, valorz);
                       }
                   }

                }
            }
            
            grilla.up('window[name=winZoom]').close();
        }
    },

    asignarValorClick: function (el, record, item, index, e, eOpts) {

        if (el.up('vispcl').isZoom) {
            var grid = el.up('vispclgrid');
            var records = grid.getSelectionModel().getSelection();

            if (records.length > 0) {
                
                if (this.field.inForm == true) {
                    this.field.setValue(records[0].get(this.field.zoomKey));
                    this.complete(this.field, records[0].get(this.field.zoomKey), this.field.originalValue, null, false);
                } else {
                    if (typeof this.field.nemonico != 'undefined') {
                        var recordPadre = this.field.up('vispclgrid').getSelectionModel().getSelection()[0];
                        var valorz = records[0].get(this.field.zoomKey);                        
                        var crud = Main.getController("PCL.ConCrud")
                        var vec = crud.validateFieldGrid(this.field, valorz, recordPadre, true); 
                        
                        if (vec[2] != true) {
                            Ext.Msg.alert(WorkSpace.Label.Informacion, vec[2]);
                            if (!recordPadre.isEqual(valorz, vec[0])) {
                                recordPadre.set(this.field.name, vec[0]);
                            }
                        } else {
                            if (!recordPadre.isEqual(valorz, vec[0])) {
                                recordPadre.set(this.field.name, vec[0]);
                            } else {
                                recordPadre.set(this.field.name, valorz);
                            }
                        }
                    }
                }
                
                
                el.up('window[name=winZoom]').close();
            }

        }
    },

    Cerrar: function (el) {
        if (el.up('vispcl').isZoom) {
            el.up('window[name=winZoom]').close();

        }
    },

    click: function (field) {
        this.field = field;
        
        var filtro = field.zoomFilter;
        var form = field.form;
        var grilla, pcl, form;
        if (field.inForm === true) {
            record = field.form.record;
            form = field.up('vispclform');
            grilla = form.grid;
            pcl = grilla.pcl;
        } else {
            grilla = this.field.up('vispclgrid');
            pcl = grilla.pcl;
            records = grilla.getSelectionModel().getSelection();
            record = records[0];
        }
       
        var filtFail = false;
        filtro = filtro.replace(/\{(\S+)\}/g,
            function (value) {
                var campo = value.substring(1, value.length - 1);
                var valor = record.data[campo];
                if (valor == '') filtFail = true;
                return "'" + valor + "'";
            }
            );
        filtro = filtro.replace(/''/gi, "'");

        if (!filtFail) {
            if (filtro != "") {
                filtro = " and " + filtro;
            };

            var SMEvent_zoomConfigure = {
                pcl: pcl,
                Global: pcl.metaData.Global,
                record: record,
                field:field,
                zoomFilter: filtro,
                zoomKey: field.zoomKey
            };
            if (pcl.metaData.eventosPcl.zoomConfigure) {
                try {
                    pcl.metaData.eventosPcl.zoomConfigure(SMEvent_zoomConfigure);
                    filtro = SMEvent_zoomConfigure.zoomFilter;
                } catch (e) {
                    console.log('SMError 101 error en la ejecucion del evento zoomConfigure en el formulario: ' + e.message);

                }

            }

            Main.getController('Core.ConOpcion').opcion(2, field.zoomRef.toUpperCase(), filtro);
        }
        else {

            WorkSpace.alert(WorkSpace.Label.Informacion, WorkSpace.Msg.No_Zoom);


        }
    }

});