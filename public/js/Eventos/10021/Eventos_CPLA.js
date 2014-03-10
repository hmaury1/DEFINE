CPLA = {
    
};

Eventos = {
    
    validateField:function (e){
       if(e.field.name=="FECHACOPIA"){           
             var FECHACOPIA =  Ext.Date.parse(e.value, "d-m-Y");
             var ahora = new Date();
             if(FECHACOPIA > ahora){
                Ext.Msg.alert("Informacion","Fecha no puede ser Futura. por favor verifique");
                e.value=Ext.Date.format(ahora,"d-m-Y");
                e.isValid = true; // ya se cambio  el valor incorrecto
             }
        }
        if(e.field.name=="ESTADOCOPIAPLANOV"){ 
          if(e.record.get("IDCOPIAPLANO").length>0){ 
            var NReg = SM.Cursor("C01CPLA", "c.IDCOPIAPLANO=d.IDCOPIAPLANO And c.IDCOPIAPLANO='"+e.record.get("IDPLANO")+"'");
            if(NReg==0){
               Ext.Msg.alert("Informacion","No Hay planos asignados a esta solicitud de copia. Verifique");
               e.record.set("IDESTADOCOPIAPLANO",70);
               var value = SM.Cursor("C02CPLA"," IdDetEtc=70 "); 
               e.value = value;
               e.isValid = true; // ya se cambio  el valor incorrecto
            } else {
              NReg = SM.Cursor("C01CPLA", " d.IdEstadoDetCP=72 And c.IDCOPIAPLANO=d.IDCOPIAPLANO And c.IDCOPIAPLANO='"+e.record.get("IDCOPIAPLANO")+"'");
              if(NReg!=0){
                 Ext.Msg.alert("Informacion","Hay planos pendientes de procesar.Verifique");
                 e.record.set("IDESTADOCOPIAPLANO",70);
                 var value = SM.Cursor("C02CPLA"," IdDetEtc=70 "); 
                 e.value = value;
                 e.isValid = true; // ya se cambio  el valor incorrecto
              } 
            } 
          }
        }
        
    },

    beforeCellEdit:function(e){
          if((e.record.get("IDESTADOCOPIAPLANO") != 70) && (e.record.get("IDESTADOCOPIAPLANO") != 171)) {
              Ext.Msg.alert("Informacion","Solo Pueden ser Modificados las copias en estado SOLICITADAS y EN PROCESO");
              e.cancel = true;
          }
       
    }
};