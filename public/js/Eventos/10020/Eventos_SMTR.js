SMTR = {
    
};

Eventos = {
    
    getLinkFilter:function(e){
        if (e.nemonicoLink == "IMSE"){
             var S1,S2,S3;
            if (e.nemonicoLink == "LCOMLG"){
                  S1 = e.record.get("ABSCISAI");
                  S2 = e.record.get("ABSCISAF");
                  S3 = SM.ExecFuncionEscalar("dbo.TraeWhereRango", ['ABSCISAI' , 'ABCISAFIN',S1,S2]); 
                  e.filtro = e.filtro + " And " + S3;             
            } 
         
        }
    },
   

    validateField:function(e){
        if(e.field.name == "TIPOTRAMO" || e.field.name == "CODGASODUCTO"){
            if(e.record.get("TIPOTRAMO") == "LINEA"){ 
                e.record.set("CODTRAMOPADRE","");
            };
        }
        
    },

    beforeSave:function(e){
        
        /*Si se va aguardar y el tipo tramo es secciones o variantes  debe ser requerido el campo CODTRAMOPADRE 
        y si el tipo tramo es linea no debe ser requerido coddtramopadre y debe ser nulo */

        if(e.record.get("TIPOTRAMO") != "LINEA" && e.record.get("CODTRAMOPADRE").length == 0){ 
            e.MensajeError =  "Esta creando una " +  e.record.get("TIPOTRAMO") + ". Debe asociarla a un tramo";       
            e.cancel = true;
        }

        if(e.record.get("TIPOTRAMO") == "LINEA" && e.record.get("CODTRAMOPADRE").length == 0){ 
            e.record.set("CODTRAMOPADRE","");
        }

        if(e.record.get("CODGASODUCTO").length == 0 || e.record.get("TIPOTRAMO").length == 0){ 
            e.record.set("CODTRAMOPADRE","");
        }
    },

    zoomConfigure:function(e){
        var Filtro;
        if(e.field.zoomRef    == "HLPPS0TRAMOS"){
            Filtro =  e.zoomFilter;

            /* Se valida el campo TIPOTRAMO. Solo se debe poder asociar los tramos tipo: secciones y variantes con los 
            ' tramos lineas.*/
        
                if(e.record.get("TIPOTRAMO").toUpperCase() == "SECCIONES" || e.record.get("TIPOTRAMO").toUpperCase() == "VARIANTE"){
                    e.zoomFilter = Filtro + " And TIPOTRAMO = 'LINEA' And CODTRAMO <> '" + e.record.get("CODTRAMO") + "'";
                }
                else{ 
                    e.zoomFilter = "1=2";
                }    
                
        }
    }

};

