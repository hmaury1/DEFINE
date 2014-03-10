Ext.define('SmPlus.Apps.1.ROLADM.store.stoRoles-ROLADM', {
    extend: 'Ext.data.Store',
    model: 'SmPlus.Apps.1.ROLADM.model.ModRoles-ROLADM',
    autoLoad: false,
    
    sorters: [
        {
            property: 'IDROL2',
            direction: 'DESC'
        }
    ],
    proxy: {
        type: 'ajax',
        url: WorkSpace.ROLADM.url.ExecFunction,
        reader: {
            type: 'json',
            root: 'rows'
        },
        extraParams: {
            fn: "fn_getOperacionRolesPlus",
            parametros: "[0,'@IDUSUARIO',0]"
        }
    }
});