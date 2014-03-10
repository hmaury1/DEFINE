Ext.define('Isecure.store.stoConexion', {
    extend: 'Ext.data.Store',
    model: 'Isecure.model.ModConexion',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        method: 'POST',
        url: WorkSpace.Url.Login_Store_Conexiones,
        reader: {
            type: 'json',
            root: 'aplicaciones'
        }
    }
});