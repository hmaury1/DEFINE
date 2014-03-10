Ext.define('SmPlus.controller.Controles.ConSmText', {
    extend: 'Ext.app.Controller',

    init: function () {

        this.control({

        });

    },

    DesplegarVentanaLongText: function (el) {
        var me = this;
        Ext.MessageBox.show({
            title: el.fieldLabel,
            msg: '',
            width: 400,
            buttons: Ext.MessageBox.OKCANCEL,
            buttonText: {
                ok: WorkSpace.Label.Boton_Aceptar,
                cancel: WorkSpace.Label.Boton_Cancelar
            },
            multiline: true,
            defaultTextHeight: 150,
            scope: this,
            fn: function (btn, text) {
                if (btn == 'ok') {

                    if (typeof el.nemonico != 'undefined') {
                        Ext.ComponentQuery.query('vispcltabgrid[nemonico=' + el.nemonico + ']')[0].getActiveTab().getSelectionModel().getSelection()[0].set(el.name, text);
                    } else {
                        el.setValue(text);
                    }
                }
            },
            value: el.getValue()

        });
    }

});