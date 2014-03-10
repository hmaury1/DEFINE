SMEM = {
    
};

Eventos = {
    
    getLinkFilter:function(e){
        if (e.record != null){
          
            var sAux = e.filtro;
            var sAuxt = e.filtro; 
            
            if( e.nemonicoLink == "SMET" ){
                e.filtro = e.filtro + " Or CodEstacion In ( Select CodElemento";
                e.filtro = e.filtro + " From ps0Compartidos Where TipoElemento = 'ESTAC' And " + sAux + ")";
                e.filtro = e.filtro  + " And ESTADO = 'ACTIVO'";
            
            }

             if( e.nemonicoLink == "SMVA" ){
               
                sAuxt = e.filtro.substring(e.filtro.indexOf("'")); 

                e.filtro = "CodEstacion In ( Select codestacion ";
                e.filtro = e.filtro + " From ps0estaciones Where CodMacroEstacion = " + sAuxt + ")";
            
            }

             if( e.nemonicoLink == "SMHT" ){
                sAuxt = e.filtro.substring(e.filtro.indexOf("'")); 

                e.filtro = "CodEstacion In ( Select codestacion ";
                e.filtro = e.filtro + " From ps0estaciones Where CodMacroEstacion = " + sAuxt + ")";
            
            }

             if( e.nemonicoLink == "SMME" ){
                sAuxt = e.filtro.substring(e.filtro.indexOf("'")); 

                e.filtro = "CodEstacion In ( Select codestacion ";
                e.filtro = e.filtro + " From ps0estaciones Where CodMacroEstacion = " + sAuxt + ")";
            
            }

             if( e.nemonicoLink == "SMFL" ){
                sAuxt = e.filtro.substring(e.filtro.indexOf("'")); 

                e.filtro = "CodEstacion In ( Select codestacion ";
                e.filtro = e.filtro + " From ps0estaciones Where CodMacroEstacion = " + sAuxt + ")";
            
            }

             if( e.nemonicoLink == "SMRG" ){
                sAuxt = e.filtro.substring(e.filtro.indexOf("'")); 

                e.filtro = "CodEstacion In ( Select codestacion ";
                e.filtro = e.filtro + " From ps0estaciones Where CodMacroEstacion = " + sAuxt + ")";
            
            }

             if( e.nemonicoLink == "SMVS" ){
                sAuxt = e.filtro.substring(e.filtro.indexOf("'")); 

                e.filtro = "CodEstacion In ( Select codestacion ";
                e.filtro = e.filtro + " From ps0estaciones Where CodMacroEstacion = " + sAuxt + ")";
            
            }


             if( e.nemonicoLink == "SMMA" ){
                sAuxt = e.filtro.substring(e.filtro.indexOf("'")); 

                e.filtro = "CodEstacion In ( Select codestacion ";
                e.filtro = e.filtro + " From ps0estaciones Where CodMacroEstacion = " + sAuxt + ")";
            
            }


             if( e.nemonicoLink == "SMTA" ){
                sAuxt = e.filtro.substring(e.filtro.indexOf("'")); 

                e.filtro = "CodEstacion In ( Select codestacion ";
                e.filtro = e.filtro + " From ps0estaciones Where CodMacroEstacion = " + sAuxt + ")";
            
            }


             if( e.nemonicoLink == "SMCF" ){
                sAuxt = e.filtro.substring(e.filtro.indexOf("'")); 

                e.filtro = "CodEstacion In ( Select codestacion ";
                e.filtro = e.filtro + " From ps0estaciones Where CodMacroEstacion = " + sAuxt + ")";
            
            }
        }
    }
}
