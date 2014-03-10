PLA1 = {
    C: ["CONTENIDO","TOTALHOJAS","DIBUJANTEV","APROBADORV","TIPOPLANOV","LOCALIZACIONV","DISENOV","REVISOV","SITIO"],

    ControlAcceso:function(e){
      var resp = SM.ExecStoredProcedureEscalar("dbo.TieneAcceso",["'@USUARIO'","'"+e.name+"'", "'PLA'"]);
      if(resp=="N"){
       Ext.Msg.alert("Advertencia","Ud. No tiene Acceso a modificar este campo"); 
       e.record.set("SW","2");  //Evita que ingrese a otros eventos en el Before Edit     
       e.cancel=true;
      } else {
          if (e.record.get("IDESTADOVER")==12){
             Ext.Msg.alert("Advertencia", "Plano con VERSION en proceso no puede modificarse.Verifique");
             e.cancel=true;
          }
          if ((e.record.get("IDESTADOCAD")==7 || e.record.get("IDESTADOCAD")==8) && e.name!="ESTADOCADV" && e.name!="ESTADOVERV"){ 
              Ext.Msg.alert("Advertencia", "Plano está disponible, modificación no permitida. Verifique")
              e.cancel=true;
          }         

      }
    },

    EnviarMail:function(e,xpara) {
      var xfrom = SM.SmCursor("C01PLA1","USUARIO='@USUARIO'");
      var xasunto="El siguiente plano esta pendiente de procesarlo =>"+e.record.get("CODPLANO");
      var xbody="El sistema queda a la espera del tramite respectivo" +String.fromCharCode(13)+"CONTENIDO="+e.record.get("CONTENIDO");
      var xcc="";
      var xbcc="";
      SM.ExecStoredProcedure("dbo.sp_cdosendmail",["'"+xfrom+"'","'"+xpara+"'", "'"+xasunto+"'","'"+xbody+"'","'"+xcc+"'","'"+xbcc+"'"]);
    }
};

Eventos = {

  beforeCellEdit:function(e){
      if (e.name=="MEDIOV"){ 
        if(e.record.get("IDMEDIO")==19){ 
          e.record.set("ASOCIADOGAS","N");
        }
      }

      if (e.name=="ASOCIADOGAS"){ 
          if (e.record.get("IDESTADODA")==49 && e.record.get("ASOCIADOGAS")=="S"){ 
            Ext.Msn.alert("Advertencia","Plano en Diseño no  es asociable a elemento GIS");
            e.record.set("ASOCIADOGAS","N"); 
          } else {
          if (e.record.get("IDESTADODA")==50 && e.record.get("IDMEDIO")==19){ 
            Ext.Msn.alert("Advertencia","Plano en impreso no es asociable a elemento GIS");
            e.record.set("ASOCIADOGAS","N");
          }
        }
      }

      if (e.name=="ESTADOVERV"){ 
        if ((e.record.get("IDPLANO")+"").length==0){ 
           e.record.set("IDESTADOVER",11);
           var Valor = SM.Cursor("C02PLA1"," IdDetEtc=11");    
           e.record.set("ESTADOVERV",Valor);
        } else {
          if (e.record.get("VERSION")!="AB" && !Ext.isNumeric(e.record.get("VERSION"))){ 
            Ext.Msn.alert("Advertencia", "Plano no es versionable. Revisión actual es indeterminada");
            e.record.set("IDESTADOVER",11);
            var Valor = SM.Cursor("C02PLA1"," IdDetEtc=11");    
            e.record.set("ESTADOVERV",Valor);
          } else {         
           if (confirm('Esta Seguro de crear nueva versión para éste Plano?')){ 
             if (e.record.get("IDESTADODA")==49){ 
                if (confirm('Esta versión será ASBUILT?')){ 
                   e.record.set("SWTRIG",79;   //Plano sera Asbuilt 7
                } else { 
                   e.record.set("SWTRIG",1);    //Plano sera de Diseño  1
                }
             } else {
              if (confirm('Generará un plano de diseño con este ASBUILT?')){ 
                 e.record.set("SWTRIG",9);   //Plano sera de diseño, pero es una modificación a un Abuilt 
                 e.record.set("MARCA",100);  //Indica  asociación con los siguientes planos de diseño 
              } else {             
                 e.record.set("SWTRIG",7);   //Plano sera Asbuilt porque el padre es AB   
              } 
             }
             //bitacora 
             e.record.set("COMEN","ESTADO Anterior="+CursorVal("Valor")+ "=> Nuevo ESTADO ="+ e.record.get("ESTADOVERV"));
             e.record.set("IDOPER","93");
           } else {
              e.record.set("IDESTADOVER",11);
              var Valor = SM.Cursor("C02PLA1"," IdDetEtc=11");    
           e.record.set("ESTADOVERV",Valor);
           }
          }
        } 
       }

    if (e.name=="LOCALIZACIONV"){
      
      if (e.record.get("IDLOCALIZACION")==0){ 
        e.record.set("CODPLANO","");
       } else {  
        if (e.record.get("IDLOCALIZACION")!=""){ 
          var Seq = SM.ExecStoredProcedureEscalar("ConcecutivoPla",["'"+e.record.get("CODIGOSITIO")+"'"]);
          if (Seq==""){ 
            Seq = 1;
          } else {
            Seq = Seq+1 
          }
          if (Seq<10){ 
            Seq = "0"+Seq;
          }  
          e.record.set("CODPLANO",(e.record.get("CODIGOSITIO")+"").trim()+"-P-"+Seq);        
        } 
       }
    }


    if (e.name=="ESTADODAV"){ 
         
        if (e.record.get("IDESTADODA")==101 || e.record.get("IDESTADODA")==108){ 
         Ext.Msn.alert("Advertencia", "Tipos Invalidos. No aplican en este momento. Verifique");
         e.record.set("ESTADODAV","");
         } else { 
           if (e.record.get("IDESTADODA")==50){
               e.record.set("VERSION","AB");
           }
        } 
    }

  },

  afterSave:function(e){
      
      if (e.record.get("SWMAIL")=="1"){
        /*if (e.record.get("IDMEDIO")==19){  //Plano impreso 
          var Valor = SM.Cursor("C02PLA1"," IdDetEtc=81");
        } else {
          var Valor = SM.Cursor("C02PLA1"," IdDetEtc=79");
        }         
        EnviarMail(xpara) 
        alert("Notificación enviada a "+xpara);
        //Ejecutar proc almacenado para insertar reg en Logplanos */
        SM.ExecStoredProcedure("BitacoraPlanos",["'"+e.record.get("IDPLANO")+"'","'"+e.record.get("IDOPER")+"'", "'@USUARIO'","'@TERMINAL'","'"+e.record.get("COMEN")+"'"]);
      } 
      if (e.record.get("SWTRIG")==7){
        //Ejecutar proc almacenado para intertar reg en Logplanos 
        SM.ExecStoredProcedure("BitacoraPlanos",["'"+e.record.get("IDPLANO")+"'","'"+e.record.get("IDOPER")+"'", "'@USUARIO'","'@TERMINAL'","'"+e.record.get("COMEN")+"'"]);
      }   
  },

  recordInsert:function(e){
    
      if(e.record.get("IDLOCALIZACION")=="0") {
        var Valor = SM.Cursor("C02PLA1"," IdDetEtc=3");    
        e.record.set("ESTADOCADV",Valor);

        Valor = SM.Cursor("C02PLA1"," IdDetEtc=14");
        e.record.set("ESTADOGISV",Valor);
         
        Valor = SM.Cursor("C02PLA1"," IdDetEtc=11");
        e.record.set("ESTADOVERV",Valor);
         
        Valor = SM.Cursor("C02PLA1"," IdDetEtc=49");  
        e.record.set("ESTADODAV",Valor);

        e.record.set("RAIZRUTA",47);   //por defecto los planos estaran en ruta  VIEW
        e.record.set("VERSION","0");
        e.record.set("ASOCIADOGAS","N");
      }
  },

  beforeSave:function(e){
    if(e.record.get("SW")=="3"){
      e.MensajeError="No esta permitido borrar planos disponibles";
      e.cancel=true;
    }
    if(e.record.get("IDESTADOCAD")==6){ 
      for (var i = 0; i < e.Global.C.length; i++) {
        if(e.record.get(e.Global.C[i])==""){ 
           var j = SM.GetLabelField(e.pcl,e.Global.C[i]);
           e.MensajeError= "Campo "+j+" debe diligenciarlo";
           var Valor = SM.Cursor("C02PLA1"," IdDetEtc=3 ");
           e.record.set("IDESTADOCAD",3);
           e.record.set("ESTADOCADV",Valor);
           e.record.set("SWMAIL","N");  //--- Evita que envie el mensaje al siguiente en el flujo
           e.cancel=true;
           break;     
        }
      }    
    }
    if(e.record.get("FECREGISTRO")==""){
        if(e.record.get("IDESTADOVER")==11){
          var Codp = SM.Cursor("C03PLA1"," CODPLANO='"+e.record.get("CODPLANO")+"'");
          if(Codp>= 1){ 
            Ext.Msg.alert("Advertencia", "Ya existe un plano con el codigo "+e.record.get("CODPLANO"));
            e.cancel=true;
          }
        }
    }    
  },

  afterDelete:function(e){
    if (e.record.get("IDESTADOCAD") == 7 || e.record.get("IDESTADOCAD") == 8){
      e.record.set("SW","3");
    }                                                                                                                                                           
  },

  dblClick:function(e){
    if(e.name=="MARCAPLANOS"){
        if(e.record.get("MARCAPLANOS")==0){ 
           e.record.set("MARCAPLANOS",1);
        } else { 
           e.record.set("MARCAPLANOS",0);
        }
    }
  }                                  
};

