Ext.define('SmPlus.Apps.1.ROLADM.store.StoGrupoRoles-ROLADM', {
    extend:'Ext.data.Store',
    model: 'SmPlus.Apps.1.ROLADM.model.ModGrupoRoles-ROLADM',
    autoLoad:true,
    proxy: {
        type: 'ajax',
        url: '/Menu/PanelControl',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});