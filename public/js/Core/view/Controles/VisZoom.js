Ext.define('SmPlus.view.Controles.VisZoom', {
    extend: 'Ext.form.field.Trigger',
    alias: 'widget.viszoom',
    triggerCls: 'x-form-search-trigger',
    //editable: false,
    marca: false,
    activeErrorsTpl: [
        '<tpl if="errors && errors.length">',
            '<ul class="{listCls}"><tpl for="errors"><li role="alert">{.}</li></tpl></ul>',
        '</tpl>'
    ],
    initComponent: function () {
        
       
        this.onTriggerClick = function () {
            if (!this.disabled) Main.getController('Controles.ConZoom').click(this);
        };

       /* this.validator = function (value) {
            if (!this.disabled) {
                if (this.inForm) Main.getController('Controles.ConZoom').complete(this, this.value, this.originalValue, null);
            }
        };*/
        
    }
    
    
   

    
});