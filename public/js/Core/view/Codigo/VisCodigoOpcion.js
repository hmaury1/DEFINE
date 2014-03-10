Ext.define("SmPlus.view.Codigo.VisCodigoOpcion", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.viscodigoopcion',
    closable: true,
    layout: { type: 'border' },
    //flex: 1,
    iconCls: 'icon-tabpcl',
   // store: {},
    initComponent: function () {
        me = this;
      
        Ext.applyIf(me, {

            name: me.nemonico,
            aplicacion:me.aplicacion
        });


        me.callParent(arguments);
    }

});

