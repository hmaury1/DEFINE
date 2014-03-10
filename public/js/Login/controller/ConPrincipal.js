Ext.define('Isecure.controller.ConPrincipal', {
    extend: 'Ext.app.Controller',
    
    views: ['Core.VisLogin', 'Core.VisPrincipal', 'Core.VisAutorizacion', 'Core.VisConexiones', 'Core.VisContrasena'],
    stores: ['stoEntorno', 'stoAplicacion', 'stoConexion'],

    init: function () {
        //document.getElementById('Idbody').innerHTML="";
        //la siguiete intruccion deshabilitar el menu contextual del navegador:
        
        Ext.getBody().on("contextmenu", Ext.emptyFn, null, { preventDefault: true });
        /*document.onkeydown = document.onkeypress = function (evt) {
            
            // if a popup window has focus, don't process backspace here
            var activeWnd = Ext.WindowMgr.getActive();
            

            if (typeof evt == 'undefined') {
                evt = window.event;
            }
            if (evt) {
                var keyCode = evt.keyCode ? evt.keyCode : evt.charCode;


                if (keyCode == 8) {
                    //console.log(evt);
                    if (evt.srcElement.nodeName == "TEXTAREA" || evt.srcElement.nodeName == "INPUT" || evt.srcElement.nodeName == "COMBOBOX" || evt.srcElement.nodeName == "TEXTFIELD") {
                        if (evt.srcElement.readOnly == false) {
                            // console.log(' returning true');
                            return true;
                        } else {
                            //console.log(' returning false');
                            return false;
                        }
                    } else {
                        //console.log(' returning false');
                        return false;
                    }



                } else {
                    //console.log(' returning true 1');
                    return true;
                }
            } else {
                //console.log(' returning true 2');
                return true;
            }
        };
        */
        Main = this;
        //se cargan las utilidades:
       // Ext.require('Isecure.utilidades.UtiOpciones');
       
        this.IniciarVariables();

    

        
        
        this.control({
           

    });
    },

    IniciarVariables: function (sesion,params) {
        
       document.getElementById('Idbody').innerHTML = "";
      
    
       WorkSpace['Vistas']['VisPrincipal'] = Ext.widget('visprincipal');
       WorkSpace['Vistas']['Vislogin'] = Ext.widget('vislogin');
       WorkSpace['Vistas']['Visautorizacion'] = Ext.widget('visautorizacion');
       
       WorkSpace.Vistas.Vislogin.show();
       WorkSpace.Vistas.Vislogin.down('textfield[name=usuario]').focus(false,100);
       
    }

    

  

   


});