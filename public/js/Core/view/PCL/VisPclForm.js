Ext.define("SmPlus.view.PCL.VisPclForm", {
    extend: 'Ext.window.Window',
    alias: 'widget.vispclform',
    //closable: true,
    layout: { type: 'border' },
    flex: 1,
    iconCls: 'icon-form',
    //autoScroll: true,
    height: 500,
    width: 430,
    modal: true,
    frame: true,
    aceptar: function () { },
    cancelar: function () { },
    plain: true,
    Action:1,
    LoadRecordFormEnProceso:false,
    initComponent: function () {
        var swOculto = true;
        me = this;
        if (me.Action == 0) {
            var swOculto = false;
        }
        Ext.applyIf(me, {
            
        });
        
     
        
        me.callParent(arguments);
    }
});