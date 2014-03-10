Ext.define('SmPlus.Apps.ejemplo.ROLADM.controller.ConPrincipal', {
    extend: 'Ext.app.Controller',
    
    views: [
        'SmPlus.Apps.1.ROLADM.view.VisPrincipal'
    ],

    isload: false,
    

    init: function () {
        
        if (!this.isload) {
            this.isload = true;
            WorkSpace.ROLADM.vistas['VisPrincipal'] = Ext.widget("viscodigoopcion", {
                nemonico: "ROLADM",
                aplicacion: "1",
                title: "Roles administradores",

                items: [
                    Ext.create('SmPlus.Apps.ejemplo.ROLADM.view.VisPrincipal')
                ]
            });

            WorkSpace.Vistas.VisPrincipal.down('tabpanel[name=tpContenido]').add(WorkSpace.ROLADM.vistas['VisPrincipal']);
            WorkSpace.Vistas.VisPrincipal.down('tabpanel[name=tpContenido]').setActiveTab(WorkSpace.ROLADM.vistas['VisPrincipal']);



        }

        this.control({
            'visprincipalROLADM': {
                destroy: this.CerrarOpcion
            },

            'visprincipalROLADM button[name=ok]': {
                click: this.ok
            }
        });
       
    },

    CerrarOpcion:function(){
        this.isload = false;
        WorkSpace.ROLADM = null;
    },

    ok: function () {

        Ext.Msg.alert("Prueba", "Todo esta bien");

    }


});


