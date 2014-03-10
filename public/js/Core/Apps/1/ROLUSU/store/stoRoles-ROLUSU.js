Ext.define('SmPlus.Apps.1.ROLUSU.store.stoRoles-ROLUSU', {
    extend: 'Ext.data.Store',
    model: 'SmPlus.Apps.1.ROLUSU.model.ModRoles-ROLUSU',
    autoLoad: false,
    
    sorters: [
        {
            property: 'IDROL2',
            direction: 'DESC'
        }
    ],
    proxy: {
        type: 'ajax',
        url: WorkSpace.ROLUSU.url.ExecFunction,
        reader: {
            type: 'json',
            root: 'rows'
        },
        extraParams: {
            fn: "fn_getRolesAdmPlus",
            parametros: "[0,'@IDUSUARIO',0]"
        }
    }
});