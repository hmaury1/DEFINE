DPRE = {
    
};

Eventos = {
    
    beforeCellEdit:function(e){
      if(e.name == "RUTAFOTOV" && (e.record.get("IDTIPODOC")+"").length==0){
        var xRuta = SM.ExecFuncionEscalar("dbo.RutaRaizTipoDoc", ["'"+e.record.get("IDTIPODOC")+"'"]);  
        var z = SM.ExecStoredProcedureEscalar("dbo.sp_dirArchivoExiste",["'"+xRuta+"'","'0'"]);
        if(z==1){	
        	var z=(Valor+"").length;
	        var y=e.Global.GetFileName(xRuta,"*.*"); 
	        if (y!=""){    
	            pos=y.indexOf("\\"); 
		        xruta=y.substring(pos,y.length);    
		        e.record.set("RUTAVIEW",xruta);
		        e.record.set("RUTAV",y);
	        } 
	    } else { 
	     	Ext.Msg.alert("Advertencia","Ruta Raiz del repositorio NO existe. Verifique"); 
	    }
      }
       
    }
};