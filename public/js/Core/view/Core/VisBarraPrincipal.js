Ext.define("SmPlus.view.Core.VisBarraPrincipal", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.visbarraprincipal',
    
    border: 0,

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            bbar: {
                xtype: 'statusbar',
                defaultText: '',
                defaultIconCls: 'icon-ok',
                name:'estado',
                // values to set initially:
                text: 'Bienvenido',
                iconCls: 'ready-icon',
                items: [
                       /* 
                        {
                            text: 'Archivo',
                            //iconCls: 'bmenu',  // <-- icon
                            //menu: menu  // assign menu by instance
                        },
                        {
                            text: 'Herramientas',
                            //iconCls: 'bmenu',  // <-- icon
                            menu:
                            [
                                {
                                    text: 'Editar Perfil',
                                    menu: [
                                        {
                                            text: 'Usuario Actual',

                                        },
                                        {
                                            text: 'Pulico'
                                        }
                                    ]
                                }
                            ]
                        },/*
                        {
                            text: 'Administracion',
                            //iconCls: 'bmenu',  // <-- icon
                            //menu: menu  // assign menu by instance
                        },
                         {
                             text: 'Ventana',
                             //iconCls: 'bmenu',  // <-- icon
                             //menu: menu  // assign menu by instance
                         },
                         {
                             text: 'Ayuda',
                             //iconCls: 'bmenu',  // <-- icon
                             //menu: menu  // assign menu by instance
                         },
                        {
                            xtype: 'tbseparator',

                        },*/
                        {
                            xtype: 'button',
                            iconCls: 'icon-console',
                            text: WorkSpace.Label.Boton_Comando,
                            action: 'clickConsole',
                            tooltip: WorkSpace.Msg.Tooltip_Boton_Comando
                        },
                        {
                            xtype: 'button',
                            text: WorkSpace.Label.Boton_Panel_Control,
                            iconCls: 'icon-controlpanel',
                            action: 'clickPanelControl',
                            hidden: true,
                            tooltip: WorkSpace.Msg.Tooltip_Boton_Panel_Control
                        }, {
                            xtype: 'tbseparator'
                            
                        },
                        {
                            xtype: 'label',
                            html: WorkSpace.Label.Empresa

                        },
                        {
                            xtype: 'label',
                            name: 'txtEmpresa'

                        }, {
                            xtype: 'label',
                            width: 25
                        }, {
                            xtype: 'label',
                            html: WorkSpace.Label.Aplicacion

                        },
                        {
                            xtype: 'label',
                            name: 'txtAplicacion'

                        }, {
                            xtype: 'label',
                            width: 25
                        },
                        {
                            xtype: 'label',
                            html: WorkSpace.Label.Entorno

                        },
                        {
                            xtype: 'label',
                            name: 'txtEntorno'

                        }, {
                            xtype: 'label',
                            width: 25
                        },
                        {

                            xtype: 'splitbutton',
                            text: '...',
                            name: 'btnUsuario',
                            iconCls: 'icon-user',
                            menu: new Ext.menu.Menu({
                                items: [

                                    { xtype: 'button', text: WorkSpace.Label.Boton_Cerrar_Sesion, action: 'clickCerrarSesion', iconCls: 'icon-logout', width: 150 }


                                ]
                            })
                        }



                ]
            }


        });

        me.callParent(arguments);
    }

});