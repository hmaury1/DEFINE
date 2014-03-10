Ext.define('SmPlus.controller.Codigo.ConCodigoOpcion', {
    extend: 'Ext.app.Controller',

    init: function () {

    },

    AbrirCodigoOpcion:function(opcion,nemonico){

        this.loadjsfile(opcion.aplicacion, nemonico);

    },

    loadjsfile:function(aplicacion,nemonico){
         
        /*     var fileref=document.createElement('script')
             fileref.setAttribute("type", "text/javascript");
             fileref.setAttribute("src", "../../js/Core/Apps/" + aplicacion + "/" + nemonico + "/app.js");
         
         if (typeof fileref != "undefined") {
             document.getElementsByTagName("head")[0].appendChild(fileref)
         }*/

        Ext.require("SmPlus.Apps." + aplicacion + "." + nemonico + ".app", function () {

            SmPlus.Apps[aplicacion][nemonico].app.init();
        });
       

    }



});