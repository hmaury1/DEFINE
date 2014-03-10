DLIS = {
    
};

Eventos = {
    
    validateField:function (e){
        
         if(e.field.name=="NOMBREUSUARIOV"){ 
           if(e.record.get("IDTIPOMIEMBRO")=="102"){ 
              e.record.set("IDUSUARIO","");
              e.value="";
            } else { 
              e.record.set("ROLV","");
              e.record.set("IDROL",""); 
           }
         }
         if(e.field.name=="ROLV"){ 
            if(e.record.get("IDTIPOMIEMBRO")=="103"){ 
              e.value="";
              e.record.set("IDROL",""); 
            } else { 
              e.record.set("IDUSUARIO","");
              e.record.set("NOMBREUSUARIOV","");
            }            
         } 
    },

    recordInsert:function(e){
        var ESTADODETLISTAV = SM.Cursor("C01DLIS"," IdDetEtc=30 ");
        e.record.set('ESTADODETLISTAV',ESTADODETLISTAV);
        e.record.set('IDESTADODETLISTA',30);
    },

    beforeSave:function(e){
        var IDTIPOMIEMBRO = e.record.get("IDTIPOMIEMBRO");
        IDTIPOMIEMBRO = IDTIPOMIEMBRO==null?"":IDTIPOMIEMBRO;        
        if((IDTIPOMIEMBRO+"").length > 0){ 
          if((IDTIPOMIEMBRO+"")=="103"){ 
            if(e.record.get("NOMBREUSUARIOV")==""){               
              e.MensajeError="Debe elegir un Rol/Grupo.Verifique";
              e.cancel=true;
            }  
          } else { 
            if(e.record.get("ROLV")==""){ 
                e.MensajeError="Debe elegir un usuario.Verifique";
                e.cancel=true;
            } 
          } 
        } 
    },

    beforeCellEdit:function(e){
      var IDTIPOMIEMBRO = e.record.get("IDTIPOMIEMBRO");
      IDTIPOMIEMBRO = IDTIPOMIEMBRO==null?"":IDTIPOMIEMBRO;
      if((IDTIPOMIEMBRO+"").length==0){
        
        if(e.name=="ROLV" || e.name=="NOMBREUSUARIOV"){ 
         e.cancel = true;
        } else {               

          if(e.name=="ROLV"){ 
             if(IDTIPOMIEMBRO==103) {
                e.cancel = true;
             }
          } else {      
             if (e.name=="NOMBREUSUARIOV"){ 
               if (IDTIPOMIEMBRO==102){ 
                  e.cancel = true;
               }
             }
          } 
        }
      }
    }

    

};