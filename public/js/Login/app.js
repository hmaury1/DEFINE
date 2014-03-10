Ext.Loader.setConfig({ enabled: true });
console.log(BasePath);
Ext.application({
    name: 'Isecure',
    path: 'app',
    appFolder: BasePath+'js/Login',
    controllers: ['ConPrincipal','Core.ConLogin'],
    launch: function () {
        
    }
});


   
