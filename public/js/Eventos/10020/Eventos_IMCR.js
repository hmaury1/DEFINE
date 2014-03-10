IMCR = {
    
};

Eventos = {
    
    getLinkFilter:function(e){
        if (e.nemonicoLink == "IMSE"){
            if (e.record != null){
                var LINEA = e.record.get("CODLINEA");
                var GASODUCTO = e.record.get("CODGASODUCTO");
                var Soldadura = e.record.get("NSOLDADURAAA");
                var SoldaduraAB = e.record.get("NSOLDADURAAB");

                e.filtro = SM.ExecFuncionEscalar("dbo.PgLink_IMSE", ["'"+GASODUCTO+"'", "'"+LINEA+"'", Soldadura, SoldaduraAB]);  
                e.filtro = " AND "+ e.filtro + " AND ESTADO = 'ACTIVO'";
            }
            
        }
    },

    beforeCellEdit:function(e){
         
          var Sarri; 
          var Sabaj;
          var Clinea; 
          switch (e.name){
  
            case "NSOLDADURAAB":
                if(e.record.get("NSOLDADURAAA") == "") e.record.set("NSOLDADURAAA", 0);
                if(e.record.get(e.name) == "") e.record.set(e.name,"0");                                
                //aqui se calculara la longitud
                Clinea = e.record.get("CODLINEA");                
                Sarri = SM.Cursor ("C01IMCR", " CODLINEA = '" + Clinea + "' And Nsoldadura = " + e.record.get("NSOLDADURAAA"));                
                Sabaj = SM.Cursor ("C01IMCR", " CODLINEA = '" + Clinea + "' And Nsoldadura = " + e.record.get(e.name));                
                e.record.set("LONGCAMBIADA",Sabaj - Sarri);
                break;

            case "NSOLDADURAAA":
                if(e.record.get("NSOLDADURAAB") == "") e.record.set("NSOLDADURAAB", 0);
                if(e.record.get(e.name) == "") e.record.set(e.name,"0");
                Clinea = e.record.get("CODLINEA");
                Sarri = SM.Cursor ("C01IMCR", " CODLINEA = '" + Clinea + "' And Nsoldadura = " + e.record.get(e.name));
                Sabaj = SM.Cursor ("C01IMCR", " CODLINEA = '" + Clinea + "' And Nsoldadura = " + e.record.get("NSOLDADURAAB"));               
                e.record.set("LONGCAMBIADA",Sabaj - Sarri);
                break;
        }
       
    }
};

