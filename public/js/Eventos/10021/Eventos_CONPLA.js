CONPLA = {
    
};

Eventos = {
    dblClick:function(e){
      
        if((e.record.get("IDESTADOCAD")== 7 ||  e.record.get("IDESTADOCAD") == 8 ||  e.record.get("IDESTADOCAD") == 9) && e.record.get("IDMEDIO") != 19){ 
       
          var Resp = SM.ExecStoredProcedureEscalar("dbo.EstaEnListas", [ "'@USUARIO'","'"+e.record.get("IDPLANO")+"'"]);
         if( Resp!="S"){
            Ext.Msg.alert("Advertencia","Ud. No tiene Acceso a este plano");
            e.cancel=true; 
          }else{
            Ruta = SM.Cursor("C01CONPLA", "IDPLANO='"+e.record.get("IDPLANO")+"'");
            if( e.record.get("IDESTADOVER")=12 ){ 
                alert("Este plano está en proceso de edición");
            }
            Ext.MessageBox.show({
                 title:'Confirmación',
                 msg: 'Despues de consultar, imprimirá este plano?',
                 buttons: Ext.MessageBox.YESNO,
                 fn: function(btn){
                    var Oper = btn == 'yes'? "34":"38";                   
                    SM.ExecStoredProcedure("BitacoraPlanos",["'"+e.record.get("IDPLANO")+"'","'"+Oper+"'", "'@USUARIO'","'@TERMINAL'"]);
                    SM.ShowFile(Ruta);
                 }        
             });
              
          }
        }else{ 
          Ext.Msg.alert("Advertencia","Plano no disponible o es solamente impreso")
        }
    }
};
