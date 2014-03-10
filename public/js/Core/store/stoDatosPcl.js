Ext.define("SmPlus.store.stoDatosPcl", {
    singleton: true,
    alternateClassName: 'stoDatosPcl',

    //Funciones:

    newStore: function (camposPcl, params, cant) {
       
       
       return Ext.create('Ext.data.Store', {
           fields: camposPcl,
           method: 'POST',
            autoLoad: false,
            pageSize: cant,
            proxy: {
                type: 'ajax',
                actionMethods: 'POST',
                reader: {
                    method: 'post',
                    type: 'json',
                    root: 'rows',
                    totalProperty: 'total'
                    
                },
                url: WorkSpace.Url.Datos_Pcl,
                extraParams: params
            }
        });
      
    }


});