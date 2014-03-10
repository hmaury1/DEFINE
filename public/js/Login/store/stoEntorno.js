Ext.define('Isecure.store.stoEntorno', {
    extend: 'Ext.data.Store',
    model: 'Isecure.model.ModEntorno',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        method: 'POST',
        url: WorkSpace.Url.Login_Store_Entornos,
        reader: {
            type: 'json',
            root: 'entornos'
        }
    }
});