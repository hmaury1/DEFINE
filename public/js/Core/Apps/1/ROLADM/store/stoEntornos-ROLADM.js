Ext.define('SmPlus.Apps.1.ROLADM.store.stoEntornos-ROLADM', {
    extend: 'Ext.data.Store',
    model: 'SmPlus.Apps.1.ROLADM.model.ModEntornos-ROLADM',
    autoLoad: true,

    /*sorters: [
        {
            property: 'IDUSUARIO2',
            direction: 'DESC'
        }
    ],*/
    proxy: {
        type: 'ajax',
        url: WorkSpace.ROLADM.url.ExecFunction,
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