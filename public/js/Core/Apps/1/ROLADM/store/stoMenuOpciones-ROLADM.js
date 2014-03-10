Ext.require('SmPlus.Apps.1.ROLADM.model.ModMenuOpciones-ROLADM');
Ext.define('SmPlus.Apps.1.ROLADM.store.stoMenuOpciones-ROLADM', {
    extend: 'Ext.data.TreeStore',
    autoLoad: false,
    model: 'SmPlus.Apps.1.ROLADM.model.ModMenuOpciones-ROLADM',
    proxy: {
        type: 'ajax',
        url: WorkSpace.Url.Core_Store_Menu,
        extraParams:{
         IdAplicacion:0
        }

    },
    root: {
        text: 'Inicio',
       
        id: '/',
        expanded: false
    },
    folderSort: true,
    /*listeners: {
        'load': function (el, node, records, successful, eOpts) {
            Main.getController('Core.ConMenu').onLoad(el, node, records, successful, eOpts);
        }
    }*/

});