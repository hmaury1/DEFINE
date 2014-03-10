LMTU = {
    
};

Eventos = {
    
    getLinkFilter:function(e){
        if (e.record != null){
            if (e.nemonicoLink == "IMCR"){
                if(e.record.get("CODLINEA").length > 0){
                    e.filtro = e.filtro + " AND " + e.record.get("NSOLDADURA") + " Between NSoldaduraAA And NSoldaduraAB";
                }                
            } 
        }
    }
}