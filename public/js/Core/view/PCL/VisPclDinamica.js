Ext.define("SmPlus.view.PCL.VisPclDinamica", {// ESTA vista siempre tendra un item vispcl, pero no es una pcl para acceder a la pcl deben usar down('vispcl')
    extend: 'Ext.panel.Panel',
    alias: 'widget.vispcldinamica',
    layout: {
        type:'border'
    }
   /* initComponent: function () {

        Main.getController('Core.ConOpcion').opcion(3, me.nemonico, "", me);
        

        me.callParent(arguments);
    }*/

});

