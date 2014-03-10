// Definicion de la variable que agrupa los recursos.
WorkSpace = {
    Url: {
        BasePath: BasePath,

        DatosDeSesion: BasePath + 'login/DatosDeSesion',

        Campos_QBE: BasePath + 'QBE/fields',
        GuardarConsulta: BasePath + 'QBE/guardarConsulta',
        EliminarConsulta: BasePath + 'QBE/eliminarConsulta',


        Login: BasePath + 'login/Login',
        Autenticacion: BasePath + 'login/Autenticacion',
        cambiarcontrasena: BasePath + 'login/CambiarContrasena',
        Core_Store_Iconos_Panel: BasePath + 'Menu/PanelControl',
        Core_Store_Menu: BasePath + 'Menu',
        Login_Store_Aplicaciones: BasePath + 'login/TraerAplicaciones',
        Login_Store_Entornos: BasePath + 'login/TraerEntornos',
        Login_Select_Conexion: BasePath + 'login/seleccionarConexion',
        Login_Store_Conexiones: BasePath + 'login/conexiones',
        CerrarSesion: BasePath + 'login/cerrarSesion',

        Meta_Pcl: BasePath + 'PCL/metaData',
        SaveTabs: BasePath + 'PCL/saveTabs',
        ResetTabs: BasePath + 'PCL/reserTabs',
        Link_Pcl: BasePath + 'PCL/links',
        Datos_Pcl: BasePath + 'PCL/datos',
        validar_Zoom: BasePath + 'PCL/validarZoom',

        Crud: BasePath + 'PCL/crud',
        Opcion: BasePath + 'Opcion',
        OpcionZoom: BasePath + 'Opcion/Zoom',

        Exp_Word: BasePath + 'Impresion/ExportarWord',
        Exp_Pdf: BasePath + 'Impresion/ExportarPDF',
        Exp_Excel: BasePath + 'Impresion/ExportarExcel',

        crearAccesoDirecto: BasePath + 'Menu/crearAccesoDirecto',
        eliminarAccesoDirecto: BasePath + 'Menu/eliminarAccesoDirecto',

        eliminarMarca: BasePath + 'PCL/eliminarMarca',
        limpiarMarcas: BasePath + 'PCL/limpiarMarcas',
        marcar: BasePath + 'PCL/marcar',
        NotaMarca: BasePath + 'PCL/NotaMarca',

        Cursor: BasePath + 'SM/Cursor',
        ExecFunctionEscalar: BasePath + 'SM/ExecFunctionEscalar',
        ExecFunction: BasePath + 'SM/ExecFunction',
        ExecStoredProcedureEscalar: BasePath + 'SM/ExecStoredProcedureEscalar',
        ExecStoredProcedure: BasePath + 'SM/ExecStoredProcedure',
        ShowFile: BasePath + 'SM/ShowFile'


    },
    Label: {

        Titulo_Ventana_Comando: 'Comando',
        Boton_Comando: 'Comando',
        Boton_Add: 'Nuevo',
        Boton_Edit: 'Editar',
        Boton_Remove: 'Eliminar',
        Boton_Find: 'Buscar FT',
        Boton_Panel_Control: 'Panel',
        Boton_Load_Menu: 'Refrescar',
        Boton_Cerrar_Sesion: 'Cerrar sesion',
        Boton_Siguiente: 'Siguiente',
        Boton_Atras: 'Atras',
        Menu_Nueva_Opcion: 'Nueva Opcion',
        Menu_Nueva_Carpeta: 'Nueva Carpeta',
        Menu_Eliminar_Elemento: 'Borrar Elemento',
        Titulo_TreePanel_Menu: 'Menu',
        Titulo_Panel_Vinculos:'Vinculos',
        Titulo_Grilla_Historias: 'Historia',
        Encabezado_Columna_Hora:'Hora',
        Encabezado_Columna_Operacion:'Operacion',
        Encabezado_Columna_Tipo:'Tipo',
        Encabezado_Columna_Opcion: 'Opcion',
        Titulo_Vista_Panel_Control: 'Panel de control',
        Boton_Aceptar: 'Aceptar',
        Boton_Cancelar: 'Cancelar',
        Boton_DataBaseEdit: 'Conexión',
        Error_Login: 'Error',
        Informacion_Login: 'Informacion',
        Informacion: 'Informacion',
        Titulo_Ventana_Autorizacion: 'Autorización',
        Titulo_Ventana_Conexiones: 'Conexiones',
        Grilla_Aut_Encabezado_Aplicacion: 'Aplicacion',
        Grilla_Con_Encabezado_Name: 'Nombre',
        Grilla_Con_Encabezado_String: 'String',
        Grilla_Aut_Encabezado_IdAplicacion: 'Id',
        Grilla_Ent_Encabezado_Entorno: 'Entorno',
        Grilla_Ent_Encabezado_CodEntorno: 'Id',
        Boton_Cargar_Aplicacion: 'Cargar Aplicación',
        Titulo_Ventana_Autenticacion: 'Autenticación',
        Titulo_Ventana_Conexiones: 'Conexiones',
        Textfield_Usuario: 'Usuario',
        Textfield_Contraseña: 'Contraseña',
        Combo_Aplicacion:'Aplicación',
        Combo_Entorno: 'Entorno',
        Titulo_Ventana_SmText: 'Texto',
        Exp_Word: 'Word',
        Exp_Pdf: 'PDF',
        Exp_Excel: 'Excel',
        Cambiar_Contrasena: 'Cambiar contraseña',
        Textfield_Contraseña_nueva: 'Nueva',
        Textfield_Contraseña_actual: 'Actual',
        Textfield_Contraseña_confirmacion: 'Confirmacion',
        Marcar: 'Marcar',
        EliminarMarca: 'Eliminar Marca',
        MarcaAvanzada: 'Avanzada',
        LimpiarMarca: 'Limpiar',
        TodasMarcas: 'Todas',
        Enviando: 'Enviando Datos...',
        Boton_Refrecar_Tabs: 'Refrecar',
        Boton_Restaurar_Tabs: 'Restaurar',
        Boton_Crear_Tabs: 'Crear pestaña',
        Boton_Mover_Izquierda: 'Mover Pestaña Izquierda',
        Boton_Mover_Deracha: 'Mover Pestaña Derecha',
        Boton_Guardar_Tabs: 'Guardar pestañas',
        Empresa: '<b>Empresa:</b>&nbsp',
        Aplicacion: '<b>Aplicacion:</b>&nbsp',
        Entorno: '<b>Entorno:</b>&nbsp',
        Modo_Edicion:'<font color="red">Modo de edición</font>',
        Title_Cambio_contrasena: 'Cambiar contraseña',
        CambiarUsuario: 'Cambiar Usuario',
        GuardarGrafica: 'Guardar imagen',
        TituloGrafica: 'Graficas +',
        vIndependiente: 'Variable Independiente',
        vDependiente: 'Variable Dependiente',
        barraH: 'Barras H',
        barraV: 'Barras V',
        pie: 'Torta',
        Line: 'Lineas',
        BarrasVertical: 'Barras verticales',
        BarrasHorizontales: 'Barras horizontales'

    },
    Msg: {
        DatosIncorrectos: 'El nombre de usuario o la contraseña introducidos no son correctos',
        Texto_Ingrese_Comando: 'Digite El Comando',
        Carga_Opcion_Fallida: 'la opcion no se pudo cargar',
        Tooltip_Boton_Comando: 'Ejecuta un Comando Conocido',
        Tooltip_Boton_Panel_Control: 'Mostrar panel de control',
        Tooltip_Boton_Load_Menu: 'Refrescar el menu principal',
        Cargando: 'Cargando...',
        Texto_Ingrese_Usuario: 'Debe ingresar un usuario',
        Autenticando: 'Autenticando...',
        Autorizando: 'Autorizando...',
        Sin_Aplicaciones_Asignadas: 'No tiene aplicaciones asignadas',
        Accion_No_Posible: 'La accion no fue posible',
        Comando_No_Ejecutado: 'el comando no se pudo ejecutar',
        Sin_Sesion: 'No se Encontro una sesion activa',
        TabSFallo: 'los tabs no han podido ser cargados',
        LickSFallo: 'los Links no han podido ser cargados',
        Tooltip_Filtro_Qbe: 'Filtro avanzado QBE',
        Campos_Requeridos: 'Debe llenar los campos requeridos de la pestaña criterios',
        Tooltip_Add_Pcl: 'Nuevo registro',
        Tooltip_Edit_Pcl: 'Editar registro seleccionado en formulario',
        Tooltip_Remove_Pcl: 'Eliminar registro seleccionado',
        Tooltip_Boton_Up: 'Registro anterior',
        Tooltip_Boton_Down: 'Registro siguiente',
        Tooltip_Boton_Export: 'Exportar',
        Tooltip_Boton_Marcas: 'Marcas',
        Tooltip_Boton_Pestañas: 'Personalizacion',
        Tooltip_Boton_Imprimir: 'Imprimir',
        Tooltip_Boton_Cancelar_Edicion: 'Cancelar modo de edicion',
        Tooltip_Boton_Guardar_Continuar: 'Guardar y continuar',
        Tooltip_Boton_Guardar_Cambios: 'Guardar finalizar',
        Tooltip_Boton_Modo_Edicion: 'Modo de edicion',
        Paginado:'Activar/Desactivar Paginado',
        Texto_Ingrese_Memo: 'Por favor, Ingrese el texto:',
        Texto_Boton_Buscar: 'Buscar en todos los campos (Enter)',
        Texto_Boton_Limpiar: 'Limpiar Busqueda',
        No_Zoom: 'No se encontraron datos de ayuda',
        NoConexion: 'Problemas en la conexion, por favor intente mas tarde.',
        Cambiar_Contrasena: 'Cambiar la contraseña',
        Limpiar_Datos: 'Limpiar datos de usuario',
        Eliminar_registro: '¿Está seguro que desea eliminar el registro?',
        RegistroPadre: 'debe seleccionar un registro de la ventana padre',
        No_consulta: 'No fue posible eliminar esta consulta',
        NoEliminacionPlublica: 'No se puede eliminar una consulta plublica',
        Eliminar_Consulta: '¿Está seguro que desea eliminar la consulta?',
        ExisteOpcion: 'La opción ya se encuentra abierta, ¿Desea abrir otra instancia?',
        NuevaPestaña: "Escriba el nombre de la nueva pestaña",
        metadataOk: 'OPCION CARGADA CORRECTAMENTE',
        registroEliminado: 'REGISTRO ELIMINADO CORRECTAMENTE',
        registroInsertado: 'REGISTRO INSERTADO CORRECTAMENTE',
        registroModificado: 'REGISTRO MODIFICADO',
        Se_perderan_cambios: 'Los siguientes cambios se perderan',
        Se_efectuaron_cambios: 'Se efectuaran los siguientes cambios',
        Registros_Insertados: 'Registros Insertados',
        Registros_Modificados: 'Registros Modificados',
        Registros_Eliminados: 'Registros Eliminados',
        quiere_continuar: '¿Quiere continuar?',
        ContrasenaCambiada: 'Contraseña cambiada correctamente',
        NoContrasenaCambiada: 'No fue posible cambiar la contraseña',
        Ya_Existe_Pestaña: 'Ya existe una pestaña con el nombre ',
        No_Cerrar_Modo_Edicion: 'No es posible cerrar esta opcion en modo de edición',
        SesionCaducada: 'Sesión caducada ',
        ZoomNoLista: 'El valor no se encontro en la lista',
        ZoomNoListas: 'hay datos que no se encuentran en el catalogo correspondiente',
        UrlNo: 'Url con formato incorrecto!',
        FormNotValid: 'Datos incorrectos en el formulario'

    },
    sizeFile: 26214400, // en bytes  26214400 = 25 Mb
    Vistas: {},
    Variables: {},
    dataUser: {},
    pest: 0, // se usa en linea 26 ConPCL
    Marcas: {},

    /*Funciones globales para el nucleo de define*/

    MostrarMascara: function (msn,el) {
        Ext.getBody().mask(msn || WorkSpace.Msg.Cargando);
    },

    OcultarMascara: function () {
        Ext.getBody().unmask();
    },

    alert: function (title,text) {
        Ext.defer(function () {
            Ext.Msg.alert(title, text).toFront();
        }, 50);
    },

    AddColor: function(color, nombreClase) {
        color = color || "WHITE";
        nombreClase = nombreClase || "colorasignacion";
        var heads = document.getElementsByTagName('head')[0];
        var estilo = document.createElement('style');
        var css = "." + nombreClase + " > td { background:" + color + " !important; }";
        estilo.type = 'text/css';
        if (estilo.styleSheet) {
            estilo.styleSheet.cssText = css;
        } else {
            estilo.appendChild(document.createTextNode(css));
        }
        document.getElementsByTagName('head')[0].appendChild(estilo);
    },

    AddIcon: function (icon, nombreClase) {
        var heads = document.getElementsByTagName('head')[0];
        var estilo = document.createElement('style');
        var css = "." + nombreClase + " {    background-image: url(" + icon + ")!important;    background-size: 16px 16px;!important;}";
        estilo.type = 'text/css';
        if (estilo.styleSheet) {
            estilo.styleSheet.cssText = css;
        } else {
            estilo.appendChild(document.createTextNode(css));
        }
        document.getElementsByTagName('head')[0].appendChild(estilo);
    },

    TipMarca: function (val, meta, rec, rowIndex, colIndex, store) {
        if (rec.raw.SM001MKNOTAS != "" && rec.raw.SM001MKNOTAS != undefined) {
            //meta.tdCls = 'icon-user';
            meta.tdAttr = 'data-qtip="' + rec.raw.SM001MKNOTAS + '"';
            return '<img src="'+BasePath+'Recursos/Imagenes/stikyNotes.png" height="13">';
        }
    
    }
};

/* Objeto para usar en los eventos y los codigos opciones*/

SM = {

    Debug:false, // permite mostrar los error dentro de los eval (eventos y codigos opciones), solo debe se de usar para pruebas porque puede causar fallas criticas en curso de la aplicacion.

    MostrarMascara: WorkSpace.MostrarMascara,

    OcultarMascara: WorkSpace.OcultarMascara,

    Alert: WorkSpace.alert,

    Sincrono: function (parametros) {
        //realiza una solicitud sincrona con jquery
        $.ajax({
            url: parametros.url,
            type: parametros.type, // GET, POST
            async: false,
            data: parametros.data,
            success: parametros.success, // function(response)  response es un texto
            failure: parametros.failure // function ()
        });
    },

    Cursor: function (Codigo, Where, GroupBy, OrderBy) {
        /*Ejecuta select guardados en la tabla SC0CURSORES en la base de datos de APLICACION*/
        var Respuesta = [];
        SM.Sincrono({
            url: WorkSpace.Url.Cursor,
            type: 'POST',
            data: {
                Codigo: Codigo,
                Where: Where || '',
                GroupBy: GroupBy || '',
                OrderBy: OrderBy || '',
                dbDefinicion: false
            },
            success: function (response) {
                var resp = Ext.decode(response);

                if (resp.session) {
                    Respuesta = resp.datos;
                }
            },
            failure: function () {

            }
        });
        return Respuesta;
    },

    SmCursor: function (Codigo, Where, GroupBy, OrderBy) {
        /*Ejecuta select guardados en la tabla SC0CURSORES en la base de datos de DEFINIOCION*/

        var Respuesta = [];
        SM.Sincrono({
            url: WorkSpace.Url.Cursor,
            type: 'POST',
            data: {
                Codigo: Codigo,
                Where: Where     || '',
                GroupBy: GroupBy || '',
                OrderBy: OrderBy || '',
                dbDefinicion: true
            },
            success: function (response) {
                var resp = Ext.decode(response);

                if (resp.session) {
                    Respuesta = resp.datos;
                }
            },
            failure: function () {

            }
        });
        return Respuesta;
    },

    ExecFuncionEscalar: function (fn, parametros) {
        /*Ejecuta funciones en la base de datos de aplicaicon*/
        var Respuesta = [];
        SM.Sincrono({
            url: WorkSpace.Url.ExecFunctionEscalar,
            type: 'POST',
            data: {
                fn: fn,
                parametros: Ext.encode(parametros),
                dbDefinicion: false
            },
            success: function (response) {
                var resp = Ext.decode(response);

                if (resp.session) {
                    Respuesta = resp.data;
                }
            },
            failure: function () {

            }
        });
        return Respuesta;
    },

    SmExecFuncionEscalar: function (fn, parametros) {
        /*Ejecuta funciones en la base de datos de aplicaicon*/
        var Respuesta = [];
        SM.Sincrono({
            url: WorkSpace.Url.ExecFunctionEscalar,
            type: 'POST',
            data: {
                fn: fn,
                parametros: Ext.encode(parametros),
                dbDefinicion: true
            },
            success: function (response) {
                var resp = Ext.decode(response);

                if (resp.session) {
                    Respuesta = resp.data;
                }
            },
            failure: function () {

            }
        });
        return Respuesta;
    },

    ExecFuncion: function (fn, parametros) {
        /*Ejecuta funciones en la base de datos de aplicaicon*/
    var Respuesta = [];
    SM.Sincrono({
        url: WorkSpace.Url.ExecFunction,
        type: 'POST',
        data: {
            fn: fn,
            parametros: Ext.encode(parametros),
            dbDefinicion: false
        },
        success: function (response) {
            var resp = Ext.decode(response);

            if (resp.session) {
                Respuesta = resp.rows;
            }
        },
        failure: function () {

        }
    });
    return Respuesta;
    },

    SmExecFuncion: function (fn, parametros) {
        /*Ejecuta funciones en la base de datos de aplicaicon*/
        var Respuesta = [];
        SM.Sincrono({
            url: WorkSpace.Url.ExecFunction,
            type: 'POST',
            data: {
                fn: fn,
                parametros: Ext.encode(parametros),
                dbDefinicion: true
            },
            success: function (response) {
                var resp = Ext.decode(response);

                if (resp.session) {
                    Respuesta = resp.rows;
                }
            },
            failure: function () {

            }
        });
        return Respuesta;
    },

    ExecStoredProcedureEscalar: function (fn, parametros) {
        /*Ejecuta PROCEDURE CON POSIBLE RESPUESTA ESCALAR en la base de datos de aplicaicon*/
        var Respuesta = [];
        SM.Sincrono({
            url: WorkSpace.Url.ExecStoredProcedureEscalar,
            type: 'POST',
            data: {
                sp: fn,
                parametros: Ext.encode(parametros),
                dbDefinicion: false
            },
            success: function (response) {
                var resp = Ext.decode(response);

                if (resp.session) {
                    Respuesta = resp.data;
                }
            },
            failure: function () {

            }
        });
        return Respuesta;
    },

    SmExecStoredProcedureEscalar: function (fn, parametros) {
        /*Ejecuta PROCEDURE CON POSIBLE RESPUESTA ESCALAR en la base de datos de aplicaicon*/
        var Respuesta = [];
        SM.Sincrono({
            url: WorkSpace.Url.ExecStoredProcedureEscalar,
            type: 'POST',
            data: {
                sp: fn,
                parametros: Ext.encode(parametros),
                dbDefinicion: true
            },
            success: function (response) {
                var resp = Ext.decode(response);

                if (resp.session) {
                    Respuesta = resp.data;
                }
            },
            failure: function () {

            }
        });
        return Respuesta;
    },

    ExecStoredProcedure: function (fn, parametros) {
        /*Ejecuta PROCEDURE en la base de datos de aplicaicon*/
        var Respuesta = [];
        SM.Sincrono({
            url: WorkSpace.Url.ExecStoredProcedure,
            type: 'POST',
            data: {
                sp: fn,
                parametros: Ext.encode(parametros),
                dbDefinicion: false
            },
            success: function (response) {
                var resp = Ext.decode(response);

                if (resp.session) {
                    Respuesta = resp.rows;
                }
            },
            failure: function () {

            }
        });
        return Respuesta;
    },

    SmExecStoredProcedure: function (fn, parametros) {
        /*Ejecuta PROCEDURE en la base de datos de aplicaicon*/
        var Respuesta = [];
        SM.Sincrono({
            url: WorkSpace.Url.ExecStoredProcedure,
            type: 'POST',
            data: {
                sp: fn,
                parametros: Ext.encode(parametros),
                dbDefinicion: true
            },
            success: function (response) {
                var resp = Ext.decode(response);

                if (resp.session) {
                    Respuesta = resp.rows;
                }
            },
            failure: function () {

            }
        });
        return Respuesta;
    },

    ShowFile: function (url) {
        var web = url.substring(0, 4);
        var red = url.substring(0, 2);
        if (web.toUpperCase() == "HTTP") {
            var params = [
            'height=' + screen.height,
            'width=' + screen.width,
            'fullscreen=yes' 
                    ].join(',');
                  

            var popup = window.open(url, 'popup_window', params);
            popup.moveTo(0, 0);

        } else {
            //if (red.toUpperCase() == "\\\\") {
                window.open(WorkSpace.Url.ShowFile + "?fullName=" + url + "&size=" + WorkSpace.sizeFile);
            /*} else {
                Ext.Msg.alert(WorkSpace.Label.Informacion,WorkSpace.Msg.UrlNo);
            }*/
        }

    },

    GetLabelField: function (pcl, name) {
        for (var i = 0; i < pcl.metaData.fields.length; i++) {
            if (pcl.metaData.fields[i].name == name) {
                return pcl.metaData.fields[i].label;
            }
        }
        return "";
    }
};


