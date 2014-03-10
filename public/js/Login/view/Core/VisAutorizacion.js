Ext.define("Isecure.view.Core.VisAutorizacion", {
    extend: 'Ext.window.Window',
    alias: 'widget.visautorizacion',
    //iconCls:'icon-fingerprint',
    region: 'center',
    border: 0,
    autoHeight: true,
    width: 500,
    title: "SoftMachine Plus",
    closable: false,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                        {
                            xtype: 'form',

                            frame: true,
                            items: [

                                   {
                                       xtype: 'toolbar',
                                       items: [
                                           {
                                               xtype: 'label',
                                               text: '',
                                               flex:1
                                           },
                                           {
                                               xtype: 'label',
                                               text:WorkSpace.Label.Textfield_Usuario+": "
                                           },
                                            {
                                                xtype: 'label',
                                                
                                                name: 'usuario',
                                                text:''
                                            },
                                           
                                           
                                            {
                                                xtype: 'textfield',
                                               //inputType: 'password',
                                               hidden:true,
                                                flex: 1,
                                                name: 'contrasena',
                                               
                                                fieldLabel: WorkSpace.Label.Textfield_Contraseña,
                                                labelWidth: 70
                                                
                                            },
                                            {
                                                xtype: 'label',
                                                text: '',
                                                flex: 1
                                            }
                                       ]
                                   },

                                    /*
                                    
                                    {
                                        xtype: 'combobox',
                                        labelWidth: 100,
                                        name: 'cmbAplicacion',
                                        width: 355,
                                        padding: 10,
                                        fieldLabel: WorkSpace.Label.Combo_Aplicacion,
                                        store: 'stoAplicacion',
                                        displayField: 'Aplicacion',
                                        valueField: 'idaplicacion',
                                        hidden: true,
                                        queryMode: 'local'
                                    },
                                    {
                                        xtype: 'combobox',
                                        labelWidth: 70,
                                        name: 'cmbEntorno',
                                        width: 355,
                                        padding: 10,
                                        fieldLabel: WorkSpace.Label.Combo_Entorno,
                                        store: 'stoEntorno',
                                        displayField: 'Descripcion',
                                        valueField: 'CodEntorno',
                                        hidden: true,
                                        queryMode: 'local'

                                    }
                                     */{
                                         xtype: 'panel',
                                         
                                         name: 'pnAutorizacion',
                                         layout: { type: 'hbox' },
                                         items: [
                                             {
                                                 xtype: 'gridpanel',
                                                 labelWidth: 70,
                                                 name: 'cmbAplicacion',
                                                 /* width: 255,
                                                  height:330,*/
                                                 height: 240,
                                                 width: 235,
                                                 autoScroll: true,

                                                 padding: 10,
                                                 //   fieldLabel: 'Aplicaci&oacute;n',
                                                 store: 'stoAplicacion',
                                                 // displayField: 'Aplicacion',
                                                 //  valueField: 'idaplicacion',
                                                 //   hidden: true,
                                                 //  queryMode: 'local',
                                                 columns: [
                                                        {
                                                            xtype: 'gridcolumn',
                                                            text: WorkSpace.Label.Grilla_Aut_Encabezado_Aplicacion,
                                                            dataIndex: 'Aplicacion',
                                                            menuDisabled: true,
                                                            flex: 1
                                                        }, {
                                                            xtype: 'gridcolumn',
                                                            text: WorkSpace.Label.Grilla_Aut_Encabezado_IdAplicacion,
                                                            dataIndex: 'IdAplicacion',
                                                            menuDisabled: true,
                                                            hidden: true,
                                                            flex: 1
                                                        }

                                                 ],
                                                 viewConfig: {
                                                     loadMask: false
                                                 }
                                             },
                                    {
                                        xtype: 'gridpanel',

                                        name: 'cmbEntorno',
                                        height: 240,
                                        width: 235,

                                        maxHheight: 180,
                                        autoScroll: true,
                                        padding: 10,
                                        // fieldLabel: 'Entorno',
                                        store: 'stoEntorno',
                                        //  displayField: 'Descripcion',
                                        //  valueField: 'CodEntorno',
                                        //  hidden: true,
                                        //   queryMode: 'local',
                                        columns: [
                                              {
                                                  xtype: 'gridcolumn',
                                                  text: WorkSpace.Label.Grilla_Ent_Encabezado_Entorno,
                                                  dataIndex: 'Descripcion',
                                                  menuDisabled: true,
                                                  flex: 1
                                              }, {
                                                  xtype: 'gridcolumn',
                                                  text: WorkSpace.Label.Grilla_Ent_Encabezado_CodEntorno,
                                                  dataIndex: 'CodEntorno',
                                                  menuDisabled: true,
                                                  hidden: true,
                                                  flex: 1
                                              }

                                        ],
                                        viewConfig: {
                                            loadMask: false
                                        }

                                    }
                                         ]
                                     }



                            ],
                            buttons: [
                               {
                                    xtype: 'button',
                                    text: WorkSpace.Label.Boton_Aceptar,
                                    tooltip: WorkSpace.Label.Titulo_Ventana_Autorizacion,
                                    action: 'clickLogin',
                                    iconCls: 'icon-fingerprint'

                                }, {
                                    xtype: 'button',
                                    text: WorkSpace.Label.Boton_Cancelar,
                                    tooltip: WorkSpace.Msg.Limpiar_Datos,
                                    action: 'clickClear',
                                    iconCls: 'icon-Limpiar'
                                }, {
                                    xtype: 'button',
                                    text: WorkSpace.Label.Cambiar_Contrasena,
                                    tooltip: WorkSpace.Msg.Cambiar_Contrasena,
                                    action: 'clickCambiar',
                                    iconCls: 'icon-key'
                                }

                            ]

                        }

            ]


        });

        me.callParent(arguments);
    }

});