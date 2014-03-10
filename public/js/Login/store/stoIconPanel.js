Ext.define('Isecure.store.stoIconPanel', {
    extend:'Ext.data.Store',
    model: 'Isecure.model.ModIconPanel',
    autoLoad:true,
    proxy: {
        type: 'ajax',
        url: WorkSpace.Url.Login_Store_Iconos_Panel,
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});