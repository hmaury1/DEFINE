Ext.define('Isecure.store.stoAplicacion', {
    extend: 'Ext.data.Store',
    model: 'Isecure.model.ModAplicacion',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        method: 'POST',
        url: WorkSpace.Url.Login_Store_Aplicaciones,
        reader: {
            type: 'json',
            root: 'aplicaciones'
        }
    }
});