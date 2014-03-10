Ext.define('SmPlus.controller.PCL.ConForm', {
    extend: 'Ext.app.Controller',
    init: function () {

        this.control({
            
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


    eliminarRegistro: function(el){
        var grid = el.up('vispclgrid');
        var pcl = grid.up('vispcl');
        var records = grid.getSelectionModel().getSelection();
        if (records.length != 0) {
          

            Ext.Msg.confirm(WorkSpace.Label.Informacion, WorkSpace.Msg.Eliminar_registro, function (button) {
                if (button === 'yes') {
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
                    
                } else {
                    return;
                }
            });

        } else {
            return;
        }
    },

    Cerrar: function (el) {
        var form = el.up('vispclform');
        form.close();
        form = null;
    },

    IrARegistroAnterior: function (el, e, opt) {
        var form = el.up('vispclform');
        this.moveRecord(form,-1);
    },

    IrASiguienteRegistro: function (el, e, opt) {
        var form = el.up('vispclform');
        this.moveRecord(form,1);
    },

    moveRecord: function (form, indice) {
        var grid = form.grid;
        var index = grid.store.indexOf(form.record);
        var newIndex = index + indice;
        if (newIndex > grid.store.getCount() - 1) {
            newIndex = 0;
        } else {
            if (newIndex < 0) newIndex = grid.store.getCount() - 1;
        }
        form.record = grid.store.getAt(newIndex);
        var record = form.record.copy();
        this.LoadRecordForm(form, record);
    },

    Crud: function (el) {
        if (el.action == "clickAdd") accion = 1;
        if (el.action == "clickEdit") accion = 0;
        var grid = el.up('vispclgrid');
        
        var pcl = el.up('vispcl');
        var url ='';

        var seleccion;
        if (accion == 0) {

            var records = grid.getSelectionModel().getSelection();
            
            if (records.length != 0) {
                seleccion =  records[0].copy();
                url = WorkSpace.Url.Update_Record_PCL;

            } else {
                return;
            }
        }
        else {
            url = WorkSpace.Url.Add_Record_PCL;
           
                if (pcl.isLink) {
                    var master = WorkSpace.Vistas.VisPrincipal.down('tabpanel[name=tpContenido]').getActiveTab();
                    var gridMaster = master.down('vispclgrid');
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
                                recd[ds[i].name] = recordsM[0].get(PclFields[i]);

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
                grid.store.insert(grid.store.getCount(), seleccion);
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
            var type;
            var per = true;
            var cls = '';
            var requerido = false;
            var vDef = field.vdefault;
            var allowDec = true;
       
            
            if (field.zoomRef != '') {
                type = 'viszoom';

            } else {
                if (field.type == 'date') type = 'datefield';
                if (field.gtype == 'MEM') type = 'vissmtext';
                if (field.gtype == 'TEX') type = 'textfield';
                if (field.gtype == 'NUM') type = 'numberfield';
                if (field.gtype == 'PCT') type = 'textarea';
                if (field.gtype == 'DEC') {
                    type = 'numberfield';
                    allowDec = false;
                }
            }
            if (field.requerido == -1) requerido = true;

            if (field.EDITALLOW == 'RO') {
                per = false;
                cls = 'x-item-disabled';
            } else {
                /*if (accion == 1) {
                    if (field.EDITALLOW == 'UO') {
                        per = false;
                        cls = 'x-item-disabled';
                    }
                } else {
                    if (field.EDITALLOW == 'IO') {
                        per = false;
                        cls = 'x-item-disabled';
                    }
                }*/
            }
            if (!per) type = 'textfield';
            

            camp = {
                inForm: true,
                dValue: vDef,
                validCount: countV,
                allowDecimals: !allowDec,
                decimalPrecision: field.decimalprecision,
                zoomKey: field.zoomKey,
                eventos: field.eventos,
                zoomFilter: field.zoomFilter,
                zoomRef: field.zoomRef,
                heredados: field.heredados,
                xtype: type,
                validable:false,
                labelWidth: 150,
                width: 370,
                fieldLabel: field.label,
                name: field.name,
                
                //nemonico: pcl.nemonico,
                readOnly: !per,
                number: field.number,
                allowBlank: !requerido,
                format: 'd/m/Y',
                listeners: {
                   
                    render: function () {
                        this.validable = true;
                        this.form = this.up('vispclform');
                        
                    },
                    change: function (el, newValue, oldValue) {
                      
                        
                        if (this.form) {
                            
                            
                                var crud = el.form;
                                var record = el.up('form').getRecord();
                              
                                record.data[el.name] = newValue;
                                //Main.getController('PCL.ConForm').LoadRecordForm(crud, record);
                           
                        }
                    }
                }

            };
            campos.add(camp.name, camp);
        }

        tabG = grid.pcl.down('vispcltabgrid').items.items;

        var formTabs = new Array();

        
       
        for (i = 0; i < tabG.length; i++) {
            var gr = tabG[i];
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
            var tab = {
                xtype: 'form',
                title: gr.title,
                url: url,
                
                items: fields,
                validar: false,
                layout: {
                    type: 'vbox'
                },
                bodyStyle: 'padding:10px 10px 0',
                autoScroll: true,
                listeners: {
                    show: function () {
                        this.items.items[0].focus(false, 50);
                    }
                }
            };
            formTabs.push(tab);
        }
      

        var cthis = this;
            var Crud = Ext.widget('vispclform', {
                tabs: formTabs,
                nemo: grid.nemo,
                store: grid.store,
                record: seleccion,
                Action: accion,
                
                grid:grid,
                tabla: tabla,
                grilla: this,
                url: url,
                //onEditShow: onEdit
                listeners: {
                    
                    render: function () {
                        cthis.ActivarValidacion(Crud);
                    }
                }
            });
            
            Crud.show();
            
            this.LoadRecordForm(Crud, seleccion);

        
    },


    LoadRecordForm: function (form, record) {
        var items = form.down('tabpanel').items.items;

        for (var i = 0; i < items.length; i++) {
            items[i].getForm().loadRecord(record);
        }
    },

    ActivarValidacion: function (form) {
        var items = form.down('tabpanel').items.items;

        for (var i = 0; i < items.length; i++) {
            items[i].validar = true;
            items[i].getForm().applyToFields({
                //validable: true
            });
        }
    },



   
    Editar: function (el) {
          

        var form = el.up('vispclform');
        var tabPanel = form.down('tabpanel');
        var tabs = tabPanel.items.items;
        var record = tabs[0].getForm().getRecord();
       
            var recg = form.grid.getSelectionModel().getSelection()[0];
            recg.set(record.data);
            form.grid.getSelectionModel().deselect(recg);
            form.grid.getSelectionModel().select(recg);
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
       /* var records = [];

        records.push(record.data);*/
           /* Ext.Ajax.request({
                method: 'POST',
                waitMsg: WorkSpace.Label.Enviando,
                url:form.url,
                params:{
                    nemonico: form.nemo,
                    tabla: form.tabla,
                    registros: Ext.encode(records),

                },
                success: function (response) {
                    try {
                        
                        var resp = Ext.decode(response.responseText);

                        if (resp.session) {

                            if (resp.success) {
                                form.store.load();
                                el.up('vispclform').close();
                              
                            } else {
                                WorkSpace.alert(WorkSpace.Label.Informacion, resp.message);
                            }
                           
                           

                        } else {

                            var msg=Ext.Msg.show({
                                title: WorkSpace.Label.Informacion,
                                msg: WorkSpace.Msg.Sin_Sesion,
                                width: 300,
                                buttons: Ext.Msg.OK,
                                //multiline: true,
                                fn: function () {
                                    document.location = '/Home';
                                },
                                //animateTarget: 'addAddressBtn',
                                icon: Ext.window.MessageBox.INFO
                            });
                            Ext.defer(function () {
                                msg.toFront();
                            }, 50);
                        }
                    } catch (e) {
                        WorkSpace.OcultarMascara();
                        WorkSpace.alert(WorkSpace.Label.Informacion, WorkSpace.Msg.NoConexion);
                    }
                   
                },
                failure:function(form,action){
                    WorkSpace.alert(WorkSpace.Label.Informacion, WorkSpace.Msg.NoConexion);
                }
            }
            );*/
        }


});