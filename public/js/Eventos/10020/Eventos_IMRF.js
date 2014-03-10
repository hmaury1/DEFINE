IMRF = {
    
};

Eventos = {
    
    getLinkFilter:function(e){
    	if (e.record != null){
	        if (e.nemonicoLink == "SMPL"){
	                e.filtro = e.filtro.replace("CODELEMENTO =", "CODELEMENTO='");
	                e.filtro = e.filtro + "' And Estado = 'ACTIVO'";
	                e.filtro = e.filtro + "' And TIPOELEMENTO = 'REFUE'";
	        }

	        if (e.nemonicoLink == "IMSE"){
                var LINEA = e.record.get("CODLINEA");
                var GASODUCTO = e.record.get("CODGASODUCTO");
                var Soldadura = e.record.get("NSOLDADURA");
                e.filtro = SM.ExecFuncionEscalar("dbo.PgLink_IMSE", ["'"+GASODUCTO+"'", "'"+LINEA+"'", Soldadura, 0]);  
                e.filtro = e.filtro + " And Estado = 'ACTIVO'";
        	}
		}

    }
};
