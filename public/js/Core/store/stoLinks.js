Ext.define('SmPlus.store.stoLinks', {
    extend: 'Ext.data.Store',
    model: 'SmPlus.model.ModLink',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: WorkSpace.Url.Link_Pcl,
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            nemonico:''
        }
    }
});