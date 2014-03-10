Ext.define('SmPlus.view.Core.VisContextMenu', {
    extend: 'Ext.menu.Menu',
    name:'menuArbol',
    alias:'widget.viscontextmenu',
    //width: 100,
    panel:false,
    initComponent: function () {
 
        me = this;
        
        Ext.applyIf(me, {  
        items: [{
                text: "Crear acceso Directo",
                record:me.record,
                iconCls: 'icon-ok',
                hidden:me.panel,
                action: 'clickAdirecto'
        }, {
            text: "Eliminar acceso Directo",
            record: me.record,
            iconCls: 'icon-delete',
            hidden:!me.panel,
            action: 'clickDdirecto'
        }] 
        });
           
        me.callParent(arguments);
    }


});