PRESW = {
    
};

Eventos = {
    recordInsert:function(e){
     	var ahora = new Date();
        e.record.set("FECHAPRESTAMO", Ext.Date.format(ahora,"d-m-Y"));
     	Valor = SM.Cursor("C01PRESW"," IdDetEtc=43 ");           
        if(Ext.isNumeric(Valor)){
          y=Valor;
        } else { 
          y=1;  
        } 
        ahora.setDate(ahora.getDate() + y);
        e.record.set("FECHAENTREGA", Ext.Date.format(ahora,"d-m-Y"));
      
    },

    beforeCellEdit:function(e){
	    if(e.record.get("IDESTADOPRESTAMO")==22){ 
	      Ext.Msg.alert("Advertencia","Los Prestamos en Curso no pueden ser Modificados");
	      e.cancel = true;  
	    }

	},

	rowLoad: function(e){
		if((e.record.get("IDPRESTAMO")).length==0){ 
		 	var ahora = new Date();
         	e.record.set("FECHAPRESTAMO", Ext.Date.format(ahora,"d-m-Y"));
     	
		 	Valor = SM.Cursor("C01PRESW"," IdDetEtc=43 ");           
	        if(Ext.isNumeric(Valor)){
	          y=Valor;
	        } else { 
	          y=1;  
	        } 
        	ahora.setDate(ahora.getDate() + y);
        	e.record.set("FECHAENTREGA", Ext.Date.format(ahora,"d-m-Y"));
      		e.record.get("IDESTADOPRESTAMO",22);
			Valor2 = SM.Cursor("C01PRESW"," IdDetEtc=22 ");
			e.record.get("ESTADOPRESTAMOV",Valo2);
		}
      
    },

    validateField:function (e){
    	if(e.field.name=="FECHAPRESTAMO"){
    	   var FECHAPRESTAMO =  Ext.Date.parse(e.value, "d-m-Y");
           var ahora = new Date();
           if(FECHAPRESTAMO > ahora){
		     Ext.Msg.alert("Advertencia", "Fecha no puede ser Futura.Verifique"); 
		     e.record.set("FECHAPRESTAMO",Ext.Date.format(ahora,"d-m-Y"));
		   } else {
		     Valor = SM.Cursor("C01PRESW"," IdDetEtc=43 ");           
	        if(Ext.isNumeric(Valor)){
	          y=Valor;
	        } else { 
	          y=1;  
	        } 
	        FECHAPRESTAMO.setDate(FECHAPRESTAMO.getDate() + y);
		    e.record.set("FECHAENTREGA", Ext.Date.format(FECHAPRESTAMO,"d-m-Y"));
		   }
		  
		}

		if(e.field.name=="FECHAENTREGA"){
    	   var FECHAENTREGA =  Ext.Date.parse(e.value, "d-m-Y");
    	   var FECHAPRESTAMO =  Ext.Date.parse(e.record.get("FECHAPRESTAMO"), "d-m-Y");
           var ahora = new Date();
           if(FECHAPRESTAMO < FECHAPRESTAMO){
		     	Ext.Msg.alert("Advertencia", "La Fecha de entrega no debe ser inferior a la fecha del Prestamo.Verifique"); 
		    
			    Valor = SM.Cursor("C01PRESW"," IdDetEtc=43 ");           
		        if(Ext.isNumeric(Valor)){
		          y=Valor;
		        } else { 
		          y=1;  
		        } 
		        FECHAPRESTAMO.setDate(FECHAPRESTAMO.getDate() + y);
			    e.record.set("FECHAENTREGA", Ext.Date.format(FECHAPRESTAMO,"d-m-Y"));
		   }
		  
		}
		
		 if(e.field.name ="ESTADOPRESTAMOV" ){ 
		    
		    IDESTADOPREST = e.record.get("IDESTADOPRESTAMO");
		    //MsgBox(IDESTADOPREST)
		    //VERIFICAR QUE HAYAN PLANOS SELECCIONADOS
		    //xsq1="Select count(*) As NReg From Prestamos p, DetPrestamo d Where "
		    //xsq2="P.IDPRESTAMO=d.IDPRESTAMO And p.IDPRESTAMO="+e.record.get("IDPRESTAMO")
		    NReg = SM.Cursor("C03PRESW"," P.IDPRESTAMO=d.IDPRESTAMO And p.IDPRESTAMO="+e.record.get("IDPRESTAMO"));
		   
		    if(NReg==0){
		       Ext.Msg.alert("Advertencia", "No hay planos asignados a este prestamo.Verifique",48,"Advertencia" 
		       e.record.Set("IDESTADOPRESTAMO",22); 
		       Valor = SM.Cursor("C01PRESW"," IdDetEtc=22 ");           
		       e.value = Valor;
		    } 
		} else {   
		    NReg = SM.Cursor("C03PRESW"," P.IDPRESTAMO=d.IDPRESTAMO And p.IDPRESTAMO="+e.record.get("IDPRESTAMO"));
	    	if(NReg!=0){
	             Ext.Msg.alert("Advertencia", "Hay planos pendientes de  entrega.Verifique",48,"Advertencia" 
	             e.record.set("IDESTADOPRESTAMO",2);
	             Valor = SM.Cursor("C01PRESW"," IdDetEtc=22 ");      
	             e.record.set("ESTADOPRESTAMOV",Valor);
	        } else { 
	           e.record.set("FECHAENTREGA",Ext.Date.format(new Date(),"d-m-Y"));
	        } 
		} 
    }


};