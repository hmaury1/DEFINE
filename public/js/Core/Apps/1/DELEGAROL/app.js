Ext.define("SmPlus.Apps.1.DELEGAROL.app", {
    singleton: true,

    init: function () {


        WorkSpace['DELEGAROL'] = {
            vistas: {

            },
            url: {
                ExecFunction: '/SM/ExecFunction',
                ExecStoredProcedure: '/SM/ExecStoredProcedure'
            }
        };

        Main.nuevaAplicacion({

            app: '1',

            name: 'DELEGAROL',

            controllers: ['ConPrincipal-DELEGAROL']

        });



    }

});














