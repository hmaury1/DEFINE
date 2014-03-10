IMCR = {
    
};

Eventos = {
    
    getLinkFilter:function(e){
        if (e.record != null){
            if (e.nemonicoLink == "IMCR"){
                e.filtro = e.filtro.replace("NSOLDADURAAA =", " ");
                    e.filtro = e.filtro + "  Between NSoldaduraAA And NSoldaduraAB";
                    
            }
            
        }
    }
};