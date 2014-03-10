SMPL2 = {
    
};

Eventos = {
    
    dblClick:function(e){

        if(e.name=="UBICACION"){
             SM.ShowFile(e.record.get('UBICACION'));
        } else {
            if((e.record.get('IDPLANOREF')+"").length>0){
            	var Ruta = SM.ExecFuncionEscalar("pgplanos.dbo.RutaRaiz", ['84']); 
                SM.ShowFile(Ruta+e.record.get('RUTAFOTO'));
            } else {
                SM.ShowFile(e.record.get('UBICACION'));
            }
        }
    },

    recordInsert:function(e){
        e.record.set('TIPOARCHIVO','CATALOGO');
    }

};