USU = {
    
};

Eventos = {
	beforeCellEdit:function(e){
		if(e.name=="NOMBRES"){
			e.record.set("IDTIPOUSUARIO", 75);
			e.cancel = true;
		}
	    if(e.name=="NOMBRES"){
			e.record.set("IDTIPOUSUARIO", 76);
			e.cancel = true;
		}
	},

	beforeSave:function(e){
		if(e.record.get("IDTIPOUSUARIO")=="76"){ 
		    if(e.record.get("NOMBRES")=="" || e.record.get("APELLIDOS")==""){ 
		      Ext.Msg.alert("Advertencia", "NOMBRES y APELLIDOS deben ser ingresados.Verifique");
		      e.cancel = true;
		    }
		  }
		if(e.record.get("IDTIPOUSUARIO")=="75"){ 
		    if(e.record.get("RAZONSOCIAL")="" ){ 
		      Ext.Msg.alert("Advertencia", "Razon Social debe ser ingresada.Verifique");
		      e.cancel = true;
		    }
		}  
    
  },

};