Ext.define("SmPlus.view.QBE.VisQBE", {
    extend: 'Ext.window.Window',
    alias: 'widget.visqbe',
    closable:false,
    nemo: null,
    defaultType: 'clickAceptar',
    iconCls:'icon-filter',
    width: 470,
    height:460,
    modal: true,
    campos:{},
    aceptar: function () { },
    cancelar: function () { },
    plain: true,
    titulo:'',
    layout: {
        type: 'border'

    },
    initComponent: function () {
        var me = this;
        var fields = me.campos;
        if (me.titulo != '') me.titulo='-' + me.titulo;

        Ext.applyIf(me, {

            title: me.nemo + me.titulo,

            items: [
                {
                    xtype: 'tabpanel',
                    region: 'center',
                    
                    /*width: 460,
                    height: 425,*/
                    flex:1,
                    layout:{
                        type: 'border'

                    },
                   
                    items: [
                        {
                            xtype: 'gridpanel',
                            flex: 1,
                            name:'gpConsultas',
                            store: me.store,
                            title:'Consultas',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    width:25,
                                    menuDisabled: true,
                                    dataIndex: 'UsuarioP',
                                    renderer: function (value, metadata, record) {
                                        
                                        if (value != "PUBLICO") {
                                            metadata.tdCls = 'icon-user';
                                        } else {
                                            metadata.tdCls = 'icon-users';
                                        }
                                    }

                                },
                                {
                                    xtype: 'gridcolumn',
                                    flex: 1,
                                    menuDisabled: true,
                                    dataIndex: 'CNombre'

                                }
                            ],
                            tbar: {
                                xtype: 'toolbar',
                                items: [
                                    {
                                        xtype: 'button',
                                        text: WorkSpace.Label.Boton_Remove,
                                        action: 'clickremoveconsulta',
                                        iconCls: 'icon-delete'
                                    }
                                ]
                            }
                        },
                        {
                            xtype: 'form',
                            title:'Criterio',
                            items: me.campos,
                            autoScroll: true,
                            flex:1,
                            layout: {
                                type: 'vbox'
                            },
                            monitorValid: true,
                            frame: true,
                            bodyStyle: 'padding:5px 10px 0',
                            bbar:{
                                xtype: 'toolbar',
                                items: [
                                    {
                                        xtype: 'combobox',
                                        name: 'cbConsultas',
                                        width:300,
                                        store: me.store,
                                        displayField: 'CNombre',
                                        valueField: 'IdCriterio'
                                    },
                                     {
                                         xtype:'checkboxfield',
                                         boxLabel: 'Guardar',
                                         name: 'chGuardar',
                                         inputValue: false
                                         
                                     }
                                ]
                            }

                        }

                    ]
                
                }
                
            ],
            fbar: [
                {
                    xtype: 'button',
                    name: 'clickAceptar',
                    text: WorkSpace.Label.Boton_Aceptar,
                    formBind: true,
                    iconCls: "icon-ok",
                    action: 'clickAceptar'


                }, {
                    xtype: 'button',
                    text: WorkSpace.Label.Boton_Cancelar,
                    iconCls: "icon-cancelar",
                    name: 'clickCancelar',
                    action: 'clickCancelar'

                }

            ]
           


        });
        
      
       me.callParent(arguments);
    }

});

