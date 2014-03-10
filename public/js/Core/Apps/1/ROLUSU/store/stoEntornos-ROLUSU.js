Ext.define('SmPlus.Apps.1.ROLUSU.store.stoEntornos-ROLUSU', {
    extend: 'Ext.data.Store',
    model: 'SmPlus.Apps.1.ROLUSU.model.ModEntornos-ROLUSU',
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
            fn: "fn_getEntornosPlus",
            parametros: "['@IDUSUARIO',0]"
        }
    }
});