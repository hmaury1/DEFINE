Ext.define('SmPlus.view.QBE.VisHelpQbe', {
    extend: 'Ext.form.field.Trigger',
    alias: 'widget.vishelpqbe',

    triggerCls: Ext.baseCSSPrefix + 'form-search-trigger',
    autoWidth: true,
    isLoaded: false,

    initComponent: function () {

        var me = this;
        me.triggerCls = 'x-form-help-trigger';
       // me.createHelpWindow(me);

        this.callParent(arguments);

    },

    onTriggerClick: function () {

        Main.getController('QBE.ConHelpQBE').showWindow(this);
    }

});


