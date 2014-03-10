RCPLANOS = {
    
};

Eventos = {
    
    recordInsert:function(e){
     	e.record.set("IDESTADORCPLANO", 61);
        var Valor = SM.Cursor("C01PRESW"," IdDetEtc=61 ");    
        e.record.set("ESTADORCPLANOV", Valor);
	},

	beforeCellEdit:function(e){
		if(e.name=="ESTADORCPLANOV"){
			e.record.set("IDESTADORCPLANO", 61);
			var Valor = SM.Cursor("C01PRESW"," IdDetEtc=61 ");    
        	e.record.set("ESTADORCPLANOV", Valor);
		}
	    
	}

};