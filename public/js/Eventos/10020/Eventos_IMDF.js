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

                e.filtro = SM.ExecFuncionEscalar("dbo.PgLink_IMSE", ["'"+GASODUCTO+"'", "'"+LINEA+"'", Soldadura, 0]);  
                e.filtro = " AND "+ e.filtro + " AND ESTADO = 'ACTIVO'";
            }
            
        }
        if (e.nemonicoLink == "IMSE"){
            if (e.record != null){
                e.filtro = "CODELEMENTO = '" + e.record.get("IDINDICACION") +  "' And TIPOELEMENTO = 'INDIC' And ESTADO = 'ACTIVO' ";
            }
            
        }
    },

    beforeCellEdit:function(e){
        var Valor;
        var YearP;
          switch (e.name){
            case "MPOP":
                // calcula relacion de esfuerzo
                    var Diamet
                    var Espes
                    var  SMYS
                    var MPOP1
                    var PresionD
                    var LongProyectada1 
                    var ProfProyectada1
                    var LINEA = e.record.get("CODLINEA");
                    var GASODUCTO = e.record.get("CODGASODUCTO");
                    var NSOLDADURA = e.record.get("NSOLDADURA");
                    
                    Diamet = SM.ExecFuncionEscalar("dbo.Fnc_PGTraeDiametroext",["'"+GASODUCTO+"'", "'"+LINEA+"'", NSOLDADURA]);
                    Espes = SM.ExecFuncionEscalar("dbo.Fnc_PGTraeEspeNominal", ["'"+LINEA+"'", NSOLDADURA]);
                    SMYS = SM.ExecFuncionEscalar("dbo.Fnc_PgTraeSMYS",["'"+GASODUCTO+"'", "'"+LINEA+"'", NSOLDADURA]);

                    MPOP1 = SM.Cursor("C01IMDF","CODGASODUCTO = '" +  GASODUCTO + "' And CODLINEA = '" + LINEA + "' And NSOLDADURA = " + NSOLDADURA); 

                    PresionD = SM.Cursor("C02IMDF","CODGASODUCTO = '" +  GASODUCTO + "' And CODLINEA = '" + LINEA +"'");

                    // Se utiliza para validar de que exista el dato 
                    LongProyectada1 = (e.record.get("LONGPROYECTADA") == null ? "": e.record.get("LONGPROYECTADA"));
                    ProfProyectada1 = (e.record.get("PROFPROYECTADA") == null ? "": e.record.get("PROFPROYECTADA"));


                    if((Diamet == "" || Diamet.length == 0) || (Espes == "" || Espes.length == 0)) { 
                        alert("No se encontró número de soldadura circunferencial inicial");
                    }
                    else
                    {
                        e.record.set("RELESFUERZO", (e.value * Diamet ) / (2 * Espes));
                    }

                    // Valida los datos de entrada 
                    if(LongProyectada1.length > 0 && ProfProyectada1.length > 0)  {               
                        //   calcula el ERF
                        var dt = SM.ExecFuncion("Dbo.CalculaERF",[ LongProyectada1,ProfProyectada1 , Diamet , Espes , SMYS , MPOP1  , PresionD ] );
                        if(dt.length>0){
                            e.record.set("ANCHOPROYECTADO", dt[0].ERF);
                        }
                        
                        // traerlo de tubos
                    }else{                        
                        alert("No se puede calcular ANCHOPROYECTADO por que no se encontraron datos para la PROFPROYECTADA y LONGPROYECTADA    ");   

                    } 
        }
    
    }
};
