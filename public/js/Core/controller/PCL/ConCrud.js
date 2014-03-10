Ext.define('SmPlus.controller.PCL.ConCrud', {
    extend: 'Ext.app.Controller',
    init: function () {

        this.control({
            'vispclgrid button[action=clickModEdicion]': {
                click: this.ModoEdicion
            },
            'vispclgrid button[action=clickGuardar]': {
                click: this.Guardar
            },
            'vispclgrid button[action=clickGuardarContinuar]': {
                click: this.Guardar
            },
            'vispclgrid button[action=clickAdd]': {
                click:this.Crud
            },

            'vispclgrid button[action=clickEdit]': {
                click: this.Crud
            },

            'vispclgrid button[action=clickRemove]': {
                click: this.eliminarRegistro
            },

            'vispclform button[action=clickPrevious]': {
                click: this.IrARegistroAnterior
            },

            'vispclform button[action=clickNext]': {
                click: this.IrASiguienteRegistro
            },

            'vispclform button[action=clickCancelar]': {
                click: this.Cerrar
            },

            'vispclform button[action=clickAceptar]': {
                click: this.Editar
            }
        });

    },

    validateField: function (el, value) {
            var form = el.up('vispclform');
            var grilla = form.grid;
            var pcl = grilla.pcl;
            var crud = form;
            var record = el.up('form').getRecord();
            if (record === undefined) {
                return true;
            }
            var SMEvent_validateField = {
                pcl: pcl,
                Global: pcl.metaData.Global,
                value: value,
                isValid: true,
                inForm: true,
                field: el,
                record: record
            };
            if (pcl.metaData.eventosPcl.validateField) {
                try {
                    pcl.metaData.eventosPcl.validateField(SMEvent_validateField);
                    SMEvent_validateField.record.set(SMEvent_validateField.field.name, SMEvent_validateField.value);
                    Main.getController('PCL.ConCrud').LoadRecordForm(crud, SMEvent_validateField.record);
                    return SMEvent_validateField.isValid;
                } catch (e) {
                    console.log('SMError 101 error en la ejecucion del evento validateField en el formulario: ' + e.message);
                    return true;
                }

            }
        return true;
    },

    validateFieldGrid: function (el, value, record) {
        //evento de campo, se usa cuando se definen los campos editables en conpcltabgrid
        var pcl = el.up('vispcl');
        var SMEvent_validateField = {
            pcl: pcl,
            Global: pcl.metaData.Global,
            value: value,
            isValid: true,
            inForm: false,
            MsgError:'Dato incorrecto',
            field: el,
            record: record
        };
        if (pcl.metaData.eventosPcl.validateField) {
            try {
                pcl.metaData.eventosPcl.validateField(SMEvent_validateField);
                return [SMEvent_validateField.value, SMEvent_validateField.record, SMEvent_validateField.isValid]
            } catch (e) {
                console.log('102 error en la ejecucion del evento validateField en la grilla: ' + e.message);
                
            }
        }
        return [value, record, true];
    },

    blurGrid: function (el, The, eOpts) {
        var pcl = el.up('vispcl');
        var rec = el.RecordData;
        var SMEvent_blur = {
            pcl: pcl,
            inForm: false,
            Global: pcl.metaData.Global,
            value: el.value,
            valueFocus: el.oldValue,
            record: rec[0],
            field: el,
            The:The,
            eOpts:eOpts
        };
        if (pcl.metaData.eventosPcl.blur) {
            try {
                pcl.metaData.eventosPcl.blur(SMEvent_blur);
            } catch (e) {
                console.log('SMError 103 error en la ejecucion del evento blur en la grilla: ' + e.message);
            }
            

        }
       

    },


    focusGrid: function (el, The, eOpts) {
        var pcl = el.up('vispcl');
        var SMEvent = {
            pcl: pcl,
            Global: pcl.metaData.Global,
            el: el,
            The: The,
            eOpts: eOpts
        };
        if (pcl.metaData.eventosPcl.focus) {
            try {
                pcl.metaData.eventosPcl.focus();
            } catch (e) {
                console.log('SMError 104 error en la ejecucion del evento focus en la grilla. : ' + e.message);
            }
        }


    },

    blur: function (el, The, eOpts,record) {
        var form = el.up('vispclform');
        var grilla = form.grid;
        var pcl = grilla.pcl;
        
        var SMEvent_blur = {
            pcl: pcl,
            inForm: true,
            Global: pcl.metaData.Global,
            value: el.value,
            valueFocus: el.oldValue,
            field: el,
            record:record,
            The: The,
            eOpts: eOpts
        };
        if (pcl.metaData.eventosPcl.blur) {
            try {
                pcl.metaData.eventosPcl.blur(SMEvent_blur);
                
            } catch (e) {
                console.log('SMError 106 error en la ejecucion del evento blur: ' + e.message);
            }
           

        }
        //Main.getController('PCL.ConCrud').LoadRecordForm(form, SMEvent_blur.record);

    },

    focus: function (el, The, eOpts) {
        var form = el.up('vispclform');
        var grilla = form.grid;
        var pcl = grilla.pcl;
        var SMEvent_focus = {
            pcl: pcl,
            Global: pcl.metaData.Global,
            el: el,
            The: The,
            eOpts: eOpts
        };
        if (pcl.metaData.eventosPcl.focus) {
            try {
                pcl.metaData.eventosPcl.focus(SMEvent_focus);
            } catch (e) {
                console.log('SMError 107 error en la ejecucion del evento focus: ' + e.message);
            }
           

        }


    },

    

    CellEditing: function (el, opt) {

        var pcl = el.grid.up('vispcl');

        WorkSpace['Vistas']['VisPrincipal'].down('statusbar[name=estado]').setStatus({
            text: opt.column.help,
            clear: {
                wait: 8000,
                anim: true,
                useDefaults: false
            }
        });


        if (pcl.ModoEdicion != true || opt.column.EDITALLOW == "RO") {

            // if (opt.column.)

            return false;
        } else {
            if (opt.record.phantom) {

            }

        }

    },

    ModoEdicion: function (el) {
        var pcl = el.up('vispcl');
        
        if (pcl.isLink) {
            var master = WorkSpace.Vistas.VisPrincipal.down('tabpanel[name=tpContenido]').getActiveTab();
            var gridMaster = master.down('vispcltabgrid[name=Pcl-contenido]').getActiveTab();
            var recordsM = gridMaster.getSelectionModel().getSelection();

            if (recordsM.length > 0) {


                var tabs = el.up('vispcltabgrid');
                var grids = tabs.items.items;
                if (pcl.ModoEdicion != true) {
                    var tbPersonalizacion = pcl.down('toolbar[name=tbPersonalizacion]');
                    tbPersonalizacion.setVisible(false);
                    for (var i = 0; i < grids.length; i++) {
                        var grid = grids[i];
                        var tbsololectura = grid.down('toolbar[name=tbsololectura]');
                        var tbmodoedicion = grid.down('toolbar[name=tbmodoedicion]');
                        var pagintool = grid.down('pagingtoolbar');
                        pagintool.setVisible(false);
                        tbsololectura.setVisible(false);
                        tbmodoedicion.setVisible(true);
                    }
                    pcl.ModoEdicion = true;
                    WorkSpace.Vistas.VisPrincipal.down('visnavegador').down('panel[name=links]').disable();
                    
                        var padre = pcl.up('vispcl');
                        padre.down('vispcltabgrid').disable();
                        padre.down('tabpanel[name=Pcl-links]').tabBar.disable();
                        padre.ModoEdicion = true;
                        padre.ModoEdicionLink = true;
                    
                } else {

                    var grid = grids[0];
                    var store = grid.store;

                    var news = store.getNewRecords();

                    var upds = store.getUpdatedRecords();

                    var dels = store.getRemovedRecords();

                    if (news.length > 0 || upds.length > 0 || dels.length > 0) {
                        Ext.Msg.confirm(WorkSpace.Label.Informacion, WorkSpace.Msg.Se_perderan_cambios + ':<br> ' + WorkSpace.Msg.Registros_Insertados + ' : ' + news.length + ' <br> ' + WorkSpace.Msg.Registros_Modificados + ' : ' + upds.length + ' <br> ' + WorkSpace.Msg.Registros_Eliminados + ' : ' + dels.length + '<br><br> ' + WorkSpace.Msg.quiere_continuar, function (button) {
                            if (button === 'yes') {
                                var tbPersonalizacion = pcl.down('toolbar[name=tbPersonalizacion]');
                                tbPersonalizacion.setVisible(true);
                                for (var i = 0; i < grids.length; i++) {
                                    var grid = grids[i];
                                    var tbsololectura = grid.down('toolbar[name=tbsololectura]');
                                    var tbmodoedicion = grid.down('toolbar[name=tbmodoedicion]');
                                    var pagintool = grid.down('pagingtoolbar');
                                    pagintool.setVisible(true);
                                    tbsololectura.setVisible(true);
                                    tbmodoedicion.setVisible(false);
                                }
                                store.load();
                                pcl.ModoEdicion = false;
                                WorkSpace.Vistas.VisPrincipal.down('visnavegador').down('panel[name=links]').enable();
                                
                                    var padre = pcl.up('vispcl');
                                    padre.down('vispcltabgrid').enable();
                                    padre.down('tabpanel[name=Pcl-links]').tabBar.enable();

                                    padre.ModoEdicion = false;
                                    padre.ModoEdicionLink = false;
                               

                            } else {
                                return;
                            }
                        });

                    } else {
                        var tbPersonalizacion = pcl.down('toolbar[name=tbPersonalizacion]');
                        tbPersonalizacion.setVisible(true);
                        for (var i = 0; i < grids.length; i++) {
                            var grid = grids[i];
                            var tbsololectura = grid.down('toolbar[name=tbsololectura]');
                            var tbmodoedicion = grid.down('toolbar[name=tbmodoedicion]');
                            var pagintool = grid.down('pagingtoolbar');
                            pagintool.setVisible(true);
                            tbsololectura.setVisible(true);
                            tbmodoedicion.setVisible(false);
                        }
                        store.load();
                        pcl.ModoEdicion = false;
      
                        WorkSpace.Vistas.VisPrincipal.down('visnavegador').down('panel[name=links]').enable();
                        
                            var padre = pcl.up('vispcl');
                            padre.down('vispcltabgrid').enable();
                            padre.down('tabpanel[name=Pcl-links]').tabBar.enable();

                            padre.ModoEdicion = false;
                            padre.ModoEdicionLink = false;
                       
                    }
                }

            }
            else {
                WorkSpace.alert(WorkSpace.Label.Informacion, WorkSpace.Msg.RegistroPadre);
                return;
            }
        } else {

        
            var tabs = el.up('vispcltabgrid');
            var grids = tabs.items.items;
            if (pcl.ModoEdicion != true) {
                var tbPersonalizacion = pcl.down('toolbar[name=tbPersonalizacion]');
                tbPersonalizacion.setVisible(false);
                for (var i = 0; i < grids.length; i++) {
                    var grid = grids[i];
                    var tbsololectura = grid.down('toolbar[name=tbsololectura]');
                    var tbmodoedicion = grid.down('toolbar[name=tbmodoedicion]');
                    var pagintool = grid.down('pagingtoolbar');
                    pagintool.setVisible(false);
                    tbsololectura.setVisible(false);
                    tbmodoedicion.setVisible(true);
                }
                pcl.ModoEdicion = true;
                WorkSpace.Vistas.VisPrincipal.down('visnavegador').down('panel[name=links]').disable();
                
                    if (pcl.isDinamico != true && pcl.isZoom != true) {
                        pcl.down('tabpanel[name=Pcl-links]').disable();
                    }
                
            } else {

                var grid = grids[0];
                var store = grid.store;

                var news = store.getNewRecords();

                var upds = store.getUpdatedRecords();

                var dels = store.getRemovedRecords();

                if (news.length > 0 || upds.length > 0 || dels.length > 0) {
                    Ext.Msg.confirm(WorkSpace.Label.Informacion, WorkSpace.Msg.Se_perderan_cambios + ':<br> ' + WorkSpace.Msg.Registros_Insertados + ' : ' + news.length + ' <br> ' + WorkSpace.Msg.Registros_Modificados + ' : ' + upds.length + ' <br> ' + WorkSpace.Msg.Registros_Eliminados + ' : ' + dels.length + '<br><br> ' + WorkSpace.Msg.quiere_continuar, function (button) {
                        if (button === 'yes') {
                            var tbPersonalizacion = pcl.down('toolbar[name=tbPersonalizacion]');
                            tbPersonalizacion.setVisible(true);
                            for (var i = 0; i < grids.length; i++) {
                                var grid = grids[i];
                                var tbsololectura = grid.down('toolbar[name=tbsololectura]');
                                var tbmodoedicion = grid.down('toolbar[name=tbmodoedicion]');
                                var pagintool = grid.down('pagingtoolbar');
                                pagintool.setVisible(true);
                                tbsololectura.setVisible(true);
                                tbmodoedicion.setVisible(false);
                            }
                            store.load();
                            pcl.ModoEdicion = false;
                            WorkSpace.Vistas.VisPrincipal.down('visnavegador').down('panel[name=links]').enable();
                           
                                if (pcl.isDinamico != true && pcl.isZoom != true) {
                                    pcl.down('tabpanel[name=Pcl-links]').enable();
                                }
                          

                        } else {
                            return;
                        }
                    });

                } else {
                    var tbPersonalizacion = pcl.down('toolbar[name=tbPersonalizacion]');
                    tbPersonalizacion.setVisible(true);
                    for (var i = 0; i < grids.length; i++) {
                        var grid = grids[i];
                        var tbsololectura = grid.down('toolbar[name=tbsololectura]');
                        var tbmodoedicion = grid.down('toolbar[name=tbmodoedicion]');
                        var pagintool = grid.down('pagingtoolbar');
                        pagintool.setVisible(true);
                        tbsololectura.setVisible(true);
                        tbmodoedicion.setVisible(false);
                    }
                    store.load();
                    pcl.ModoEdicion = false;
            
                    WorkSpace.Vistas.VisPrincipal.down('visnavegador').down('panel[name=links]').enable();
                    
                        if (pcl.isDinamico != true && pcl.isZoom != true) {
                            pcl.down('tabpanel[name=Pcl-links]').enable();
                        }
                    
                }
            }

        }



    },

    Guardar: function (el) {

        var accion = el.action;

        

        var pcl = el.up('vispcl');

        var tabs = el.up('vispcltabgrid');
        var grids = tabs.items.items;

        var gridP = grids[0];
        
        var store = gridP.store;

        var news = store.getNewRecords();

        var upds = store.getUpdatedRecords();

        var dels = store.getRemovedRecords();

        
       
       /* if (pcl.DatosInvalidos.length > 0) {

            Ext.Msg.alert(WorkSpace.Label.Informacion, WorkSpace.Msg.ZoomNoListas);
            return;
        }*/
        
        
        if (news.length > 0 || upds.length > 0 || dels.length > 0) {

            

            Ext.Msg.confirm(WorkSpace.Label.Informacion, WorkSpace.Msg.Se_efectuaron_cambios + ' : <br> ' + WorkSpace.Msg.Registros_Insertados + ' : ' + news.length + ' <br> ' + WorkSpace.Msg.Registros_Modificados + ' : ' + upds.length + ' <br> ' + WorkSpace.Msg.Registros_Eliminados + ' : ' + dels.length + '<br><br> ' + WorkSpace.Msg.quiere_continuar, function (button) {
                if (button === 'yes') {

                    var recordsAdd = [];
                    var recordsUpd = [];
                    var recordsDel = [];

                    var mensajes = ""
                    var SMEvent_beforeSave = {
                        pcl: pcl,
                        Global: pcl.metaData.Global,
                        grid: gridP,
                        record: {},
                        type:'',
                        cancel: false,
                        MensajeError: ""
                    };

                    
                    var requeridos = new Array();
                    for (var i = 0; i < pcl.metaData.fields.length; i++) {
                        if (pcl.metaData.fields[i].requerido == -1) {
                            requeridos.push(pcl.metaData.fields[i]);
                        }
                    }

                    for (var i = 0; i < news.length; i++) {
                        
                        for (var q = 0; q < requeridos.length; q++) {
                            if (news[i].get(requeridos[q].name) == "") {
                                mensajes += 'el campo "' + requeridos[q].label + '" es requerido!';
                                Ext.Msg.alert(WorkSpace.Label.Informacion, mensajes);
                                gridP.getSelectionModel().select(news[i]);
                                return;
                            }
                        }
                        if (pcl.metaData.eventosPcl.beforeSave) {
                            SMEvent_beforeSave.record = news[i];
                            SMEvent_beforeSave.type = "insert";
                            SMEvent_beforeSave.MensajeError == "";
                            try {
                                pcl.metaData.eventosPcl.beforeSave(SMEvent_beforeSave);

                            } catch (e) {
                                console.log('SMError 117 error en la ejecucion del evento beforeSave: ' + e.message);
                            }
                            if (SMEvent_beforeSave.MensajeError != "") mensajes += SMEvent_beforeSave.MensajeError+ "<br><hr>";
                        }
                        recordsAdd.push(news[i].data);
                    }

                    var keys = pcl.metaData.keys;
                    for (var i = 0; i < upds.length; i++) {

                        for (var q = 0; q < requeridos.length; q++) {
                            if (upds[i].get(requeridos[q].name) == "") {
                                mensajes += 'el campo "' + requeridos[q].label + '" es requerido!';
                                Ext.Msg.alert(WorkSpace.Label.Informacion, mensajes);
                                gridP.getSelectionModel().select(upds[i]);
                                return;
                            }
                        }
                        if (pcl.metaData.eventosPcl.beforeSave) {
                            SMEvent_beforeSave.record = upds[i];
                            SMEvent_beforeSave.type = "update";
                            SMEvent_beforeSave.MensajeError == "";
                            try {
                                pcl.metaData.eventosPcl.beforeSave(SMEvent_beforeSave);
                            } catch (e) {
                                console.log('SMError 117 error en la ejecucion del evento beforeSave: ' + e.message);
                                //SMEvent.cancel = false;
                            }
                            if (SMEvent_beforeSave.MensajeError != "") mensajes += SMEvent_beforeSave.MensajeError+ "<br><hr>";
                        }
                        var actuales = upds[i].getChanges();
                        for (var j = 0; j < keys.length; j++) {
                            actuales[keys[j]] = upds[i].get(keys[j]);
                        }
                        var ls = pcl.metaData.log;
                        for (var y = 0; y < ls.length; y++) {
                            actuales[ls[y] + "-old"] = upds[i].raw[ls[y]];
                        }
                        recordsUpd.push(actuales);                        
                    }
                   
                    for (var i = 0; i < dels.length; i++) {
                        if (pcl.metaData.eventosPcl.beforeSave) {
                            SMEvent_beforeSave.record = dels[i];
                            SMEvent_beforeSave.type = "delete";
                            SMEvent_beforeSave.MensajeError == "";
                            try {
                                pcl.metaData.eventosPcl.beforeSave(SMEvent_beforeSave);
                            } catch (e) {
                                console.log('SMError 117 error en la ejecucion del evento beforeSave: ' + e.message);
                                //SMEvent.cancel = false;
                            }
                            if (SMEvent_beforeSave.MensajeError != "") mensajes +=SMEvent_beforeSave.MensajeError+ "<br><hr>";
                        }
                        recordsDel.push(dels[i].data);
                    }
                   /* var SMEvent_beforeSave = {
                        pcl: pcl,
                        Global: pcl.metaData.Global,
                        grid: gridP,
                        arrayNews: news,
                        arrayUpds: upds,
                        arrayDels: dels,
                        cancel: false
                    };
                    if (pcl.metaData.eventosPcl.beforeSave) {
                        try {
                            pcl.metaData.eventosPcl.beforeSave(SMEvent_beforeSave);
                        } catch (e) {
                            console.log('SMError 117 error en la ejecucion del evento beforeSave: ' + e.message);
                            SMEvent.cancel = false;
                        }
                        
                    }*/

                    if (mensajes != "") Ext.Msg.alert(WorkSpace.Label.Informacion, mensajes);

                    if (SMEvent_beforeSave.cancel == false) {
                        Ext.Ajax.request({
                            method: 'POST',
                            waitMsg: WorkSpace.Label.Enviando,
                            url: WorkSpace.Url.Crud,
                            params: {
                                nemonico: pcl.nemonico,
                                tabla: pcl.metaData.tabla,
                                adds: Ext.encode(recordsAdd),
                                upds: Ext.encode(recordsUpd),
                                dels: Ext.encode(recordsDel),
                                logs: Ext.encode(pcl.metaData.log)

                            },
                            success: function (response) {
                                try {

                                    var resp = Ext.decode(response.responseText);


                                    if (resp.success) {

                                        var SMEvent_afterSave = {
                                            pcl: pcl,
                                            Global: pcl.metaData.Global,
                                            grid: gridP,
                                            responseObject: resp,
                                            type: '',
                                            record: {}
                                        };

                                        for (var i = 0; i < news.length; i++) {
                                            if (pcl.metaData.eventosPcl.afterSave) {
                                                SMEvent_afterSave.record = news[i];
                                                SMEvent_afterSave.type = "insert";
                                                try {
                                                    pcl.metaData.eventosPcl.afterSave(SMEvent_afterSave);
                                                } catch (e) {
                                                    console.log('SMError 118 error en la ejecucion del evento afterSave: ' + e.message);

                                                }
                                            }
                                        }

                                        for (var i = 0; i < upds.length; i++) {
                                            if (pcl.metaData.eventosPcl.afterSave) {
                                                SMEvent_afterSave.record = upds[i];
                                                SMEvent_afterSave.type = "update";
                                                try {
                                                    pcl.metaData.eventosPcl.afterSave(SMEvent_afterSave);
                                                } catch (e) {
                                                    console.log('SMError 118 error en la ejecucion del evento afterSave: ' + e.message);

                                                }
                                            }
                                        }

                                        for (var i = 0; i < dels.length; i++) {
                                            if (pcl.metaData.eventosPcl.afterSave) {
                                                SMEvent_afterSave.record = dels[i];
                                                SMEvent_afterSave.type = "delete";
                                                try {
                                                    pcl.metaData.eventosPcl.afterSave(SMEvent_afterSave);
                                                } catch (e) {
                                                    console.log('SMError 118 error en la ejecucion del evento afterSave: ' + e.message);

                                                }
                                            }
                                        }

                                        resp = SMEvent_afterSave.responseObject;
                                        Ext.widget('vismsgerror', {
                                            msg: "Total Acciones: " + resp.data.total + "<br>Exitos: " + resp.data.exitos + "<br>Errores: " + resp.data.errores.length,
                                            msgError: resp.data.errorTexto
                                        });

                                    } else {
                                        WorkSpace.alert(WorkSpace.Label.Informacion, resp.message);
                                    }




                                } catch (e) {
                                    WorkSpace.alert(WorkSpace.Label.Informacion, WorkSpace.Msg.NoConexion);
                                }

                            },
                            failure: function (form, action) {
                                WorkSpace.alert(WorkSpace.Label.Informacion, WorkSpace.Msg.NoConexion);
                            }
                        }
                    );

                        if (accion != "clickGuardarContinuar") {

                            if (pcl.isLink == true) {
                                var tbPersonalizacion = pcl.down('toolbar[name=tbPersonalizacion]');
                                tbPersonalizacion.setVisible(true);
                                for (var i = 0; i < grids.length; i++) {
                                    var grid = grids[i];
                                    var tbsololectura = grid.down('toolbar[name=tbsololectura]');
                                    var tbmodoedicion = grid.down('toolbar[name=tbmodoedicion]');
                                    var pagintool = grid.down('pagingtoolbar');
                                    pagintool.setVisible(true);
                                    tbsololectura.setVisible(true);
                                    tbmodoedicion.setVisible(false);
                                }
                                store.load();
                                pcl.ModoEdicion = false;

                                WorkSpace.Vistas.VisPrincipal.down('visnavegador').down('panel[name=links]').enable();

                                var padre = pcl.up('vispcl');
                                padre.down('vispcltabgrid').enable();
                                padre.down('tabpanel[name=Pcl-links]').tabBar.enable();

                                padre.ModoEdicion = false;
                                padre.ModoEdicionLink = false;
                            } else {
                                var tbPersonalizacion = pcl.down('toolbar[name=tbPersonalizacion]');
                                tbPersonalizacion.setVisible(true);
                                for (var i = 0; i < grids.length; i++) {
                                    var grid = grids[i];
                                    var tbsololectura = grid.down('toolbar[name=tbsololectura]');
                                    var tbmodoedicion = grid.down('toolbar[name=tbmodoedicion]');
                                    var pagintool = grid.down('pagingtoolbar');
                                    pagintool.setVisible(true);
                                    tbsololectura.setVisible(true);
                                    tbmodoedicion.setVisible(false);
                                }
                                store.load();
                                pcl.ModoEdicion = false;

                                WorkSpace.Vistas.VisPrincipal.down('visnavegador').down('panel[name=links]').enable();

                                if (pcl.isDinamico != true && pcl.isZoom != true) {
                                    pcl.down('tabpanel[name=Pcl-links]').enable();
                                }
                            }

                            var tbPersonalizacion = pcl.down('toolbar[name=tbPersonalizacion]');
                            tbPersonalizacion.setVisible(true);
                            for (var i = 0; i < grids.length; i++) {
                                var grid = grids[i];
                                var tbsololectura = grid.down('toolbar[name=tbsololectura]');
                                var tbmodoedicion = grid.down('toolbar[name=tbmodoedicion]');
                                var pagintool = grid.down('pagingtoolbar');
                                pagintool.setVisible(true);
                                tbsololectura.setVisible(true);
                                tbmodoedicion.setVisible(false);
                            }
                            pcl.ModoEdicion = false;
                        }

                        store.load();
                    } else {
                        return;
                    }
                    
                    
                } else {
                    return;
                }
            });

        } else {
            if (accion != "clickGuardarContinuar") {
                if (pcl.isLink === true) {
                    var tbPersonalizacion = pcl.down('toolbar[name=tbPersonalizacion]');
                    tbPersonalizacion.setVisible(true);
                    for (var i = 0; i < grids.length; i++) {
                        var grid = grids[i];
                        var tbsololectura = grid.down('toolbar[name=tbsololectura]');
                        var tbmodoedicion = grid.down('toolbar[name=tbmodoedicion]');
                        var pagintool = grid.down('pagingtoolbar');
                        pagintool.setVisible(true);
                        tbsololectura.setVisible(true);
                        tbmodoedicion.setVisible(false);
                    }
                    store.load();
                    pcl.ModoEdicion = false;
                   
                    WorkSpace.Vistas.VisPrincipal.down('visnavegador').down('panel[name=links]').enable();

                    var padre = pcl.up('vispcl');
                    padre.down('vispcltabgrid').enable();
                    padre.down('tabpanel[name=Pcl-links]').tabBar.enable();

                    padre.ModoEdicion = false;
                    padre.ModoEdicionLink = false;
                } else {
                    var tbPersonalizacion = pcl.down('toolbar[name=tbPersonalizacion]');
                    tbPersonalizacion.setVisible(true);
                    for (var i = 0; i < grids.length; i++) {
                        var grid = grids[i];
                        var tbsololectura = grid.down('toolbar[name=tbsololectura]');
                        var tbmodoedicion = grid.down('toolbar[name=tbmodoedicion]');
                        var pagintool = grid.down('pagingtoolbar');
                        pagintool.setVisible(true);
                        tbsololectura.setVisible(true);
                        tbmodoedicion.setVisible(false);
                    }
                    store.load();
                    pcl.ModoEdicion = false;
                    
                    WorkSpace.Vistas.VisPrincipal.down('visnavegador').down('panel[name=links]').enable();

                    if (pcl.isDinamico != true && pcl.isZoom != true) {
                        pcl.down('tabpanel[name=Pcl-links]').enable();
                    }
                }
                store.load();
            }

            
        }



    },

    eliminarRegistro: function(el){
        var grid = el.up('vispclgrid');
        var pcl = grid.up('vispcl');
        var records = grid.getSelectionModel().getSelection();
        if (records.length != 0) {
            

            Ext.Msg.confirm(WorkSpace.Label.Informacion, WorkSpace.Msg.Eliminar_registro, function (button) {
                if (button === 'yes') {
                    var SMEvent_beforeDelete = {
                        pcl: pcl,
                        Global: pcl.metaData.Global,
                        grid: grid,
                        record: records[0],
                        cancel: false
                    };
                    if (pcl.metaData.eventosPcl.beforeDelete) {
                        try {
                            pcl.metaData.eventosPcl.beforeDelete(SMEvent_beforeDelete);
                        } catch (e) {
                            console.log('SMError 108 error en la ejecucion del evento beforeDelete: ' + e.message);
                            SMEvent.cancel = false;
                        }
                        
                    }
                    if (SMEvent_beforeDelete.cancel == false) {
                        grid.store.remove(records[0]);
                        WorkSpace['Vistas']['VisPrincipal'].down('statusbar[name=estado]').setStatus({
                            text: WorkSpace.Msg.registroEliminado,
                            //iconCls: 'icon-ok',
                            clear: {
                                wait: 8000,
                                anim: true,
                                useDefaults: false
                            }
                        });

                        var SMEvent_afterDelete = {
                            pcl: pcl,
                            Global: pcl.metaData.Global,
                            grid: grid,
                            record: records[0],
                        };
                        if (pcl.metaData.eventosPcl.afterDelete) {
                            try {
                                pcl.metaData.eventosPcl.afterDelete(SMEvent_afterDelete);
                            } catch (e) {
                                console.log('SMError 115 error en la ejecucion del evento afterDelete: ' + e.message);
                               
                            }

                        }

                    }

                   
                    
                }
            });

        }

    },
    getSelectedRowIndex: function (grid) {

        var r = grid.getSelectionModel().getSelection();
        var s = grid.getStore();
        return s.indexOf(r[0]);

    },
    Cerrar: function (el) {
        var form = el.up('vispclform');
        form.close();
        form = null;
    },

    IrARegistroAnterior: function (el, e, opt) {
        var form = el.up('vispclform');
        var grilla = form.grid;
        
        var storegrilla = grilla.store;
        var rowIndex = this.getSelectedRowIndex(grilla);
        var selrecords = grilla.getSelectionModel().getSelection();
        if (selrecords.length == 1) {
            if (rowIndex != 0) {
                grilla.getSelectionModel().select(rowIndex - 1);
            }
        } else {
            grilla.getSelectionModel().select(storegrilla.getCount() - 1);
        }
        this.moveRecord(form, grilla);
    },

    IrASiguienteRegistro: function (el, e, opt) {
        var form = el.up('vispclform');
        var grilla=form.grid;
        var storegrilla = grilla.store;
        var rowIndex = this.getSelectedRowIndex(grilla);
        var selrecords = grilla.getSelectionModel().getSelection();
        if (selrecords.length > 0) {
            if (rowIndex != storegrilla.getCount() - 1) {
                grilla.getSelectionModel().select(rowIndex + 1);
            }
        } else {
            grilla.getSelectionModel().select(0);
        }
        
        this.moveRecord(form,grilla);
    },

    moveRecord: function (form, grilla) {
       
        form.record = grilla.getSelectionModel().getSelection()[0];
        var record = form.record.copy();

        
        var tabPanel = form.down('form');
        tabPanel.getForm().clearInvalid();
        this.LoadRecordForm(form, record);
    },

    Crud: function (el) {
        if (el.action == "clickAdd") accion = 1;
        if (el.action == "clickEdit") accion = 0;
        var grid = el.up('vispclgrid');
        
        var pcl = el.up('vispcl');
        var url ='';
        var records = grid.getSelectionModel().getSelection();
        var seleccion;
        if (accion == 0) {

           
            
            if (records.length != 0) {
                seleccion =  records[0].copy();
                url = WorkSpace.Url.Update_Record_PCL;

                var SMEvent_beforeEditForm = {
                    Global: pcl.metaData.Global,
                    cancel: false,
                    pcl:pcl,
                    record: seleccion
                };
                if (pcl.metaData.eventosPcl.beforeEditForm) {
                    try {
                        pcl.metaData.eventosPcl.beforeEditForm(SMEvent_beforeEditForm);
                    } catch (e) {
                        console.log('SMError 116 error en la ejecucion del evento beforeEdit en el formulario: ' + e.message);
                        SMEvent_beforeEditForm.cancel = false;
                    }

                }
                if (SMEvent_beforeEditForm.cancel != false) {
                    return;
                }


            } else {
                return
            }
        }
        else {
            url = WorkSpace.Url.Add_Record_PCL;
           
                if (pcl.isLink) {
                    var master = WorkSpace.Vistas.VisPrincipal.down('tabpanel[name=tpContenido]').getActiveTab();
                    var gridMaster = master.down('vispcltabgrid[name=Pcl-contenido]').getActiveTab();
                    var recordsM = gridMaster.getSelectionModel().getSelection();

                    if (recordsM.length > 0) {

                        var PclFields = pcl.campoPcl.split(',');
                        var LnkFields = pcl.campoLnk.split(',');


                        var ds = grid.pcl.metaData.fields;
                        var recd = {};
                        for (var i = 0; i < ds.length; i++) {

                            recd[ds[i].name] = ds[i].vdefault;


                        }
                        for (var i = 0; i < PclFields.length; i++) {
                            if (PclFields[i] != "") {
                                recd[LnkFields[i]] = recordsM[0].get(PclFields[i]);

                            }
                        }

                        seleccion = new grid.store.model(recd);
                        
                    } else {

                        WorkSpace.alert(WorkSpace.Label.Informacion, WorkSpace.Msg.RegistroPadre);
                        return;

                    }
                } else {
                    
                    if (pcl.isDinamico) {

                        var pclDINAMICA = pcl.up('vispcldinamica');

                        var ds = grid.pcl.metaData.fields;
                        var recd = {};
                        for (var i = 0; i < ds.length; i++) {

                            recd[ds[i].name] = ds[i].vdefault;


                        }

                        if (pclDINAMICA.llaves) {
                            var keys = pclDINAMICA.llaves;
                            var visOpcion = pclDINAMICA.view;
                            for (var k = 0; k < keys.length; k++) {
                                    
                                        var padre = visOpcion.down('vispcldinamica[name=' + keys[k].padre + ']');
                                        var gridP = padre.down('vispclgrid');

                                        var recordP = gridP.getSelectionModel().getSelection();
                                        
                                        if (recordP.length > 0) {
                                            recd[keys[k].campoLink] = recordP[0].data[keys[k].campoPadre];
                                            
                                        } 
                          }

                            
                        }
                        seleccion = new grid.store.model(recd);
                    } else {
                        
                        var ds = grid.pcl.metaData.fields;
                        var recd = {};
                        for (var i = 0; i < ds.length; i++) {

                            recd[ds[i].name] = ds[i].vdefault;


                        }

                        seleccion = new grid.store.model(recd);
                    }
                }
               
                var SMEvento_recordInsert = {
                    pcl: pcl,
                    Global: pcl.metaData.Global,
                    grid: grid,
                    record: seleccion,
                    cancel: false
                };
                if (pcl.metaData.eventosPcl.recordInsert) {
                    try {
                        pcl.metaData.eventosPcl.recordInsert(SMEvento_recordInsert);
                    } catch (e) {
                        console.log('SMError 109 error en la ejecucion del evento recordInsert: ' + e.message);
                        SMEvento_recordInsert.cancel = false;
                    }
                   
                }
                if (SMEvento_recordInsert.cancel == false) {
                    grid.store.insert(grid.store.getCount(), SMEvento_recordInsert.record);
                    grid.getSelectionModel().select(seleccion);
                    WorkSpace['Vistas']['VisPrincipal'].down('statusbar[name=estado]').setStatus({
                        text: WorkSpace.Msg.registroInsertado,
                        //iconCls: 'icon-ok',
                        clear: {
                            wait: 8000,
                            anim: true,
                            useDefaults: false
                        }
                    });
                }
                return;
           
        }
        ignoreCancel = false;
      
        var fields = pcl.metaData.fields;
        var tabla = pcl.metaData.tabla;
        var campos = new Ext.util.MixedCollection();
        var eventos = pcl.metaData.eventos;
        
        var countV = 0;
        
        var fm;
        var Crud;
        for (i = 0; i < fields.length; i++) {
            field = fields[i];
           
            var camp;
            var type = 'textfield';
            var per = true;
            var cls = '';
            var requerido = false;
            var vDef = field.vdefault;
            var allowDec = true;
            var Width = 370;
            var WidthLabel = 150;
            var editable = true;
            var tpl = '';
            
            if (field.zoomRef != '') {
                type = 'viszoom';
                //Width = 370;
                //WidthLabel = 150;
                //editable = false;
            } else {
                if (field.type == 'date') type = 'datefield';
                if (field.type == 'DAT') type = 'datefield';
                if (field.gtype == 'MEM') type = 'vissmtext';
                if (field.gtype == 'TEX') type = 'textfield';
                if (field.gtype == 'NUM') type = 'numberfield';
                if (field.gtype == 'PCT') type = 'textarea';
                if (field.gtype == 'DEC') {
                    type = 'numberfield';
                    allowDec = false;
                }
            }
            
            if (field.requerido == -1) {
                requerido = true;
                field.label = '<b>' + field.label + '</b>';
                tpl = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
            }

            if (field.EDITALLOW == 'RO') {
                per = false;
                cls = 'x-item-disabled';
            } else {
                
                if (records[0].phantom) {
                    if (field.EDITALLOW == 'UO') {
                       
                        per = false;
                        cls = 'x-item-disabled';
                    }
                } else {
                    if (field.EDITALLOW == 'IO') {
                       
                        per = false;
                        cls = 'x-item-disabled';
                    }
                }
            }
            if (!per) type = 'textfield';
            

            camp = {
                inForm: true,
                dValue: vDef,
                validCount: countV,
                //allowDecimals: !allowDec,
                decimalPrecision: field.decimalprecision,
                zoomKey: field.zoomKey,
                eventos: field.eventos,
                zoomFilter: field.zoomFilter,
                zoomRef: field.zoomRef,
                editable:editable,
                heredados: field.heredados,
                xtype: type,
                validable:false,
                labelWidth: WidthLabel,
                width: Width,
                fieldLabel: field.label,
                afterLabelTextTpl: tpl,
                name: field.name,
                validar:0,
                validateOnChange: false,
                validateOnBlur: false,
                EsValido: true,
                editorValue: '',
                validator: function (value) {
                    if (this.xtype === 'viszoom') {                                
                        var R = Main.getController("Controles.ConZoom").complete(this, this.value, this.originalValue, null,true);
                        el.validable = false;
                        return R;
                    } else {
                        var R = Main.getController("PCL.ConCrud").validateField(this, value);
                        return R;
                    }
                    
                },
                //nemonico: pcl.nemonico,
                readOnly: !per,
                number: field.number,
                allowBlank: !requerido,
                format: 'd/m/Y',
                listeners: {
                   
                    render: function (el) {
                        this.validable = true;
                        this.form = this.up('vispclform');
                    },
                    
                    focus: function (el, The, eOpts) {
                        

                        form = el.up('vispclform');
                        var grid = form.grid;
                        var pcl = grid.up('vispcl');
                        if (el.xtype === 'viszoom') {
                            
                            el.originalValue = el.value;
                            el.validable = true;
                            
                        }
                        el.clearInvalid()
                        Main.getController("PCL.ConCrud").focus(el, The, eOpts);
                        var record = el.up('form').getRecord();
                        if (record === undefined) {
                            return;
                        }
                        var SMEvent_beforeCellEdit = {
                            cancel: false,
                            pcl:pcl,
                            Global: pcl.metaData.Global,
                            field: el,
                            name: el.name,
                            inForm: true,
                            record: record
                        };
                        if (pcl.metaData.eventosPcl.beforeCellEdit) {
                            try {
                                pcl.metaData.eventosPcl.beforeCellEdit(SMEvent_beforeCellEdit);
                                if (SMEvent_beforeCellEdit.cancel != false) {
                                    el.blur();
                                } 
                            } catch (e) {
                                console.log('SMError 116 error en la ejecucion del evento beforeEdit en la grilla: ' + e.message);
                                SMEvent_beforeCellEdit.cancel = false;
                            }
                        }
                        
                    },

                   
                    blur: function (el, The, eOpts) {
                        if (this.form) {
                            el.editorValue = el.value;
                            var crud = el.form;
                            var record = el.up('form').getRecord();
                            record.set(el.name, el.value);
                            el.isValid();
                            Main.getController("PCL.ConCrud").blur(el, The, eOpts, record);
                        }
                    }
                }

            };
            campos.add(camp.name, camp);
        }

        tabG = grid.pcl.down('vispcltabgrid').getActiveTab();

        var formTabs = new Array();
            var gr = tabG;
            var fields = new Array();
            if (gr.camposCargados) {

                var columns = gr.getView().getHeaderCt().getVisibleGridColumns();
                for (j = 0; j < columns.length; j++) {
                    var column = columns[j];
                    if ((column) && (!Ext.isEmpty(column.dataIndex) && !column.hidden)) {
                        fields.push(campos.get(column.dataIndex));
                        campos.get(column.dataIndex).inForm = true;
                    }
                    
                }
            }
            else {
                fieldDef = gr.campos;
                for (j = 0; j < fieldDef.length; j++) {
                    var column = fieldDef[j];
                    if ((column) && (!Ext.isEmpty(column.datafield))) {
                        fields.push(campos.get(column.datafield));
                        campos.get(column.datafield).inForm = true;
                    }
                }
            }
            var swOculto = true;
            if (accion == 0) {
                var swOculto = false;
            }
            var tab = {
                xtype: 'form',
                //title: gr.title,
                url: url,
                region: 'center',
                items: fields,
                validar: false,
                layout: {
                    type: 'vbox'
                },
                bodyStyle: 'padding:10px 10px 0',
                autoScroll: true,
                buttons: [
                    {
                        xtype: 'button',
                        iconCls: "icon-atras",
                        action: 'clickPrevious',
                        text: WorkSpace.Label.Boton_Atras,
                        hidden:swOculto

                    }, {
                        xtype: 'button',
                        iconCls: "icon-siguiente",
                        action: 'clickNext',
                        text: WorkSpace.Label.Boton_Siguiente,
                        hidden: swOculto

                    },
                    {
                       xtype: 'label',
                       flex:1

                    },
                    {
                      xtype: 'button',                       
                      text: WorkSpace.Label.Boton_Aceptar,
                      //formBind: true,
                      iconCls: "icon-ok",
                      action: 'clickAceptar'
                    }, {
                      xtype: 'button',
                      text: WorkSpace.Label.Boton_Cancelar,
                      iconCls: "icon-cancelar",                       
                      action: 'clickCancelar'
                   }
                ]
            };
            formTabs.push(tab);
        
      

            var cthis = this;
            var Crud = Ext.widget('vispclform', {
                items: formTabs,
                nemo: grid.nemo,
                store: grid.store,
                record: seleccion,
                Action: accion,
                title:gr.title,
                grid:grid,
                tabla: tabla,
                grilla: this,
                url: url,
                
            });
            
            Crud.show();
            Crud.down('form').items.items[0].focus();

            this.LoadRecordForm(Crud, seleccion);

            me = this;
            var btn1 = Crud.down("button[action=clickAceptar]");
            var btn2 = Crud.down("button[action=clickCancelar]");
            var map = new Ext.util.KeyMap({
                target: Crud.el,
                binding: [{
                    key: [13],
                    //shift: true,
                    fn: function () { me.Editar(btn1); }
                }, {
                    key: [27],
                    //shift: true,
                    fn: function () { me.Cerrar(btn2); }
                }]
            });
            
           
        
    },


    LoadRecordForm: function (form, record) {
        var items = form.down('form');
        items.getForm().loadRecord(record);
    },

   

   
    Editar: function (el) {
        WorkSpace.MostrarMascara();
        if (el.up('form').getForm().isValid() == true) {
            var form = el.up('vispclform');
            var tabPanel = form.down('tabpanel');
            var record = el.up('form').getForm().getRecord();
            var recg = form.grid.getSelectionModel().getSelection()[0];
            recg.set(record.data);
            form.grid.getSelectionModel().deselect(recg);
            form.grid.getSelectionModel().select(recg);
            WorkSpace.OcultarMascara();
            el.up('vispclform').close();
            WorkSpace['Vistas']['VisPrincipal'].down('statusbar[name=estado]').setStatus({
                text: WorkSpace.Msg.registroModificado,
                //iconCls: 'icon-ok',
                clear: {
                    wait: 8000,
                    anim: true,
                    useDefaults: false
                }
            });
        } else {
            WorkSpace.OcultarMascara();
            Ext.Msg.alert(WorkSpace.Label.Informacion, WorkSpace.Msg.FormNotValid);
        }

  }


});