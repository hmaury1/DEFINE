LIS = {
    
};

Eventos = {
   recordInsert:function(e){
        var VALOR = SM.Cursor("C01LIS"," IdDetEtc=28 ");
        e.record.set('ESTADOLISTAV',VALOR);
        e.record.set('IDESTADOLISTA',28);
    }
};
