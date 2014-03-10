ETC2 = {
    ControlAcceso:function(e){
      var resp = SM.SmExecStoredProcedureEscalar("dbo.TieneAcceso",["'@USUARIO'","'"+e.name+"'", "'PLA'"]);
      if(resp=="N"){
       Ext.Msg.alert("Advertencia","Ud. No tiene Acceso a modificar este campo"); 
       e.cancel=true;
      } 
    }
};

Eventos = {
    beforeCellEdit:function(e){
    	e.Global.ControlAcceso(e);
    }
};
