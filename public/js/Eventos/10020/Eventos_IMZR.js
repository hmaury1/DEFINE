IMZR = {
	
};

Eventos = {    
   getLinkFilter:function(e){
		if (e.record != null){
		  var S1, S2 , S3;

			if(e.nemonicoLink == "IMDF") {
				alert(e.filtro);
		   	} 

			if(e.nemonicoLink == "LCOMLG") {
				S1 = e.record.get("ABSCISAI");
				S2 = e.record.get("ABSCISAF");
				S3 = SM.ExecFuncionEscalar("dbo.TraeWhereRango", ['ABCISAINI' , 'ABCISAFIN',S1,S2]);
		/*
				' -------------------------------------------------------------------------------------------
				'    si el codigo de linea esta vacio se debe cambiar el filtro en ves de linea por gasoducto
				' -------------------------------------------------------------------------------------------
		*/  
				if (e.record.get("CODLINEAGIS").length = 0) {
				 	e.filtro = "CODGASODUCTO = '" + e.record.get("CODGASODUCTO") + "'";
				}      
				
				e.filtro += " And " + S3;

				
			}    

			if (e.nemonicoLink == "SMPP" || e.nemonicoLink == "SMCL") {

			   	S1 = e.record.get("ABSCISAI");
				S2 = e.record.get("ABSCISAF");
				S3 = SM.ExecFuncionEscalar("dbo.TraeWhereRango", ['ABCISAI' , 'ABCISAF',S1,S2]);	   

		/*
				' -------------------------------------------------------------------------------------------
				'    si el codigo de linea esta vacio se debe cambiar el filtro en ves de linea por gasoducto
				' -------------------------------------------------------------------------------------------
		*/

				if (e.record.get("CODLINEAGIS").length = 0) {
				 	e.filtro = "CODGASODUCTO = '" + e.record.get("CODGASODUCTO") + "'";
				}      
					e.filtro += " And " + S3;
			}	
		}
	}
};
