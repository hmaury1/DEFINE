Ext.require('SmPlus.model.ModMenuItem');
Ext.define('SmPlus.store.stoMenu', {
    extend: 'Ext.data.TreeStore',
    autoLoad:false,
    model: 'SmPlus.model.ModMenuItem',
    proxy: {
        type: 'ajax',
        url:WorkSpace.Url.Core_Store_Menu,
        reader: {
            type: 'json',
            root: 'data'
        }

    },
    root: {
        text: 'Inicio',

        id: '/',
        expanded: false
    },
    folderSort: true
    
  
});