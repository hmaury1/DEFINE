Ext.define('SmPlus.view.Controles.VisSmText', {
    extend: 'Ext.form.field.Trigger',
    alias: 'widget.vissmtext',
    initComponent: function () {
        var me = this;
        me.triggerCls = 'x-form-clear-trigger'; // native ExtJS class & icon
        me.callParent(arguments);

    },
   
    onTriggerClick: function (me) {
        Main.getController('Controles.ConSmText').DesplegarVentanaLongText(this);
    }

   
    

});