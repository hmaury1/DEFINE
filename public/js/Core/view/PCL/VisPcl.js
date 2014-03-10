Ext.define("SmPlus.view.PCL.VisPcl", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.vispcl',
    closable:true,
    layout: { type: 'border' },
    flex: 1,
    cantidadReg: 50,
    ModoEdicion: false,
    ModoEdicionLink:false,
    store: {},
    DatosInvalidos: [],
    initComponent: function () {
 
        me = this;
        
            if (me.opciones.icon != "") {
                //me.icon = me.opciones.icon;
                WorkSpace.AddIcon(me.opciones.icon, "sm-ico-" + me.nemonico);
                me.iconCls = "sm-ico-" + me.nemonico;
            } else {
                me.iconCls = 'icon-tabpcl';
            }
        
        //me.title = '<img src="' + me.opciones.icon + '"  height="16" width="16">' + me.opciones.titulo;
        me.title = me.opciones.titulo;
        

        var ocultaLink = false;
        if (this.claseTab) {
            tabCls = this.claseTab;
        } else {
            tabCls = 'vispcltabgrid';
        }

        if (me.isLink) ocultaLink = true;
        
        if (me.isZoom) { ocultaLink = true; me.closable = false; me.iconCls = ""; me.title = ''; };
        
        if (me.isDinamico) {  me.closable = false;};

        Ext.applyIf(me, {

            name : me.nemonico,
           
            items: [
            
               {
                   xtype: tabCls,
                   region:'center',
                   flex: 1,
                   name:'Pcl-contenido',
                   nemonico: me.nemonico,
                   personalizacion: me.opciones.personalizacion
                  
               }
            ]



        });


        me.callParent(arguments);
    }
   
});

