SMPL1 = {
    
};

Eventos = {
    
    dblClick:function(e){

        if(e.name=="UBICACION"){
             SM.ShowFile(e.record.get('UBICACION'));
        } else {
            if((e.record.get('IDPLANOREF')+"").length>0){
                 SM.ShowFile(e.record.get('RUTAV'));
            } else {
                SM.ShowFile(e.record.get('UBICACION'));
            }
        }
    }
};