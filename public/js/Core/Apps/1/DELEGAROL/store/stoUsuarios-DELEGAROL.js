Ext.define('SmPlus.Apps.1.DELEGAROL.store.stoUsuarios-DELEGAROL', {
    extend: 'Ext.data.Store',
    model: 'SmPlus.Apps.1.DELEGAROL.model.ModUsuarios-DELEGAROL',
    autoLoad: false,

    sorters: [
        {
            property: 'IDUSUARIO2',
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
            fn: "fn_getUsuariosAdmPlus",
            parametros: "[0]"
        }
    }
});