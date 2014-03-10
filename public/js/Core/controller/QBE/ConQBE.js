Ext.define('SmPlus.controller.QBE.ConQBE', {
    extend: 'Ext.app.Controller',

    init: function () {
        
        this.control({
            'visqbe ': {
                render: this.render
             },
            'visqbe button[action=clickAceptar]':{
                click: this.Aceptar
            },
            'visqbe button[action=clickremoveconsulta]': {
                click: this.Eliminar
             },
            'visqbe button[action=clickCancelar]':{
                click:this.Cancelar
            },
            'visqbe textfield': {
                specialkey:this.keyFormulario
            },
            'visqbe gridpanel[name=gpConsultas]': {
                select: this.selectConsulta,
                itemdblclick: this.dblConsulta
            },
            'visqbe combobox[name=cbConsultas]': {
                select: this.ComboConsulta
                
            },
            'vispclgrid button[action=clickqbe]': {
                click: this.AvanzadoQbe
            },
            'vispclgrid button[action=clickFind]': {
                click: this.FullTextQbe
            },
            'vispclgrid button[action=clickLimpiar]': {
                click: this.LimpiarFullText
            },
            'vispclgrid textfield[name=txtFind]': {
                specialkey: this.FullTextQbeKey
            }
        });
        
    },

    render: function (el) {
        if (el.tabConsulta == false) {
            var tab = el.down("tabpanel");
            tab.setActiveTab(1);
        }
        var me = this;
        var btn = el.down("button[action=clickAceptar]");
        var map = new Ext.util.KeyMap({
            target: el.el,
            binding: [{
                key: [13],
                //shift: true,
                fn: function () { me.Aceptar(btn); }
            }, {
                key: [27],
                //shift: true,
                fn: function () { me.Cancelar(btn); }
            }]
        });
        el.SmKeyMap = map;
    },

    dblConsulta: function (el, record, item, index, e, eOpts) {
          
        el.up('visqbe').aceptar(el.up('visqbe'), record.data.CriterioJson);
        el.up('visqbe').hide();

    },

    selectConsulta: function (el, record, index, eOpts ) {

        var visqbe = el.view.up('visqbe');
        var values = Ext.decode(record.data.CriterioJson);
        this.limpiarQBE(visqbe);
        for (var i = 0; i < values.length; i++) {
            var field = visqbe.down('vishelpqbe[name=' + values[i].field + ']');
            field.setValue(values[i].value);
        }
        var combo = visqbe.down('combobox[name=cbConsultas]');
        combo.select(record);
    },


   ComboConsulta: function (el, records, index, eOpts) {

        var visqbe = el.up('visqbe');
        var values = Ext.decode(records[0].data.CriterioJson);
        this.limpiarQBE(visqbe);
        for (var i = 0; i < values.length; i++) {
            var field = visqbe.down('vishelpqbe[name=' + values[i].field + ']');
            field.setValue(values[i].value);
        }
        var grid = visqbe.down('gridpanel[name=gpConsultas]');
        grid.getSelectionModel().select(records[0]);
    },

    limpiarQBE: function (visqbe) {
        var form = visqbe.down('form');
        var campos = form.items.items;
        for (var i = 0; i < campos.length; i++) {
            if (campos[i].allowBlank != false) {
                campos[i].setValue("");
            }
        }
    },
    
    FullTextQbeKey :function (field, e) {
                    // e.HOME, e.END, e.PAGE_UP, e.PAGE_DOWN,
                    // e.TAB, e.ESC, arrow keys: e.LEFT, e.RIGHT, e.UP, e.DOWN
                    if (e.getKey() == e.ENTER) {
                        this.FullTextQbe(field);
                    }
    },

    LimpiarFullText: function (field) {
        var grid = field.up('vispcl');
        grid.down('textfield[name=txtFind]').setValue("");
        this.FullTextQbe(field);
    },

    AvanzadoQbe: function(el){
        var grid = el.up('vispcl');
        
        grid.qbe.aceptar = function (qbe, filtroqbe) {
            grid.filtroQbe = filtroqbe;
            Main.getController('PCL.ConPcl').LoadData(grid,filtroqbe);
        };
        grid.qbe.show();
        grid.qbe.SmKeyMap.enable();
    },

    FullTextQbe: function (el) {

        var grid = el.up('vispcl');
        var text = grid.down('textfield[name=txtFind]').value;
        if(text!=""){
            var fields = grid.qbe.down('form').items.items;
           
            var filtroqbe = new Array();
            filtroqbe.push({
                field: '_allCols',
                value: text
            });
            for (var i = 0; i < fields.length; i++) {
                if (fields[i].value == "") {
                    filtroqbe.push({
                        field: fields[i].name,
                        value: text,
                        like:true
                    });
                } else {
                    filtroqbe.push({
                        field: fields[i].name,
                        value: fields[i].value,
                        like: false
                    });
                }
                
            }
            filtroqbe = Ext.encode(filtroqbe);
           
            Main.getController('PCL.ConPcl').LoadData(grid, filtroqbe);
        }else{
           
            Main.getController('PCL.ConPcl').LoadData(grid, grid.filtroQbe);
        }
        

    },


    QBE:function (type,nemonico,PclFilt,tabCls, opciones, link, campoPcl, campoLnk){
        var me = this;
       
        var fields = new Array();
            var ne=nemonico;
            if(!tabCls){
                tabCls=false;
            }
            var tipo='inicio';
            if(PclFilt)tipo='filtro';
            var storeQBE = Ext.create('SmPlus.store.stoCriterio');
            storeQBE.proxy.extraParams = {
                nemonico:ne,
                tipo:tipo
            };
            storeQBE.load(
            
            function(records, operation, success){
                
                        WorkSpace.OcultarMascara();
                      
                        var respuesta = storeQBE.proxy.reader.rawData;
                        if (respuesta.session) {

                            var req = true;

                            resp = respuesta.campos;
                            for (i = 0; i < resp.length; i++) {
                                var tpl = '';
                                if (resp[i].qbe == 'REQ') {
                                    req = false;
                                    resp[i].label = '<b>' + resp[i].label + '</b>';
                                    tpl = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
                                }

                                fields.push({
                                    xtype: 'vishelpqbe',
                                    fieldLabel: Ext.util.Format.capitalize(resp[i].label),
                                    name: resp[i].datafield,
                                    labelWidth: 150,
                                    width: 400,
                                    allowBlank: req,
                                    value: me.getDefaultQbe(resp[i].datafield, opciones.defaultqbe),
                                    editable: true,
                                    //enterKey: function () { },
                                    hidden:resp[i].hidden,
                                    hideTrigger: false,
                                    afterLabelTextTpl: tpl,
                                    nemonico: nemonico

                                });
                                req = true;
                            }
                            swConsulta = false;
                            if(records.length>0){
                                swConsulta = true;
                            }
                            switch (type) {
                                case 0: if (respuesta.qbe) {

                                    Ext.create('SmPlus.view.QBE.VisQBE', {
                                        campos: fields,
                                        store: storeQBE,
                                        tabConsulta:swConsulta,
                                        nemo: ne,
                                        titulo: '',
                                        aceptar: function (qbe, filtroqbe) {
                                            WorkSpace.MostrarMascara();
                                            Main.getController('PCL.ConPcl').abrePcl(ne, opciones.filtroInicio, filtroqbe, tabCls, PclFilt, opciones, fields, qbe);
                                        }
                                    }).show();
                                } else {
                                    if (respuerta.razon == 'QBE*') {

                                         var viqbe = Ext.create('SmPlus.view.QBE.VisQBE', {
                                            campos: fields,
                                            nemo: ne,
                                            titulo: '',
                                            store: storeQBE,
                                            tabConsulta: swConsulta,
                                            aceptar: function (qbe, filtroqbe) {


                                            }
                                        });
                                        WorkSpace.MostrarMascara();
                                        Main.getController('PCL.ConPcl').abrePcl(ne, opciones.filtroInicio, '[]', tabCls, PclFilt, opciones, fields, viqbe);

                                    }
                                }
                                    break;
                                case 1:

                                    var viqbe = Ext.create('SmPlus.view.QBE.VisQBE', {
                                        campos: fields,
                                        store: storeQBE,
                                        nemo: ne,
                                        titulo: '',
                                        tabConsulta: swConsulta,
                                        aceptar: function (qbe, filtroqbe) {


                                        }
                                    });
                                    
                                    var PCL = Ext.widget('vispcl', {
                                        nemonico: nemonico,
                                       
                                        claseTab: tabCls,
                                        campos: fields,
                                        filtro: PclFilt,
                                        opciones: opciones,
                                        filtroQbe: '[]',
                                        qbe: viqbe,
                                        isLink: true,
                                        campoPcl: campoPcl,
                                        campoLnk: campoLnk,
                                        PclPadre: link.up('vispcl').nemonico,
                                        isZoom: false,
                                        isDinamico: false

                                    });
                                    Main.getController('PCL.ConPclTabGrid').ConstruirTabs(PCL, tabCls);
                                    //PCL.down('tabpanel[name=Pcl-links]').hide();
                                    link.add(PCL);
                                    link.setActiveTab(PCL);
                                    link.expand(false);
                                    //WorkSpace.OcultarMascara();

                                    break;
                                case 2:
                                    var viqbe = Ext.create('SmPlus.view.QBE.VisQBE', {
                                        campos: fields,
                                        nemo: ne,
                                        store: storeQBE,
                                        titulo: '',
                                        tabConsulta: swConsulta,
                                        aceptar: function (qbe, filtroqbe) {


                                        }
                                    });


                                    var PCLZOOM = Ext.widget('vispcl', {
                                        region: 'center',
                                        /* height: 310,
                                         width: 500,*/
                                        nemonico: nemonico,

                                        claseTab: tabCls,
                                        campos: fields,
                                        filtro: PclFilt,
                                        opciones: opciones,
                                        filtroQbe: '[]',
                                        qbe: viqbe,
                                        isLink: false,
                                        campoPcl: '',
                                        campoLnk: '',
                                        padreLink: '',
                                        isZoom: true,
                                        isDinamico: false
                                    });
                                    Main.getController('PCL.ConPclTabGrid').ConstruirTabs(PCLZOOM, tabCls);
                                    // PCL.down('tabpanel[name=Pcl-links]').hide();
                                    var win = Ext.widget('window', {
                                        iconCls: 'icon-find',
                                        name: 'winZoom',
                                        title: opciones.titulo,
                                        layout: {
                                            type: 'border'
                                        },
                                        height: 400,
                                        width: 800,
                                        padre: null,
                                        modal: true,
                                        items: [PCLZOOM]
                                    }).show();

                                    break;

                                case 3:
                                    var viqbe = Ext.create('SmPlus.view.QBE.VisQBE', {
                                        campos: fields,
                                        tabConsulta: swConsulta,
                                        store: storeQBE,
                                        nemo: ne,
                                        titulo: '',
                                        aceptar: function (qbe, filtroqbe) {


                                        }
                                    });
                                   
                                   
                                    var PCLsimple = Ext.widget('vispcl', {
                                        region: 'center',
                                        /* height: 310,
                                         width: 500,*/
                                        nemonico: nemonico,
                                        
                                        claseTab: tabCls,
                                        campos: fields,
                                        filtro: PclFilt,
                                        opciones: opciones,
                                        filtroQbe: '[]',
                                        qbe: viqbe,
                                        isLink: false,
                                        campoPcl: '',
                                        campoLnk: '',
                                        padreLink: '',
                                        isZoom: false,
                                        isDinamico: true


                                    });
                                    Main.getController('PCL.ConPclTabGrid').ConstruirTabs(PCLsimple, tabCls);
                                    // PCL.down('tabpanel[name=Pcl-links]').hide();
                                    link.add(PCLsimple);

                                    break;
                                case 4: 

                                        var viqbe = Ext.create('SmPlus.view.QBE.VisQBE', {
                                            campos: fields,
                                            nemo: ne,
                                            titulo: '',
                                            store: storeQBE,
                                            tabConsulta: swConsulta,
                                            aceptar: function (qbe, filtroqbe) {


                                            }
                                        });
                                        WorkSpace.MostrarMascara();
                                        Main.getController('PCL.ConPcl').abrePcl(ne, PclFilt, '[]', tabCls, '', opciones, fields, viqbe);

                                  
                                    break;
                            }



                        } else {
                            WorkSpace.alert(WorkSpace.Label.Informacion, WorkSpace.Msg.Sin_Sesion);
                        }
                  /*  } catch (e) {
                        WorkSpace.OcultarMascara();
                        WorkSpace.alert(WorkSpace.Label.Informacion, WorkSpace.Msg.NoConexion);
                    }*/
                    
                    
                       
                   
               /* },
                failure: function(response){
                    WorkSpace.alert(WorkSpace.Label.Informacion, WorkSpace.Msg.Carga_Opcion_Fallida);
                }*/
                
               
            });
    },

    getDefaultQbe: function (datafield, defaultqbe) {
       
        for (var i = 0; i < defaultqbe.length; i++) {
            if (datafield==defaultqbe[i].field){
                return defaultqbe[i].value;
            }
        }

        return "";
    },

    Aceptar: function (el, e, eOpts) {
        
        var qbe = el.up('visqbe');
        console.log(qbe.SmKepMap);
        qbe.SmKeyMap.disable();
        var form = qbe.down('form');
       
        if (form.getForm().isValid()) {

            var send = '';
            filtroqbe = new Array();
            var campos = form.items.items;


            for (i = 0; i < campos.length; i++) {
                if (campos[i].value.trim() != '') {

                    filtroqbe.push({
                        field: campos[i].name,
                        value: campos[i].value
                    });
                    send += campos[i].name + "$( " + campos[i].value + " ),";
                }
            }
            if (send != '') {
                send = send.substring(0, send.length - 1);
            }
            filtroqbe = Ext.encode(filtroqbe);
           
            el.up('visqbe').aceptar(qbe, filtroqbe);
            el.up('visqbe').hide();

            var chbox = qbe.down('checkboxfield[name=chGuardar]');
            if (chbox.value == true) {
                chbox.setValue(false);
                var combo = qbe.down('combobox[name=cbConsultas]');
                if (combo.rawValue != "") {
                    Ext.Ajax.request({
                        url: WorkSpace.Url.GuardarConsulta,
                        method: 'POST',
                        params: {
                            nemonico: qbe.nemo,
                            nombre: combo.rawValue,
                            valor: send
                        },
                        success: function (response) {

                            qbe.store.load();

                        },
                        failure: function (response) {
                            //WorkSpace.alert(WorkSpace.Label.Informacion, WorkSpace.Msg.Carga_Opcion_Fallida);
                        }
                    });

                }
            }
        } else {
            WorkSpace.alert(WorkSpace.Label.Informacion, WorkSpace.Msg.Campos_Requeridos);
            return;
        }
    },

   

    Cancelar: function(el,e, eOpts){
        
            el.up('visqbe').cancelar();
            el.up('visqbe').hide();
       
    },

    keyFormulario: function (el, e, eOpts) {
        
        if (e.getKey() == e.ENTER) {
            this.Aceptar(el);

        }
              
           
    },

    Eliminar: function (el) {
        var qbe = el.up('visqbe');
        var grid = qbe.down('gridpanel[name=gpConsultas]');
        var records = grid.getSelectionModel().getSelection();
        if (records.length > 0) {
            if (records[0].data.UsuarioP != "PUBLICO") {
                Ext.Msg.confirm(WorkSpace.Label.Informacion, WorkSpace.Msg.Eliminar_Consulta, function (button) {
                    if (button === 'yes') {
                        WorkSpace.MostrarMascara();
                        Ext.Ajax.request({
                            url: WorkSpace.Url.EliminarConsulta,
                            method: 'POST',
                            params: {
                                nemonico: qbe.nemo,
                                nombre: records[0].data.CNombre
                            },
                            success: function (response) {
                                WorkSpace.OcultarMascara();
                                var resp = Ext.decode(response.responseText);

                              
                                    if (resp.success) {
                                        qbe.store.load();
                                    } else {
                                        
                                        WorkSpace.alert(WorkSpace.Label.Informacion, WorkSpace.Msg.No_consulta);
                                    }


                               


                            },
                            failure: function (response) {
                                WorkSpace.alert(WorkSpace.Label.Informacion, WorkSpace.Msg.NoConexion);
                            }
                        });
                    }
                });
                
            } else {
                WorkSpace.alert(WorkSpace.Label.Informacion, WorkSpace.Msg.NoEliminacionPlublica);
            }
        }

    }

    




});