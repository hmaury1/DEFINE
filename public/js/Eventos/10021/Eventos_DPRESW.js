DPRE = {
    
};

Eventos = {
    
    validateField:function (e){
      var nhojas
      var TotalHojas
      var xidcad
      var Valor

      if(e.field.name=="HOJA"){
        if(e.value=="0"){
           var nhojas = SM.Cursor("C02DPRE"," IDPLANO="+e.record.get("IDPLANO")+" And HOJA<>'0' And IDESTADODETPRESTAMO=26 ");
           if(nhojas>0){ 
              Ext.Msg.alert("Verifique","Prestamo o es parcial o total pero no ambos!. Verifique");
              e.value="";
           }
        } else {
          TotalHojas = SM.Cursor("C03DPRE"," IDPLANO='"+e.record.get("IDPLANO")+"'");
          if(e.record.get("HOJA") > TotalHojas){ 
              Ext.Msg.alert("Verifique","HOJA no existe. Verifique TotalHojas en Plano");
              e.value="";
          } else { 
           nhojas = SM.Cursor("C02DPRE"," IDESTADODETPRESTAMO=26 And IDPLANO="+ e.record.get("IDPLANO")+" And HOJA='"+e.record.get("HOJA")+"' ");
            if(nhojas > 0){  
              Ext.Msg.alert("Verifique","HOJA ya fue prestada o todo el plano. Verifique");
              e.value="";
            }
          } 
        } 
      }

      //----------------------------------------------------

      if(e.field.name=="IDPLANO"){ 
            xidcad = SM.Cursor("C04DPRE"," IDPLANO='"+e.record.get("IDPLANO")+"'");
          if(xidcad==7 || xidcad==8 || xidcad==9){ 
            if(xidcad==8){ 
              nhojas = SM.Cursor("C02DPRE"," IDESTADODETPRESTAMO=26 And HOJA<>'0' And IDPLANO='"+e.record.get("IDPLANO")+"'");
              if(nhojas == 0){         
                Ext.Msg.alert("Verifique","Plano ya está prestado. Verifique");   
                e.record.set("CODPLANOV","");
                e.value="";
                e.record.set("CONTENIDOV","");
                e.record.set("NOMBREPROYV","");
              } else { 
                Ext.Msg.alert("Verifique","Plano Tiene prestado algunas hojas. Revise");
              }
            } else {        
              Ext.Msg.alert("Verifique","Planos en proceso no pueden ser prestados.Verifique");
              e.record.set("CODPLANOV","");
              e.value="";
              e.record.set("CONTENIDOV","");
              e.record.set("NOMBREPROYV","");
            } 
          }
      }

      //-----------------------------------------------------

      if(e.field.name=="FECHAPRESTAMO"){ 
         var ahora = new Date();
         if( Ext.Date.parse(e.value, "d-m-Y")>ahora ){
           Ext.Msg.alert("Verifique","Fecha no puede ser Futura.Verifique");
           e.value=Ext.Date.format(ahora,"d-m-Y");
         } else {
            Valor = SM.Cursor("C05DPRE"," IdDetEtc=43 ");           
            if(Ext.isNumeric(Valor)){
              y=Valor;
            } else { 
              y=1;  
            } 
            var dp = Ext.Date.parse(e.record.get("FECHAPRESTAMO"), "d-m-Y");
            dp.setDate(dp.getDate() + y);
            e.record.set("FECHAENTREGA", Ext.Date.format(dp,"d-m-Y"));
         }
        
      }

      //------------------------------------------------------

      if(e.field.name == "ESTADOPRESTAMOV" && e.record.get("IDESTADODETPRESTAMO")==27){    
         e.record.get("FECHAENTREGA", Ext.Date.format(new Date(),"d-m-Y"));
      } 
    },

    recordInsert:function(e){
        var ESTADODETLISTAV = SM.Cursor("C01DPRE"," IdDetEtc=26 ");
        e.record.set('ESTADODETPRESTAMOV',ESTADODETLISTAV);
        e.record.set('IDESTADODETPRESTAMO',26);
    },

    
    rowLoad: function(e){
      console.log(e);
      if((e.record.get("IDDETPRESTAMO")+"").length==0){ 
         var ahora = new Date();
         e.record.set("FECHAPRESTAMO",Ext.Date.format(ahora,"d-m-Y"));
         var Valor = SM.Cursor("C05DPRE"," IdDetEtc=43 "); 
         if(Ext.isNumeric(Valor)){
            y=Valor;
         } else { 
            y=1;  
         } 
         var dp = Ext.Date.parse(ahora, "d-m-Y");
         dp.setDate(dp.getDate() + y);
         e.record.set("FECHAENTREGA", Ext.Date.format(dp,"d-m-Y"));
         e.record.set("IDESTADODETPRESTAMO",26);
         Valor = SM.Cursor("C05DPRE"," IdDetEtc=26 "); 
         e.record.set("ESTADOPRESTAMOV",Valor);
      }
    }
};