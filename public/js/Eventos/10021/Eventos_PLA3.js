PLA3 = {
    C: ["CONTENIDO","TOTALHOJAS","DIBUJANTEV","APROBADORV","TIPOPLANOV","LOCALIZACIONV","DISENOV","REVISOV","SITIO"],

    ControlAcceso:function(e){
      var resp = SM.ExecStoredProcedureEscalar("dbo.TieneAcceso",["'@USUARIO'","'"+e.name+"'", "'PLA'"]);
      if(resp=="N"){
       Ext.Msg.alert("Advertencia","Ud. No tiene Acceso a modificar este campo"); 
       e.record.set("SW","2");  //Evita que ingrese a otros eventos en el Before Edit     
       e.cancel=true;
      }
    },

    EnviarMail:function(e,xpara) {
      var xfrom = SM.SmCursor("C01PLA3","USUARIO='@USUARIO'");
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
    
    if (e.record.get("SW")!="2"){ 

       if (e.name=="ESTADOCADV" && e.record.get("ASOCIADOGAS")=="S" && e.record.get("IDESTADOGIS")==15){ 
         Ext.Msg.alert("Advertencia","Debe asociar plano primero antes de darlo disponible ");
         e.cancel = true;     
       }

       if (e.name=="ESTADOGISV" && e.record.get("IDESTADODA")==49){ 
         Ext.Msg.alert("Advertencia","No esta permitido asociar planos de diseÑo ");
         e.cancel = true;     
       }

       if (e.name=="ESTADOCADV" && e.record.get("IDMEDIO")!=20){ 
         Ext.Msg.alert("Advertencia","No puede cambiar ESTADO CAD en este momento ");
         e.cancel = true;     
       }
      
      if (e.name=="ESTADOCADV" && e.record.get("IDMEDIOPADRE")!=20){ 
         Ext.Msg.alert("Advertencia","No puede cambiar ESTADO CAD en este momento ");
         e.cancel = true;     
       }
      
    }

  },


  validateField:function (e){
    if (e.field.name=="ESTADOCADV"){ 
          var xvalor = SM.Cursor("C02PLA3"," IdDetEtc=6");
          if (confirm('Esta Seguro que desea poner disponible este plano?')){ 
         //Correr el procedimiento de envio de de informacion a la lista de distribución 
           if (e.record.get("IDESTADOVER")==74){ 
              if (e.record.get("IDESTADODA")==50){ 
                 e.record.set("SWTRIG",3);    //El plano es AB se actualizan fechas de eliminacion 
              } else { 
                e.record.set("SWTRIG",2);   // EstadoCad=Disponible, EstadoVer=Historico no es AB
              } 
           } else { 
              e.record.set("SWTRIG",0);  //No hace nada solo se graba 
           }
            // Activar Aqui procedimiento para enviar correos a la lista de distribucion 
           e.record.set("SWMAIL","2");  
           e.record.set("IDESTADOVER",11);
           var Valor = SM.Cursor("C02PLA3"," IdDetEtc=11");
           e.record.set("ESTADOVERV",Valor);
           // bitacora 
            e.record.set("COMEN","ESTADO Anterior="+xvalor+" => Nuevo ESTADO ="+ e.record.get("ESTADOCADV"));
            e.record.set("IDOPER","91");
        } else { 
          e.record.set("IDESTADOCAD",6);         
          e.value=xvalor;
        }        
    }
    if (e.field.name=="ESTADOGISV"){ 
          var xvalor = SM.Cursor("C02PLA3"," IdDetEtc=15");
          //Aqui hacer un Select para ver si hay porlo menos un elmento asociado con este plano
          var N = SM.Cursor("C03PLA3", " Where IdPlanoRef="+e.record.get("IDPLANO"));  
          if (N != 0){ 
              e.record.set("SWMAIL","1"); 
              //bitacora 
              Valor = SM.Cursor("C02PLA3"," IdDetEtc=16");         
              e.record.set("COMEN","ESTADO anterior="+xvalor+" => Nuevo ESTADO ="+ Valor);
              e.record.set("IDOPER","92");
          } else { 
              Ext.Msg.alert("Advertencia","Este plano no ha sido asociado con ningun elemento GIS. verifique");
              e.record.set("IDESTADOGIS",15);       
              e.value=xvalor;
          }
    }
  },

  afterSave:function(e){
      
      if (e.record.get("SWMAIL")==1){
        if (e.record.get("IDMEDIO")!=20){
            var xpara = SM.Cursor("C02PLA3"," IdDetEtc=3 ");
            e.Global.EnviarMail(xpara);
            alert("Notificación enviada a "+xpara);    
        }  
        //Ejecutar proc almacenado para insertar reg en Logplanos 
        SM.ExecStoredProcedure("BitacoraPlanos",["'"+e.record.get("IDPLANO")+"'","'"+e.record.get("IDOPER")+"'", "'@USUARIO'","'@TERMINAL'","'"+e.record.get("COMEN")+"'"]);
        
      }  
      if (e.record.get("SWMAIL")==2){
        //Ejecutar proc almacenado para insertar reg en Logplanos 
        SM.ExecStoredProcedure("BitacoraPlanos",["'"+e.record.get("IDPLANO")+"'","'"+e.record.get("IDOPER")+"'", "'@USUARIO'","'@TERMINAL'","'"+e.record.get("COMEN")+"'"]);
        
      }
  }

};

