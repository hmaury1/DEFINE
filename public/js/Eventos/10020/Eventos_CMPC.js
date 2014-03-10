CMPC = {
    
};

Eventos = {
    
    getLinkFilter:function(e){
    	if (e.record != null){
    		if (e.nemonicoLink == "SMPL" || e.nemonico == "SMPL1"){
    			e.filtro = e.filtro + " And CODELEMENTO = '" + e.record.get("CODUPC") + "' ";	
    		}
    		
    	}
    }
};