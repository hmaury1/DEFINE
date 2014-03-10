Ext.define('SmPlus.store.stoEntorno', {
    extend: 'Ext.data.Store',
    model: 'SmPlus.model.ModEntorno',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        method: 'POST',
        url: WorkSpace.Url.Core_Store_Entornos,
        reader: {
            type: 'json',
            root: 'entornos'
        }
    }
});