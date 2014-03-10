Ext.define('SmPlus.Apps.1.ROLADM.store.stoOperaciones-ROLADM', {
    extend: 'Ext.data.Store',
    model: 'SmPlus.Apps.1.ROLADM.model.ModOperaciones-ROLADM',
    autoLoad: false,
   
    sorters : [
        {
            property: 'IDUSUARIO2',
            direction : 'DESC',
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
            fn: "fn_getRolesOperacionPlus",
            parametros: "[0,0,0]"
        }
    }
});