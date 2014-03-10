LEDU = {
    
};

Eventos = {

    validateField:function(e){
    
        if(e.field.name=="IDTIPOPOBLACION") { 
            
            if(e.value==1) { 
                /*municipios*/  
                
                /*SetCellColor 1,Row,"MUNICIPIOC",1
                SetCellColor 1,Row,"DEPARTAMENTOC",1*/

                e.record.set("IDCOMUNIDAD", "");
                e.record.set("COMUNIDADC", "");

                /*SetCellColor 1,Row,"IDCOMUNIDAD",3        
                SetCellColor 1,Row,"COMUNIDADC",3*/

                e.record.set("IDCONSTRUCCION", "");
                e.record.set("CODIGOC", "");
                
                /*SetCellColor 1,Row,"IDCONSTRUCCION",3        
                SetCellColor 1,Row,"CODIGOC",3*/

            }

            if(e.value=2) { 
                /*comunidades*/
            
                /*SetCellColor 1,Row,"IDCOMUNIDAD",1
                SetCellColor 1,Row,"COMUNIDADC",1*/

                e.record.set("MUNICIPIO", "");
                e.record.set("DEPARTAMENTO", "");
                e.record.set("MUNICIPIOC", "");
                e.record.set("DEPARTAMENTOC", "");
                /*
                SetCellColor 1,Row,"MUNICIPIOC",3
                SetCellColor 1,Row,"DEPARTAMENTOC",3  
                */

                e.record.set("IDCONSTRUCCION", "");
                e.record.set("CODIGOC", "");
                /*
                SetCellColor 1,Row,"IDCONSTRUCCION",3        
                SetCellColor 1,Row,"CODIGOC",3
                */

            }

            if(e.value=3) { 
                /*construcciones*/
                
                /*SetCellColor 1,Row,"IDCONSTRUCCION",1        
                SetCellColor 1,Row,"CODIGOC",1*/

            
                e.record.set("MUNICIPIO", "");
                e.record.set("DEPARTAMENTO", "");
                e.record.set("MUNICIPIOC", "");
                e.record.set("DEPARTAMENTOC", "");

                /*SetCellColor 1,Row,"MUNICIPIOC",3
                SetCellColor 1,Row,"DEPARTAMENTOC",3*/ 

                e.record.set("IDCONSTRUCCION", "");
                e.record.set("CODIGOC", "");
                /*SetCellColor 1,Row,"COMUNIDADC",3
                SetCellColor 1,Row,"IDCOMUNIDAD",3*/       

            }

        }  
       

    },

       
    
    beforeCellEdit:function(e){

            /*cancela edicion sobre municipios*/
            if((e.name=="MUNICIPIOC"){ 
                 if((e.record.get("IDTIPOPOBLACION")!= 1) {
                    e.cancel=1 
                 }             
            }    
            /*cancela edicion sobre comunidades*/
            if((e.name=="COMUNIDADC"){ 
                 if((e.record.get("IDTIPOPOBLACION")!= 2) {
                    e.cancel=1 
                 }             
            } 
            /*cancela edicion sobre construcciones*/
            if((e.name=="CODIGOC"){ 
                 if((e.record.get("IDTIPOPOBLACION")!= 3) {
                    e.cancel=1 
                 }             
            } 
    }

};