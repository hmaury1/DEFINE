IMVR = {
    
};

Eventos = {    
   getLinkFilter:function(e){
        if (e.nemonicoLink == "IMSE"){
            if (e.record != null){
                var LINEA = e.record.get("CODLINEA");
                var GASODUCTO = e.record.get("CODGASODUCTO");
                var Soldadura = e.record.get("NSOLDADURA");
                e.filtro = SM.ExecFuncionEscalar("dbo.PgLink_IMSE", ["'"+GASODUCTO+"'", "'"+LINEA+"'", Soldadura, 0]);  
                e.filtro = e.filtro + " And Estado = 'ACTIVO'";
            }
            
        }
    }
};
