Ext.define('SmPlus.store.stoAplicacion', {
    extend: 'Ext.data.Store',
    model: 'SmPlus.model.ModAplicacion',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        method: 'POST',
        url: WorkSpace.Url.Core_Store_Aplicaciones,
        reader: {
            type: 'json',
            root: 'aplicaciones'
        }
    }
});