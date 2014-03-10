SMACCO = {
    
};

Eventos = {
    validateField:function(e){
    	
    	if(e.field.name == "ELEMASOCIADO" ){
	    	if(e.record.get("ELEMASOCIADO") == "ACTUADOR"){ 
	    		e.record.set("CODVALVULACONTROL","");
	    	};

	    	if(e.record.get("ELEMASOCIADO") == "VALVULA DE CONTROL"){ 
	    		e.record.set("CODACTUA","");
	    	};
    	}
    	
    }
};
