Ext.define('SmPlus.Apps.1.ROLUSU.store.stoAplicaciones-ROLUSU', {
    extend: 'Ext.data.Store',
    model: 'SmPlus.Apps.1.ROLUSU.model.ModAplicaciones-ROLUSU',
    autoLoad: true,

    /*sorters: [
        {
            property: 'IDUSUARIO2',
            direction: 'DESC'
        }
    ],*/
    proxy: {
        type: 'ajax',
        url: WorkSpace.ROLUSU.url.ExecFunction,
        reader: {
            type: 'json',
            root: 'rows'
        },
        extraParams: {
            fn: "fn_getAplicacionesPlus",
            parametros: "['@IDUSUARIO']"
        }
    }
});