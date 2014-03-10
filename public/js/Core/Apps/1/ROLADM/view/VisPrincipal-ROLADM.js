Ext.define('SmPlus.Apps.1.ROLADM.view.VisPrincipal-ROLADM', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.visprincipalROLADM',
    layout: {
        type: 'border'
    },
    region:'center',
    
    //height:500,
    flex: 1,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
               {
                   xtype: 'toolbar',
                   region: 'north',
                   items: [
                        {
                            xtype: 'combobox',
                            name: 'IdAplicacion',
                            fieldLabel: 'Aplicacion',
                            labelWidth: 60,
                            editable:false,
                            store: 'SmPlus.Apps.1.ROLADM.store.stoAplicaciones-ROLADM',
                            displayField: 'APLICACION',
                            valueField: 'IDAPLICACION'
                        },{
                            xtype: 'label',
                            width: 50,
                            text:''
                        },
                       {
                           xtype: 'combobox',
                           name: 'IdEntorno',
                           fieldLabel: 'Entorno',
                           labelWidth: 50,
                           editable: false,
                           value:"",
                           store: 'SmPlus.Apps.1.ROLADM.store.stoEntornos-ROLADM',
                           displayField: 'DESCRIPCION',
                           valueField: 'IDENTORNO'
                       }/*
                        {
                            xtype: 'vispcldinamica',
                            view: me,
                            nemonico: 'SGAPPLUS',
                            name: 'SGAPPLUS',
                            region: 'north',
                            flex: 1,
                            hijos: ['SGENTPLUS', 'SGOPPLUS'],
                            opciones: {
                                //operacion: ["IN","ADD","DEL", "UPD","PRN1","EXP","QRY"],
                                //titulo:'Aplicaciones'
                                //defaultqbe: '[]',
                                
                                paginado: false,
                                herramientas: false,
                                personalizacion:false

                            }

                        },
                        {
                            xtype: 'vispcldinamica',
                            view: me,
                            nemonico: 'SGENTPLUS',
                            name: 'SGENTPLUS',
                            region: 'center',
                            flex: 1,
                            hijos: ['SGROLPLUS'],
                            llaves: [
                                    {
                                        padre: 'SGAPPLUS',
                                        campoPadre: 'IDAPLICACION',
                                        campoLink: 'IDAPLICACION'
                                    }
                            ],
                            
                            opciones: {
                                //operacion: ["IN","ADD","DEL", "UPD","PRN1","EXP","QRY"],
                                //titulo:'Aplicaciones'
                                //defaultqbe: '[]',
                                filtro: '1=2',
                                paginado: false,
                                herramientas: false,
                                personalizacion: false

                            }
                        }*/
                   ]
               }, {
                   xtype: 'tabpanel',
                   region: 'center',
                   flex:1,
                   items: [  
                        {
                            xtype: 'vispcldinamica',
                            view: me,
                            title:'Opciones',
                            nemonico: 'SGOPPLUS',
                            name: 'SGOPPLUS',
                            region: 'center',
                            hijos: ['SGOPEPLUS'],
                            flex: 1,
                           /* llaves: [
                                 {
                                     padre: 'SGAPPLUS',
                                     campoPadre: 'IDAPLICACION',
                                     campoLink: 'IDAPLICACION'
                                 }
                            ],*/
                            opciones: {
                                operacion: ["IN","QRY"],
                                //titulo:'Aplicaciones'
                                //defaultqbe: '[]',
                                filtro: '1=2',
                                paginado: false,
                                //herramientas: false,
                                personalizacion: false

                            }


                        },
                        {
                            xtype: 'treepanel',
                            name:'menuROLOP',
                            store: Ext.create('SmPlus.Apps.1.ROLADM.store.stoMenuOpciones-ROLADM'),
                            flex: 1,
                            autoScroll: true,
                            title: WorkSpace.Label.Titulo_TreePanel_Menu,
                            rootVisible: false
                        }
                   ]       
               
               }, {
                   xtype: 'tabpanel',
                   region: 'east',
                   flex:1,
                   items: [
                         {
                            xtype: 'panel',
                            region: 'center',
                            title: 'Roles',
                            layout: {
                                type: 'border'
                            },
                            flex: 1,
                            items: [
                                 {
                                     xtype: 'vispcldinamica',
                                     view: me,
                                     nemonico: 'SGROLPLUS',
                                     name: 'SGROLPLUS',
                                     region: 'north',                                    
                                     flex: 1,                                     
                                     /*llaves: [
                                         {
                                             padre: 'SGENTPLUS',
                                             campoPadre: 'IDENTORNO',
                                             campoLink: 'IDENTORNO'
                                         }
                                     ],*/
                                     opciones: {
                                         operacion: ["IN","QRY"],
                                         //titulo:'Aplicaciones'
                                         //defaultqbe: '[]',
                                         filtro: '1=2',
                                         //paginado: false,
                                         //herramientas: false,
                                         personalizacion: false

                                     }
                                 },
                                {
                                    xtype: 'gridpanel',
                                    name: 'gpRolesOperacion',
                                    region: 'center',
                                    store: 'SmPlus.Apps.1.ROLADM.store.stoOperaciones-ROLADM',
                                    flex: 1,
                                    plugins: [Ext.create('Core.ux.FilterRow', { remoteFilter: false })],
                                    columns: [
                                         {
                                             xtype: 'actioncolumn',
                                             dataIndex: 'IDOPCIONOP2',
                                             name:'checkBoxOperacion',
                                             menuDisabled: true,
                                             width: 25,
                                             xfilter: {
                                                 enable: false,

                                             },
                                             renderer: function (value, metaData, record, rowIndex, colIndex, store) {

                                                 var imagen = "";
                                                 if (record.get('IDOPCIONOP2') != null) {
                                                     imagen = '../../Recursos/Imagenes/checkbox_yes.png';
                                                 } else {
                                                     imagen = '../../Recursos/Imagenes/checkbox_no.png';
                                                 }
                                                 return '<img style="cursor:pointer"  src="' + imagen + '"   style="height:15px;" >';
                                             }
                                         },
                                        {
                                            xtype: 'gridcolumn',
                                            text: 'Descripcion',
                                            dataIndex: 'DESCRIPCIONOPE',
                                            minWidth: 100,
                                            flex: 1
                                        }, {
                                            xtype: 'gridcolumn',
                                            text: 'Operacion',
                                            dataIndex: 'OPERACION',
                                            minWidth: 100,
                                            flex: 1
                                        }
                                    ]

                                }
                            ]
                         },{
                            xtype: 'panel',
                            region: 'center',
                            title:'Operaciones',
                            layout: {
                                type: 'border'
                            },
                            flex: 1,
                            items: [
                                {
                                    xtype: 'vispcldinamica',
                                    view: me,
                                    nemonico: 'SGOPEPLUS',
                                    name: 'SGOPEPLUS',
                                    region: 'north',
                                    flex: 1,
                                    opciones: {
                                        operacion: ["IN","QRY"],
                                        //titulo:'Aplicaciones'
                                        //defaultqbe: '[]',
                                        filtro: '1=2',
                                        //paginado: false,
                                        //herramientas: false,
                                        personalizacion: false

                                    }, llaves: [
                                         {
                                             padre: 'SGOPPLUS',
                                             campoPadre: 'IDOPCION',
                                             campoLink: 'IDOPCION'
                                         }
                                    ]

                                },
                                {
                                    xtype: 'gridpanel',
                                    name: 'gpOperacionRoles',
                                    region: 'center',
                                    store: 'SmPlus.Apps.1.ROLADM.store.stoRoles-ROLADM',
                                    plugins: [Ext.create('Core.ux.FilterRow', { remoteFilter: false })],
                                    flex: 1,
                                    columns: [
                                         {
                                             xtype: 'actioncolumn',
                                             name: 'checkBoxRoles',
                                             dataIndex: 'IDOPCIONOP2',
                                             menuDisabled: true,
                                             width: 25,
                                             xfilter: {
                                                 enable: false,

                                             },
                                             renderer: function (value, metaData, record, rowIndex, colIndex, store) {

                                                 var imagen = "";
                                                 if (record.get('IDOPCIONOP2') != null) {
                                                     imagen = '../../Recursos/Imagenes/checkbox_yes.png';
                                                 } else {
                                                     imagen = '../../Recursos/Imagenes/checkbox_no.png';
                                                 }
                                                 return '<img style="cursor:pointer"  src="' + imagen + '"   style="height:15px;" >';
                                             }
                                         },
                                        {
                                            xtype: 'gridcolumn',
                                            text: 'ROL',
                                            dataIndex: 'ROL',
                                            minWidth: 100,
                                            flex: 1
                                        }, {
                                            xtype: 'gridcolumn',
                                            text: 'Comentario',
                                            dataIndex: 'Comentario',
                                            minWidth: 100,
                                            flex: 1
                                        }
                                    ]

                                }
                            ]
                        }
                   ]

               }
               

            ]
        });

        me.callParent(arguments);
    }
    
});