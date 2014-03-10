CONFOTOS = {
    
};

Eventos = {
     dblClick:function(e){
     	var xRuta = SM.ExecFuncionEscalar("dbo.RutaRaizTipoDoc", ["'"+e.record.get("IDTIPODOC")+"'"]);  
        SM.ShowFile(xRuta);
    }

};