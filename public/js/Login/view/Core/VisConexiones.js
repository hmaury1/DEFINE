Ext.define("Isecure.view.Core.VisConexiones", {
    extend: 'Ext.window.Window',
    alias: 'widget.visconexiones',
    iconCls: 'icon-databaseEdit',
    region: 'center',
    border: 0,
    height: 205,
    width: 220,
    modal:true,
    title: WorkSpace.Label.Titulo_Ventana_Conexiones,
    closable: true,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                
                {
                    xtype: 'gridpanel',
                                        
                    name: 'cmbAplicacion',
                    
                    height: 145,
                    width: 200,
                    autoScroll: true,

                    padding: 10,
                    
                    store: 'stoConexion',
                    
                    columns: [
                            {
                                xtype: 'gridcolumn',
                                name:'gpConexiones',
                                text: WorkSpace.Label.Grilla_Con_Encabezado_Name,
                                dataIndex: 'name',
                                menuDisabled: true,
                                flex:1
                            }/*, {
                                xtype: 'gridcolumn',
                                text: WorkSpace.Label.Grilla_Con_Encabezado_String,
                                dataIndex: 'connectionString',
                                menuDisabled: true,
                                //hidden: true,
                                flex: 3
                            }*/

                    ]
                }

            ],

            bbar: {
                xtype: 'toolbar',
                items: [
                    {
                        xtype: 'label',
                        flex: 1,
                        text: ''
                    }, {
                        xtype: 'button',
                        text: WorkSpace.Label.Boton_Aceptar,
                        action: 'clickAceptar',
                        iconCls: 'icon-ok'

                    }
                ]
            }


        });

        me.callParent(arguments);
    }

});