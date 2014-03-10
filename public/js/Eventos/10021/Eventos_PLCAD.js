PLCAD = {
    
};

Eventos = {
     dblClick:function(e){
     	if(e.name=="MARCAPLANOS"){     		
		   if(e.record.get("MARCAPLANOS")==)0){
		       e.record.set("MARCAPLANOS",1);
		   } else { 
		       e.record.get("MARCAPLANOS",0);
		   }
     	}
    }

};