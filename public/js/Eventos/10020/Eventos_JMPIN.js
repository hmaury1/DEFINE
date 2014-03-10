JMPIN = {
    
};

Eventos = {
    validateField:function(e){
		
		if(e.field.name == "VRUNIDAD" || e.field.name == "CANTIDAD"){
	       if ((e.record.get("CANTIDAD")+"").length != 0 && ((e.record.get("VRUNIDAD")+"").length != 0 )) {
	           e.record.set("VALOR",(e.record.get("VRUNIDAD") * e.record.get("CANTIDAD")));   
	       }
	    }
    }
};




