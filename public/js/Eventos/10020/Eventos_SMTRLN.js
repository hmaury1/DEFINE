SMTRLN = {
    
};

Eventos = {
    
    getLinkFilter:function(e){
        if (e.nemonicoLink == "IMSE"){
             var S1,S2,S3;
            if (e.nemonicoLink == "SMCL"){
                  S1 = e.record.get("ABSCISAI");
                  S2 = e.record.get("ABSCISAF");
                  S3 = SM.ExecFuncionEscalar("dbo.TraeWhereRango", ['ABSCISAI' , 'ABSCISAF',S1,S2]); 
                  e.filtro = e.filtro + " And " + S3;             
            } 
         
        }
    }
 }

