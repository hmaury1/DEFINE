Ext.Loader.setConfig({ enabled: true });

Ext.application({
    name: 'SmPlus',
    path:  'app',
    appFolder: BasePath + 'js/Core/',
    controllers: [
        'ConPrincipal',
        'Core.ConMenu',
        'Core.ConBarraPrincipal',
        'Core.ConOpcion',
        'QBE.ConQBE',
        'PCL.ConPcl',
        'PCL.ConLink',
        'PCL.ConCrud',
        'PCL.ConPclGrid',
        'Controles.ConZoom',
        'PCL.ConPclTabGrid',
        'QBE.ConHelpQBE',
        'Codigo.ConCodigoOpcion',
        'Core.ConPanelControl',
        'PCL.ConGraficar'
    ],
    launch: function () {
        
        Ext.QuickTips.init();
        
       
    }


 
});


