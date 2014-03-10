DPRE = {
    
};

Eventos = {
    
    recordInsert:function(e){
        var VALOR = SM.Cursor("C01DREGCOPIA"," IdDetEtc=72 ");
        e.record.set('ESTADODETCPV',VALOR);
        e.record.set('IDESTADODETCP',72);
    },

    
    rowLoad: function(e){
      if((e.record.get("IDDETCP")+"").length==0){ 
         var VALOR = SM.Cursor("C01DREGCOPIA"," IdDetEtc=72 ");
        e.record.set('ESTADODETCPV',VALOR);
        e.record.set('IDESTADODETCP',72);
      }
    }
};