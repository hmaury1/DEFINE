Ext.define('SmPlus.store.stoCriterio', {
    extend: 'Ext.data.Store',
    model: 'SmPlus.model.ModCriterio',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: WorkSpace.Url.Campos_QBE,
        reader: {
            type: 'json',
            root: 'consultas'
        },
        extraParams: {
            nemonico: '',
            tipo: ''
        }
    }
});