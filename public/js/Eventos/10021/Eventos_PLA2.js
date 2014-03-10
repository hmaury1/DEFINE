PLA2 = {
    ControlAcceso:function(e){
      var resp = SM.ExecStoredProcedureEscalar("dbo.TieneAcceso",["'@USUARIO'","'"+e.name+"'", "'PLA'"]);
      if(resp=="N"){
       Ext.Msg.alert("Advertencia","Ud. No tiene Acceso a modificar este campo"); 
       e.record.set("SW","2");  //Evita que ingrese a otros eventos en el Before Edit     
       e.cancel=true;
      } 
    },

    EnviarMail:function(e,xpara) {
      var xfrom = SM.SmCursor("C01PLA2","USUARIO='@USUARIO'");
      var xasunto="El siguiente plano esta pendiente de procesarlo =>"+e.record.get("CODPLANO");
      var xbody="El sistema queda a la espera del tramite respectivo" +String.fromCharCode(13)+"CONTENIDO="+e.record.get("CONTENIDO");
      var xcc="";
      var xbcc="";
      SM.ExecStoredProcedure("dbo.sp_cdosendmail",["'"+xfrom+"'","'"+xpara+"'", "'"+xasunto+"'","'"+xbody+"'","'"+xcc+"'","'"+xbcc+"'"]);
    }

    GetFileName: function(ruta, filtro){
        var vec = ruta.split("\\");
        if(vec.length>0){
          var name = vec[vec.length-1];
          if(name.indexOf(filtro)!=-1){
            return name;
          }else{
            return "";
          }
        }else{
          return "";
        }
    }
};

Eventos = {

  beforeCellEdit:function(e){
    e.Global.ControlAcceso(e);
    
    var Valor = "";
    if (e.record.get("SW")!="2"){ 
       if (e.name=="RUTAV"){ 
         Valor = SM.Cursor("C02PLA2"," IdDetEtc=47");
         var z=(Valor+"").length;
         var y=e.Global.GetFileName(xRuta,"*.*"); 
         if (y!=""){    
           xruta=y.substring(z+1,y.length);    
           e.record.set("RUTAVIEW",xruta);
           e.record.set("RUTAV",y);
         }      
       }
      
       if (e.name="RUTAEV" ){ 
         Valor = SM.Cursor("C02PLA2"," IdDetEtc=46");
         var z=(Valor+"").length;
         var y=e.Global.GetFileName(xRuta,"*.*"); 
          if (y!=""){ 
            xruta=y.substring(z+1,y.length);    
            e.record.set("RUTAEDIT",xruta);
            e.record.set("RUTAEV",y);
          }   
       }
    }

  },

  validateField:function (e){
    if (e.field.name=="ESTADOGISV"){ 
          var xvalor = SM.Cursor("C02PLA2"," IdDetEtc=46");
          if ((e.record.get("RUTAVIEW")+"").length!=0 && (e.record.get("RUTAEDIT")+"").length!=0){ 
               if (e.record.get("IDMEDIO")!=20 && e.record.get("ASOCIADOGAS")=="N"){
                  e.record.set("SWMAIL","1");   // plano va para CAD
                } else { 
                if (e.record.get("IDMEDIO")!=20 && e.record.get("ASOCIADOGAS")=="S"){  
                    if (e.record.get("IDESTADODA")==50 && e.record.get("IDESTADOVER")==74){
                      e.record.set("IDESTADOGIS",16);  // Se asocia porque es VERSION de un plano ya asociado
                      e.record.set("SWMAIL","1");      // Va para CAD por que no requiere asociarlo   
                    } else { 
                      e.record.set("SWMAIL","2");   //Plano   va para GIS
                    } 
                } else {
                    if (e.record.get("IDMEDIO")==20){ 
                        //e.record.get("SWMAIL")="2"    // Va para GIS
                        if (e.record.get("ASOCIADOGAS")=="N"){
                            e.record.set("SWMAIL","1");   // plano va para CAD
                        }
                        if (e.record.get("ASOCIADOGAS")=="S"){
                            e.record.set("SWMAIL","2");    // Va para GIS
                        }
                    }
                  }
               }
             //bitacora
              var Valor = SM.Cursor("C02PLA2"," IdDetEtc="+e.record.get("IDESTADOGIS"));
              e.record.get("COMEN","ESTADO anterior="+xvalor+" => Nuevo ESTADO ="+Valor);
              e.record.get("IDOPER","92");
          } else { 
             Ext.Msg.alert("Advertencia", "Debe elegir Archivo. Verifique");     
             e.value=xvalor;
             e.record.get("IDESTADOGIS",14);     
          }    
     }
  },


  afterSave:function(e){
      
      if (e.record.get("SWMAIL")!=0){
        var xpara = "";
        if (e.record.get("SWMAIL")==1){
          xpara = SM.Cursor("C02PLA2"," IdDetEtc=81");
        } else {
          xpara = SM.Cursor("C02PLA2"," IdDetEtc=80");
        }         
        e.Global.EnviarMail(xpara);
        alert("Notificación enviada a "+xpara);
        //Ejecutar proc almacenado para insertar reg en Logplanos 
        SM.ExecStoredProcedure("BitacoraPlanos",["'"+e.record.get("IDPLANO")+"'","'"+e.record.get("IDOPER")+"'", "'@USUARIO'","'@TERMINAL'","'"+e.record.get("COMEN")+"'"]);
      }  
  },

  

  dblClick:function(e){
    if(e.name=="RUTAV" || e.name=="RUTAEV"){
        var xcampo="";
        if(e.name=="RUTAV"){
           xcampo="RUTAVIEW";
        }
        if(e.name=="RUTAEV"){
          xcampo="RUTAEDIT";
          Ext.Msg.alert("Advertencia","Archivo es editable y el programa no lo abrirá .Verifique");
          return;
        }
        var Ruta = SM.Cursor("C04PLA2"," IDPLANO='"+e.record.get("IDPLANO")+"'");
        var Ruta = Ruta + xcampo;
        SM.ShowFile(Ruta);
    }
  }              
};

