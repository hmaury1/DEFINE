/*
*
 este archivo es necesario para cargar una app mvc dinamicamente, no crea un nueva aplicacion solo un modulo de nuevo para smplus 
 
 !!!! tener ciudado con las palabras reservadas y los widget existentes en memoria,
 !!!! desde una opcion se puede tener total control de smplus

 Main -> hace referancia al controlador principal de smplus
 nuevaAplicacion -> permite cargar clases MVC dinamicamete
 creado por hmaury 23/febrero/2013
*
*
*/

Ext.define("SmPlus.Apps.1.ROLADM.app", {
    singleton: true,

    init: function () {


        WorkSpace['ROLADM'] = {
            vistas: {

            },
            url: {
                ExecFunction: '/SM/ExecFunction',
                ExecStoredProcedure: '/SM/ExecStoredProcedure'
            }
        };

        Main.nuevaAplicacion({

            app: '1',

            name: 'ROLADM',

            controllers: ['ConPrincipal-ROLADM']

        });



    }

});














