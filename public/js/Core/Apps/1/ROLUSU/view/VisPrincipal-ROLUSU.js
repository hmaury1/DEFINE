Ext.define('SmPlus.Apps.1.ROLUSU.view.VisPrincipal-ROLUSU', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.visprincipalROLUSU',
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
                           store: 'SmPlus.Apps.1.ROLUSU.store.stoAplicaciones-ROLUSU',
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
                            store: 'SmPlus.Apps.1.ROLUSU.store.stoEntornos-ROLUSU',
                            displayField: 'DESCRIPCION',
                            valueField: 'IDENTORNO'
                        }
                        /*{
                            xtype: 'vispcldinamica',
                            view: me,
                            nemonico: 'SGAPPLUS',
                            name: 'SGAPPLUS',
                            region: 'north',
                            flex: 1,
                            hijos: ['SGENTPLUS'],
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
               },{
                   xtype: 'tabpanel',
                   name:'tpContenidoDerecho',
                   region: 'center',
                   flex:1,
                   items: [
                        {
                            xtype: 'panel',
                            region: 'center',
                            title:'Usuarios',
                            layout: {
                                type: 'border'
                            },
                            flex: 1,
                            items: [
                                {
                                    xtype: 'vispcldinamica',
                                    view: me,
                                    nemonico: 'SGUSPLUS',
                                    name: 'SGUSPLUS',
                                    region: 'west',
                                    
                                    flex: 1,
                                    opciones: {
                                        operacion: ["IN","QRY"],
                                        //titulo:'Aplicaciones'
                                        //defaultqbe: '[]',
                                        
                                        //paginado: false,
                                        //herramientas: false,
                                        personalizacion: false

                                    }



                                },
                                {
                                    xtype: 'gridpanel',
                                    name: 'gpRolesUsuario',
                                    region: 'center',
                                    store: 'SmPlus.Apps.1.ROLUSU.store.stoRoles-ROLUSU',
                                    flex: 1,
                                    plugins: [Ext.create('Core.ux.FilterRow', { remoteFilter: false })],
                                    columns: [
                                         {
                                             xtype: 'actioncolumn',
                                             name: 'checkBoxRoles',
                                             dataIndex: 'IDROL2',
                                             menuDisabled: true,
                                             width: 25,
                                             xfilter: {
                                                 enable: false,

                                             },
                                             renderer: function (value, metaData, record, rowIndex, colIndex, store) {

                                                 var imagen = "";
                                                 if (record.get('IDROL2') != null) {
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
                        }, {
                            xtype: 'panel',
                            region: 'center',
                            name:'pRoles',
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
                                     region: 'west',
                                     
                                     flex: 1,
                                     
                                     //hijos: ['SGROLUSER'],
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
                                         
                                         //paginado: false,
                                         //herramientas: false,
                                         filtro: '1=2',
                                         personalizacion: false

                                     }
                                 },
                                {
                                    xtype: 'gridpanel',
                                    name: 'gpUsuarioRoles',
                                    region: 'center',
                                    store: 'SmPlus.Apps.1.ROLUSU.store.stoUsuarios-ROLUSU',
                                    flex: 1,
                                    plugins: [Ext.create('Core.ux.FilterRow', { remoteFilter: false })],
                                    columns: [
                                         {
                                             xtype: 'actioncolumn',
                                             dataIndex: 'IDUSUARIO2',
                                             name:'checkBoxUsuarios',
                                             menuDisabled: true,
                                             menuDisabled: true,
                                             width: 25,
                                             xfilter: {
                                                 enable: false,

                                             },
                                             renderer: function (value, metaData, record, rowIndex, colIndex, store) {

                                                 var imagen = "";
                                                 if (record.get('IDUSUARIO2') != null) {
                                                     imagen = '../../Recursos/Imagenes/checkbox_yes.png';
                                                 } else {
                                                     imagen = '../../Recursos/Imagenes/checkbox_no.png';
                                                 }
                                                 return '<img style="cursor:pointer"  src="' + imagen + '"   style="height:15px;" >';
                                             }
                                         },
                                        {
                                            xtype: 'gridcolumn',
                                            text: 'USUARIO',
                                            dataIndex: 'USUARIO',
                                            menuDisabled: true,
                                            minWidth: 100,
                                            flex: 1
                                        }, {
                                            xtype: 'gridcolumn',
                                            text: 'NOMBRE',
                                            dataIndex: 'NOMBRE',
                                            menuDisabled: true,
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