JMPT = {
    
};

Eventos = {
    validateField:function(e){
        if(e.field.name == "FECPAGO"){
           var d = Ext.Date.parse(e.field.value, "d-m-Y");
           var m = d.getMonth() + 1;
           var y = d.getFullYear();
           e.record.set("AÑO",y);
           switch(m){
                case 1:  e.record.set("MES", "ENERO"); break;
                case 2:  e.record.set("MES", "FEBRERO"); break;
                case 3:  e.record.set("MES", "MARZO"); break;
                case 4:  e.record.set("MES", "ABRIL"); break;
                case 5:  e.record.set("MES", "MAYO"); break;
                case 6:  e.record.set("MES", "JUNIO"); break;
                case 7:  e.record.set("MES", "JULIO"); break;
                case 8:  e.record.set("MES", "AGOSTO"); break;
                case 9:  e.record.set("MES", "SEPTIEMBRE"); break;
                case 10: e.record.set("MES", "OCTUBRE"); break;
                case 11: e.record.set("MES", "NOVIEMBRE"); break;
                case 12: e.record.set("MES", "DICIEMBRE"); break;
           }
        }
    }
};