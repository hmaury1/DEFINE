Ext.require('Isecure.model.ModMenuItem');
Ext.define('Isecure.store.stoMenu', {
    extend: 'Ext.data.TreeStore',
    autoLoad:false,
    model: 'Isecure.model.ModMenuItem',
    proxy: {
        type: 'ajax',
        url: WorkSpace.Url.Login_Store_Menu


    },
    root: {
        text: 'Inicio',

        id: '/',
        expanded: false
    },
    folderSort: true,
   /* sorters: [{
        property: 'text',
        direction: 'ASC'
    }]*/
});