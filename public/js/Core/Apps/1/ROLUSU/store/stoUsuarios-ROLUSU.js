Ext.define('SmPlus.Apps.1.ROLUSU.store.stoUsuarios-ROLUSU', {
    extend: 'Ext.data.Store',
    model: 'SmPlus.Apps.1.ROLUSU.model.ModUsuarios-ROLUSU',
    autoLoad: false,
   
    sorters : [
        {
            property: 'IDUSUARIO2',
            direction : 'DESC'
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
            fn: "fn_getUsuariosPlus",
            parametros: "[0,'@IDUSUARIO',0]"
        }
    }
});