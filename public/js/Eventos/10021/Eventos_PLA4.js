PLA4 = {
    C: ["UBICACIONCAD","FECHARECIBOPLANO"],

    ControlAcceso:function(e){
      var resp = SM.ExecStoredProcedureEscalar("dbo.TieneAcceso",["'@USUARIO'","'"+e.name+"'", "'PLA'"]);
      if(resp=="N"){
       Ext.Msg.alert("Advertencia","Ud. No tiene Acceso a modificar este campo"); 
       e.record.set("SW","2");  //Evita que ingrese a otros eventos en el Before Edit     
       e.cancel=true;
      }
    },

    EnviarMail:function(e,xpara) {
      var xfrom = SM.SmCursor("C01PLA4","USUARIO='@USUARIO'");
      var xasunto="El siguiente plano esta pendiente de procesarlo =>"+e.record.get("CODPLANO")+" Codigo interno="+e.record.get("IDPLANO");
      var xbody="El sistema queda a la espera del tramite respectivo" +String.fromCharCode(13)+"CONTENIDO="+e.record.get("CONTENIDO");
      var xcc="";
      var xbcc="";
      SM.ExecStoredProcedure("dbo.sp_cdosendmail",["'"+xfrom+"'","'"+xpara+"'", "'"+xasunto+"'","'"+xbody+"'","'"+xcc+"'","'"+xbcc+"'"]);
    }

};

Eventos = {

  beforeCellEdit:function(e){
    e.Global.ControlAcceso(e);
    if(e.name=="ESTADOCADV" && e.record.get("IDESTADOCAD")==7){ 
      Ext.Msg.alert("Advertencia","En este momento no puede hacer este cambio");
      e.cancel = true;  
    }

  },


  validateField:function (e){
  
  if(e.field.name=="FECHARECIBOPLANO"){           
       var FECHARECIBOPLANO =  Ext.Date.parse(e.value, "d-m-Y");
       var ahora = new Date();
       if(FECHACOPIA > ahora){
          Ext.Msg.alert("Informacion","Fecha no puede ser Futura. por favor verifique");
          e.value=Ext.Date.format(ahora,"d-m-Y");
          e.isValid = true; // ya se cambio  el valor incorrecto
       }
  }

  if(e.field.name=="ESTADOCADV"){
       xvalor = SM.Cursor("C02PLA4"," IdDetEtc=6"); 
   if(e.record.get("ASOCIADOGAS")=="S"  && e.record.get("IDESTADOGIS")!= 16){ 
        Ext.Msg.alert("Advertencia","Primero debe asociar elemento GIS. Verifique");
        e.record.set("IDESTADOCAD",6);
        e.value=xvalor;
    } else {      
      if (confirm('Esta Seguro que desea poner disponible este plano?')){ 
       //Correr el procedimiento de envio de de informacion a la lista de distribución 
           if(e.record.get("IDESTADOVER")==74){                
               if(e.record.get("IDESTADODA")==50){ 
                  e.record.set("SWTRIG",3);    //El plano es AB se actualizan fechas de eliminacion 
               } else { 
                  e.record.set("SWTRIG",2);   //EstadoCad=Disponible, EstadoVer=Historico no es AB
               }               
           } else { 
               e.record.set("SWTRIG",0);
          }
           //Activar Aqui procedimiento para enviar correos a la lista de distribucion 
           e.record.set("SWMAIL","2");
           //bitacora 
            e.record.set("COMEN","ESTADO Anterior="+xvalor+" => Nuevo ESTADO ="+ e.record.get("ESTADOCADV"));
            e.record.set("IDOPER","91");
 
            e.record.set("IDESTADOVER",11);
            Valor = SM.Cursor("C02PLA4"," IdDetEtc=11"); 
            e.record.set("ESTADOVERV",Valor);
      } else { 
        e.record.set("IDESTADOCAD",6);  
        e.value=xvalor;
      }
   }  
 }

  },

  afterSave:function(e){
      
      if (e.record.get("SWMAIL")==2){
      //Envio de Correo a la lista de Distribución  
      xasunto = "El plano con código="+e.record.get("CODPLANO")+" Tiene una nueva versión";
      xbody = "Datos del nuevo plano"+String.fromCharCode(13)+"Codigo Interno="+e.record.get("IDPLANO")+String.fromCharCode(13)+"SITIO="+e.record.get("SITIO")+String.fromCharCode(13)+"CONTENIDO="+e.record.get("CONTENIDO");
      SM.ExecStoredProcedure("dbo.EnviarCorreoListas",["'"+e.record.get("IDPROYECTO")+"'","'"+xasunto+"'","'"+xbody+"'"]);
      
      //Envio de correo a las personas con copia controlada 
      SM.ExecStoredProcedure("dbo.EnviarCorreoCopiaControlada",["'"+e.record.get("IDPLANO")+"'","'"+xasunto+"'","'"+xbody+"'"]);
        
      //Ejecutar proc almacenado para intertar reg en Logplanos 
      SM.ExecStoredProcedure("dbo.BitacoraPlanos",["'"+e.record.get("IDPLANO")+"'","'"+e.record.get("IDOPER")+"'","'@USUARIO'","'@TERMINAL'","'"+e.record.get("COMEN")]);
      
      }
  },

  beforeSave:function(e){
    
    if(e.record.get("IDESTADOCAD")==7){ 
      for (var i = 0; i < 1; i++) {
        if(e.record.get(e.Global.C[i])==""){ 
           var j = SM.GetLabelField(e.pcl,e.Global.C[i]);
           e.MensajeError= "Campo "+j+" debe diligenciarlo";
           var Valor = SM.Cursor("C02PLA4"," IdDetEtc=6 ");
           e.record.set("IDESTADOCAD",6);
           e.record.set("ESTADOCADV",Valor);
           e.record.set("SWMAIL","N");  //--- Evita que envie el mensaje al siguiente en el flujo
           e.cancel=true;
           break;     
        }
      }    
    }
        
  }

};

