Ext.define("SmPlus.store.stoEjesGraficas", {
    singleton: true,
    alternateClassName: 'stoEjesGraficas',

    //Funciones:

    newStore: function (camposPcl, data) {


        return Ext.create('Ext.data.Store', {
            fields: camposPcl,
            data: data,
            autoDestroy: true,
        });

    }


});