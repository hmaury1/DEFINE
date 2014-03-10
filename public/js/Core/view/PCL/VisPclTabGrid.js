Ext.require('SmPlus.store.stoDatosPcl');
Ext.define("SmPlus.view.PCL.VisPclTabGrid", {
    extend: 'Ext.tab.Panel',
    alias: 'widget.vispcltabgrid',
    region:'center',
    flex: 1,
    pcl: {},
    name:'Pcl-contenido',
    campos: '',
    nemonico: '',
    nemo: '',
    filtro: '',
    filtroQbe: '',
    cantidadReg: 60,
    link: false,
    initComponent: function () {
        me = this;
        if (me.personalizacion != false) me.personalizacion = true;
        Ext.applyIf(me, {
            
            tabBar: {
                xtype: 'tabbar',
                
                items: [
                    {
                        xtype: 'toolbar',
                        name:'tbPersonalizacion',
                        flex: 1,
                        frame: true,
                        border:0,
                        
                        items:[
                                    {
                                        xtype: 'button',
                                        //text: WorkSpace.Label.Boton_Crear_Tabs,
                                        iconCls: 'icon-agregar',
                                        hidden: !me.personalizacion,
                                        action: 'ClickAgregarTabs',
                                        height: 20
                                    },
                                    {
                                        xtype: 'label',
                                        text: '',
                                        hidden: !me.personalizacion,
                                        flex: 1

                                    }, {
                                        xtype: 'button',
                                        tooltip: WorkSpace.Label.Boton_Mover_Izquierda,
                                        iconCls: 'icon-atras',
                                        height: 20,
                                        hidden: !me.personalizacion,
                                        action: 'ClickMoverIzquierda'
                                    },
                                    {
                                        xtype: 'button',
                                        tooltip: WorkSpace.Label.Boton_Mover_Deracha,
                                        height: 20,
                                        hidden: !me.personalizacion,
                                        iconCls: 'icon-siguiente',
                                        action: 'ClickMoverDerecha'
                                    },
                                    {
                                        xtype: 'button',
                                        iconCls: 'icon-system',
                                        hidden: !me.personalizacion,
                                        height: 20,
                                        tooltip: WorkSpace.Msg.Tooltip_Boton_Pestañas,
                                        menu: [
                                            {
                                                text: WorkSpace.Label.Boton_Refrecar_Tabs,
                                                action: 'clickReload',
                                                iconCls: 'icon-Actualizar'
                                            },
                                            {
                                                text: WorkSpace.Label.Boton_Restaurar_Tabs,
                                                action: 'clickReset',
                                                iconCls: 'icon-delete'
                                            },

                                            {
                                                text: WorkSpace.Label.Boton_Guardar_Tabs,
                                                iconCls: 'icon-disk',
                                                action: 'ClickGuardarTabs'
                                            }
                                        ]
                                    }
                        ]
                    }

                ]
            }

        });
        me.callParent(arguments);
        


        
    }

});

