Ext.define('SmPlus.store.stoIconPanel', {
    extend:'Ext.data.Store',
    model: 'SmPlus.model.ModIconPanel',
    autoLoad:true,
    proxy: {
        type: 'ajax',
        url: WorkSpace.Url.Core_Store_Iconos_Panel,
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});