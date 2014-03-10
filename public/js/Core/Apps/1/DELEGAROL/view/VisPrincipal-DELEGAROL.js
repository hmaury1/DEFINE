Ext.define('SmPlus.Apps.1.DELEGAROL.view.VisPrincipal-DELEGAROL', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.visprincipalDELEGAROL',
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
                   xtype: 'panel',
                   region: 'west',
                   collapsible: true,
                   collapseMode: 'mini',
                   header: false,
                   hideCollapseTool: true,
                   split: true,
                   layout: {
                       type: 'border'
                   },
                   flex: 0.8,
                   items: [
                        {
                            xtype: 'vispcldinamica',
                            view: me,
                            nemonico: 'SGRLADMIN',
                            name: 'SGRLADMIN',
                            region: 'north',
                            flex: 1,
                            opciones: {
                                operacion: ["IN","QRY"],
                                //titulo:'Aplicaciones'
                                //defaultqbe: '[]',
                                //filtro: '',
                                //paginado: false,
                                //herramientas: false,
                                personalizacion: false

                            }

                        }, {
                            xtype: 'gridpanel',
                            name: 'gpUsuarioRoles',
                            title: 'Usuario',
                            region: 'center',
                            store: 'SmPlus.Apps.1.DELEGAROL.store.stoUsuarios-DELEGAROL',
                            plugins: [Ext.create('Core.ux.FilterRow', { remoteFilter: false })],
                            flex: 1,
                            columns: [
                                {
                                    xtype: 'actioncolumn',
                                    dataIndex: 'IDUSUARIO2',
                                    name: 'checkBoxUsuarios',
                                    menuDisabled: true,
                                    width: 25,
                                    xfilter:{
                                        enable: false,

                                    },
                                    renderer: function (value, metaData, record, rowIndex, colIndex, store) {

                                        var imagen = "";
                                        if (record.get('IDUSUARIO2') != null) {
                                            imagen = '../../Recursos/Imagenes/checkbox_yes.png';
                                        } else {
                                            imagen = '../../Recursos/Imagenes/checkbox_no.png';
                                        }
                                        return '<img style="cursor:pointer" src="' + imagen + '"   style="height:15px;" >';
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    text: 'USUARIO',
                                    dataIndex: 'USUARIO',
                                    minWidth: 100,
                                    flex: 1
                                }, {
                                    xtype: 'gridcolumn',
                                    text: 'NOMBRE',
                                    dataIndex: 'NOMBRE',
                                    minWidth: 100,
                                    flex: 1
                                }
                            ]

                        }
                                

                   ]
               }, {
                   xtype: 'panel',
                   region: 'center',
                   collapsible: true,
                   collapseMode: 'mini',
                   header: false,
                   hideCollapseTool: true,
                   split: true,
                   layout: {
                       type: 'border'
                   },
                   flex: 0.8,
                   items: [
                       
                      

                        {
                            xtype: 'gridpanel',
                            name: 'gpRoles',
                            title: 'Roles',
                            region: 'center',
                            plugins: [Ext.create('Core.ux.FilterRow', { remoteFilter: false })],
                            features: [Ext.create('Ext.grid.feature.Grouping',{
                                groupHeaderTpl: 'Aplicacion: {name} ({rows.length} Rol{[values.rows.length > 1 ? "es" : ""]})'
                            })],
                            store: 'SmPlus.Apps.1.DELEGAROL.store.stoRoles-DELEGAROL',
                            flex: 1,
                            columns: [
                                {
                                    xtype: 'actioncolumn',
                                    dataIndex: 'IDROLUSUARIO',
                                    name: 'checkBoxRoles',
                                    menuDisabled: true,
                                    width: 25,
                                    xfilter: {
                                        enable: false,

                                    },
                                    renderer: function (value, metaData, record, rowIndex, colIndex, store) {

                                        var imagen = "";
                                        if (record.get('IDROLUSUARIO') != null) {
                                            imagen = '../../Recursos/Imagenes/checkbox_yes.png';
                                        } else {
                                            imagen = '../../Recursos/Imagenes/checkbox_no.png';
                                        }
                                        return '<img style="cursor:pointer" src="' + imagen + '"   style="height:15px;" >';
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    text: 'DESCRIPCION',
                                    dataIndex: 'ROL',
                                    minWidth: 100,
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    text: 'APLICACION',
                                    dataIndex: 'APLICACION',
                                    minWidth: 100,
                                    flex: 1
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