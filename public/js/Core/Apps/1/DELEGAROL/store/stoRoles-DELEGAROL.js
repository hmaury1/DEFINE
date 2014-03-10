Ext.define('SmPlus.Apps.1.DELEGAROL.store.stoRoles-DELEGAROL', {
    extend: 'Ext.data.Store',
    model: 'SmPlus.Apps.1.DELEGAROL.model.ModRoles-DELEGAROL',
    autoLoad: true,
   // groupField: 'APLICACION',
    sorters: [
        {
            property: 'IDROLUSUARIO',
            direction: 'DESC'
        }
    ],
    proxy: {
        type: 'ajax',
        url: WorkSpace.DELEGAROL.url.ExecFunction,
        reader: {
            type: 'json',
            root: 'rows'
        },
        extraParams: {
            fn: "fn_getDelegacionRoles",
            parametros: "[0,0]"
        }
    }
});