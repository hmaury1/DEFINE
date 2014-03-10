SMPL = {
    
};

Eventos = {
    
    dblClick:function(e){

        if(e.name=="UBICACION"){
             SM.ShowFile(e.record.get('UBICACION'));
        } else {
            if((e.record.get('IDPLANOREF')+"").length>0){
                 SM.ShowFile(e.record.get('RUTAFOTOV'));
            } else {
                SM.ShowFile(e.record.get('UBICACION'));
            }
        }
    },

    recordInsert:function(e){
        e.record.set('TIPOARCHIVO','FOTO');
    }

};