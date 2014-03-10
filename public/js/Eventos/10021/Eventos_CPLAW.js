CPLAW = {
    
};

Eventos = {
    
    validateField:function (e){
        
         if(e.field.name=="FECHACOPIA"){           
             var FECHACOPIA =  Ext.Date.parse(e.value, "d-m-Y");
             var ahora = new Date();
             if(FECHACOPIA > ahora){
                Ext.Msg.alert("Verifique","Fecha no puede ser Futura. por favor verifique");
                e.value=Ext.Date.format(ahora,"d-m-Y");
             }
        }
        
    },

    beforeCellEdit:function(e){
        //solo puede modificar los que estan en estado solicitado
          if((e.record.get("IDESTADOCOPIAPLANO") != 170) ) {
              Ext.Msg.alert("Verifique","Solo se pueden modificar las copias en estado PRE-SOLICITADO");
              e.cancel = true;
          }
    }
};
