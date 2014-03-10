LTMUNI = {
    
};

Eventos = {

    validateField:function(e){
    
        if(e.field.name=="CODGASODUCTO") { 

            var value  =  SM.ExecFuncionEscalar("dbo.pgcomgasoducto", ["'"+e.record.get("DEPARTAMENTO")+"'" , "'"+e.record.get("MUNICIPIO")+"'","'"+e.record.get("CODGASODUCTO")+"'");
            e.record.set("COMUNIDADC",value);

            value  =  SM.ExecFuncionEscalar("dbo.PGVIVIENDASGASO", ["'"+e.record.get("DEPARTAMENTO")+"'" , "'"+e.record.get("MUNICIPIO")+"'","'"+e.record.get("CODGASODUCTO")+"'");
            e.record.set("VIVIENDASC",value);

            value  =  SM.ExecFuncionEscalar("dbo.PGVIVIENINFGASO", ["'"+e.record.get("DEPARTAMENTO")+"'" , "'"+e.record.get("MUNICIPIO")+"'","'"+e.record.get("CODGASODUCTO")+"'");
            e.record.set("VIVIENINFC",value);

            value  =  SM.ExecFuncionEscalar("dbo.PGhabitantesGASO", ["'"+e.record.get("DEPARTAMENTO")+"'" , "'"+e.record.get("MUNICIPIO")+"'","'"+e.record.get("CODGASODUCTO")+"'");
            e.record.set("HABITANTESC",value);

            value  =  SM.ExecFuncionEscalar("dbo.PGhabitAreaGASO", ["'"+e.record.get("DEPARTAMENTO")+"'" , "'"+e.record.get("MUNICIPIO")+"'","'"+e.record.get("CODGASODUCTO")+"'");
            e.record.set("HABITAREAC",value);

            value  =  SM.ExecFuncionEscalar("dbo.PGNUMENTEDUC", ["'"+e.record.get("DEPARTAMENTO")+"'" , "'"+e.record.get("MUNICIPIO")+"'","'"+e.record.get("CODGASODUCTO")+"'");
            e.record.set("ENTEDUC",value);

            value  =  SM.ExecFuncionEscalar("dbo.PGNUMENTSALUD", ["'"+e.record.get("DEPARTAMENTO")+"'" , "'"+e.record.get("MUNICIPIO")+"'","'"+e.record.get("CODGASODUCTO")+"'");
            e.record.set("ENTSALUDC",value);

            value  =  SM.ExecFuncionEscalar("dbo.PGnumhca", ["'"+e.record.get("DEPARTAMENTO")+"'" , "'"+e.record.get("MUNICIPIO")+"'","'"+e.record.get("CODGASODUCTO")+"'");
            e.record.set("HCAC",value);

            /*
            ''''''''''''''''''''''''''''''''''
            '''ABSISAS INICIALES Y FINALES''''
            ''''''''''''''''''''''''''''''''''
            */
            /*
            var valc  =  SM.ExecFuncionEscalar("dbo.PgContAbsisas", ["'"+e.record.get("DEPARTAMENTO")+"'" , "'"+e.record.get("MUNICIPIO")+"'","'"+e.record.get("CODGASODUCTO")+"'");
            var numIns = valc - 2;
            var filas = GridRows
            i = GridRows         
            j = i + numIns
           
            
            If valc > 1 Then

                ''insertar filas
                For i=i  To J    
                    pclGrid.xGrid.cmdInsertarFila CLng(i), CBool(1)
                Next 

            End If
        
           
            k = filas - 1
             
            For c = 1 To valc
           
                MsgBox(k & " filas")
                
                sqlI = "Select dbo.PgAbIniGasMcpio('" & RowText("DEPARTAMENTO") &"'"
                sqlI = sqlI & ",'" & RowText("MUNICIPIO")&"','" & RowText("CODGASODUCTO") & "'," & c &")"

                Ini = Cursor(sqlI)
                GridText( k,"AbscisaI") = Ini

                sqlF = "Select dbo.PgAbFinGasMcpio('" & RowText("DEPARTAMENTO") &"'"
                sqlF = sqlF & ",'" & RowText("MUNICIPIO")&"','" & RowText("CODGASODUCTO") & "'," & c &")"
                
                Fin = Cursor(sqlF)
                GridText(k ,"AbscisaF")= Fin
            
                GridText(k ,"Indice")= c        

                k = k + 1
                
          Next
          */
        }  
       

    }

};