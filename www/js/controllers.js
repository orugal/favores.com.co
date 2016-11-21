var $ =jQuery.noConflict();
angular.module('app.controllers', [])
  
.controller('inicioCtrl', ['$scope', '$stateParams','$ionicLoading','funciones','$ionicPopup','$ionicLoading','$location', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$ionicLoading,funciones,$ionicPopup,$ionicLoading,$location) 
{
	$scope.mostrarMenu = 0;

}])
   
.controller('registroCtrl',function ($scope, $http, $q, $stateParams,$state,$ionicLoading,funciones,$ionicPopup,$ionicLoading,$location) 
{
	$scope.mostrarMenu = 0;
	$scope.initRegistro = function()
	{
		/*var parametros = "accion=0";
		funciones.consultaApi(funciones.urlAPi,parametros,function(json){
			//realizo la validació
			if(json.continuar == 1)
			{
				funciones.popAlert("REGITRO DE USUARIO",json.mensaje,function(){
					
				},$ionicPopup);
			}
			else
			{
				funciones.popAlert("ERROR DE REGISTRO",json.mensaje,function(){

				},$ionicPopup);
			}
		},true,$ionicLoading)*/
	}

	$scope.enviaRegistro = function()
	{
		//alert("Alerta!!");
		var tituloPop	=	"COMPLETE LA INFORMACIÓN";
		//declaro las variables del registro
		$scope.nombre 		=  $("#nombre").val();
		$scope.correo 		=  $("#email").val();
		$scope.celular 		=  $("#celular").val();
		$scope.ciudad 		=  $("#ciudad").val();
		$scope.clave 		=  $("#clave").val();
		$scope.rclave 		=  $("#rclave").val();
		$scope.terminos 	=  $("#terminos:checked").val();
		
		//inicio con la validación de 
		if($scope.nombre == "" || $scope.nombre == undefined)
		{
			funciones.popAlert(tituloPop,"Debe escribir su nombre",function(){},$ionicPopup);
		}
		else if($scope.correo == undefined || $scope.correo == "")
		{
			funciones.popAlert(tituloPop,"Debe escribir un correo electrónico válido",function(){},$ionicPopup);
		}
		else if($scope.correo != "" && !funciones.validaMail($scope.correo))
		{
			funciones.popAlert(tituloPop,"El correo electrónico que ingreso no es válido, por favor verifique",function(){},$ionicPopup);
		}
		else if($scope.celular == undefined || $scope.celular == "")
		{
			funciones.popAlert(tituloPop,"Debe un número de celular de contacto",function(){},$ionicPopup);
		}
		else if($scope.celular != "" && isNaN($scope.celular))
		{
			funciones.popAlert(tituloPop,"El campo celular sólo puede contener números",function(){},$ionicPopup);
		}
		else if($scope.ciudad == undefined || $scope.ciudad == "")
		{
			funciones.popAlert(tituloPop,"Debe seleccionar la ciudad de residencia",function(){},$ionicPopup);
		}
		else if($scope.clave == undefined || $scope.clave == "")
		{
			funciones.popAlert(tituloPop,"Por favor ingrese una contraseña para su cuenta",function(){},$ionicPopup);
		}
		else if($scope.rclave == undefined || $scope.rclave == "")
		{
			funciones.popAlert(tituloPop,"Por favor repita la contraseña que acaba de ingresar",function(){},$ionicPopup);
		}
		else if($scope.rclave != "" && $scope.rclave != $scope.clave)
		{
			funciones.popAlert(tituloPop,"Las contraseñas no coinciden, por favor verifique",function(){},$ionicPopup);
		}
		else if(!$('#terminos').prop('checked'))
		{
			funciones.popAlert(tituloPop,"Debe aceptar los términos y condiciones",function(){},$ionicPopup);
		}
		else
		{
			//primedo realizo una confirmación
			funciones.popConfirm("PROCESODE REGISTRO","Está a punto de crear un usuario para la aplicación Favores.com.co, desea confinuar",function(){
				//procdeo a consular ajax para hacer la inserción del usuario nuevo
				var parametros = $("#formRegistro").serialize()+"&accion=1";
				funciones.consultaApi(funciones.urlAPi,parametros,function(json){
					//realizo la validació
					if(json.continuar == 1)
					{
						funciones.popAlert("REGISTRO DE USUARIO",json.mensaje,function(){
							$state.go('login');
						},$ionicPopup);
					}
					else
					{
						funciones.popAlert("ERROR DE REGISTRO",json.mensaje,function(){

						},$ionicPopup);
					}
				},true,$ionicLoading)
				
			},$ionicPopup)

		}
	}
})

//controlador del login
.controller('loginCtrl',function ($scope,$http, $q, $stateParams,$state,$ionicLoading,funciones,$ionicPopup,$ionicLoading,$location) 
{
	//alert("Alerta!!");
	$scope.validaLogin = function()
	{
	 	$scope.username 	= $("#username").val();
		$scope.contrasena 	= $("#contrasena").val();
		var tituloPop	=	"COMPLETE LA INFORMACIÓN";

		//inicio con la validación de 
		if($scope.username == undefined || $scope.username == "")
		{
			funciones.popAlert(tituloPop,"Debe escribir su nombre de usuario",function(){},$ionicPopup);
		}
		else if($scope.contrasena == undefined || $scope.contrasena == "")
		{
			funciones.popAlert(tituloPop,"Debe escribir su contraseña de acceso",function(){},$ionicPopup);
		}
		else
		{
			//procdeo a consular ajax para hacer la inserción del usuario nuevo
			var parametros = $("#formLogin").serialize()+"&codigoCelular="+localStorage['celular']+"&accion=2";
			funciones.consultaApi(funciones.urlAPi,parametros,function(json){
				//realizo la validació
				if(json.continuar == 1)
				{
					funciones.popAlert("REGISTRO DE USUARIO",json.mensaje,function(){
						//debo enrutar al inicio de la app y levantar la sessión
						localStorage["id_usuario"] = json.datos.idusuario;
						$state.go('menu.sERVICIOS');
					},$ionicPopup);
				}
				else
				{
					funciones.popAlert("ERROR DE REGISTRO",json.mensaje,function(){

					},$ionicPopup);
				}
			},true,$ionicLoading)
		}
	}

})
  
.controller('sERVICIOSCtrl', function ($scope,$http, $q, $stateParams,$state,$ionicLoading,funciones,$ionicPopup,$ionicLoading,$location){

	$scope.mostrarMenu = 1;
	$scope.listaServicios = [];

	$scope.initServicios = function()
	{
		$scope.getServicios();
	}
	$scope.refreshServicios = function()
	{
		$scope.getServicios();
		$scope.$broadcast('scroll.refreshComplete');
	}
	$scope.getServicios = function()
	{
		var parametros = "&accion=3";
		funciones.consultaApi(funciones.urlAPi,parametros,function(json){
			//realizo la validació
			if(json.continuar == 1)
			{
				$scope.listaServicios  = json.datos;
			}
		},false,$ionicLoading)
	}
})


.controller('detalleServicio', function ($scope,$http, $q, $stateParams,$state,$ionicLoading,$ionicHistory,funciones,$ionicPopup,$ionicLoading,$location) 
{
	$scope.dataServicio = [];
	$scope.myGoBack = function() 
	{
	    $ionicHistory.goBack();
	};


	var parametros = "&accion=3&idServicio="+$stateParams.idServicio;
	funciones.consultaApi(funciones.urlAPi,parametros,function(json){
		//realizo la validació
		if(json.continuar == 1)
		{
			$scope.dataServicio  = json.datos;
			$scope.contenidoPanel  = json.datos[0].contenido
		}
	},true,$ionicLoading)
	
	//alert("dkfhsdkfjdhskf");
})
   
.controller('nuevaSolicitud', function ($scope,$http, $q, $stateParams,$state,$ionicLoading,$ionicHistory,funciones,$ionicPopup,$ionicLoading,$location,ionicTimePicker) 
{

	$scope.listaServicios = [];
	$scope.volver = function() 
	{
	//	$scope.compileAngularElement("#page8");
	    $ionicHistory.goBack();
	}

	$scope.initSolicitudN = function()
	{
		$scope.getServicios();
	}

	$scope.openTimePicker1 = function (caja) {
      var ipObj1 = {
        callback: function (val) {
          if (typeof (val) === 'undefined') {
            console.log('Time not selected');
          } else {
            var selectedTime = new Date(val * 1000);
            //console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
            var min = (selectedTime.getUTCMinutes() == 0)?"00":selectedTime.getUTCMinutes();
            $(caja).val(selectedTime.getUTCHours()+":"+min);
          }
        },
        inputTime: 50400,
        format: 24,
        setLabel: 'DEFINIR',
        closeLabel: 'CERRAR'
      };
      ionicTimePicker.openTimePicker(ipObj1);
    }

	$scope.getServicios = function()
	{
		var parametros = "&accion=3";
		funciones.consultaApi(funciones.urlAPi,parametros,function(json){
			//realizo la validació
			if(json.continuar == 1)
			{
				$scope.listaServicios  = json.datos;
			}
		},true,$ionicLoading)
	}

	$scope.poneFormulario = function(id)
	{
		var idSel	=	$("#servicio").find(':selected').val();
		var dataSel	=	$("#servicio").find(':selected').data('form')
		var ejemplo	=	$("#servicio").find(':selected').data('ejemplo')
		//habilito el formulario necesario
		$(".forms").hide();
		$("#ejemplo").html("");
		$("#ejemplo").html("Ej: "+ejemplo);
		$("#form"+dataSel).fadeIn();
		$("#formCaja").val(dataSel);
	}


	$scope.compileAngularElement = function(elSelector) 
	{
	    var elSelector = (typeof elSelector == 'string') ? elSelector : null ;  
	        // The new element to be added
	    if (elSelector != null ) {
	        var $div = $( elSelector );

	            // The parent of the new element
	            var $target = $("[ng-app]");

	          angular.element($target).injector().invoke(['$compile', function ($compile) {
	                    var $scope = angular.element($target).scope();
	                    $compile($div)($scope);
	                    // Finally, refresh the watch expressions in the new element
	                    $scope.$apply();
	                }]);
	        }
    }

	$scope.saveSolicitud = function()
	{
		//alert("Asdasdsad")
		var servicio 		= 	$("#servicio").val();
		var form 			= 	$("#formCaja").val();
		
		var formCompleto 	=	false;
		var tituloPop		=	"Formulario solicitud";
		var session 		= localStorage["id_usuario"];

		//valido el formulario para saber que validaciones debo hacer
		if(form == 1)//formulario sencillo
		{
			var fecha			=	$("#fecha").val();
			var hora			=	$("#hora").val();
			var contenidoFavor	=	$("#contenidoFavor").val();
			//valido campos
			if(fecha == "")
			{
				funciones.popAlert("Formulario de solicitud","Seleccione la fecha del favor",function(){},$ionicPopup);
			}
			else if(hora == "")
			{
				funciones.popAlert("Formulario de solicitud","Seleccione la hora del favor",function(){},$ionicPopup);
			}
			else if(contenidoFavor == "")
			{
				funciones.popAlert("Formulario de solicitud","Especifique con detalles el favor que desea que relicemos",function(){},$ionicPopup);
			}
			else
			{
				formCompleto 	=	true;
				var parametros = "form="+form+"&accion=6&fecha="+fecha+"&hora="+hora+"&texto="+contenidoFavor+"&usuario="+session+"&servicio="+servicio;
			}
		}
		else if(form == 2)//solo datos de origen
		{
			var fecha			=	$("#fecha2").val();
			var hora			=	$("#hora2").val();
			var contenidoFavor	=	$("#contenidoFavor2").val();
			var direccion1 	 	= 	$("#direccion1").val();
			var persona1  		= 	$("#persona1").val();
			var telefono1  		= 	$("#telefono1").val();

			if(fecha == "")
			{
				funciones.popAlert("Formulario de solicitud","Seleccione la fecha del favor",function(){},$ionicPopup);
			}
			else if(hora == "")
			{
				funciones.popAlert("Formulario de solicitud","Seleccione la hora del favor",function(){},$ionicPopup);
			}
			else if(direccion1 == "")
			{
				funciones.popAlert("Formulario de solicitud","Por favor escriba la dirección de origen.",function(){},$ionicPopup);
			}
			else if(persona1 == "")
			{
				funciones.popAlert("Formulario de solicitud","Por favor escriba el nombre del contacto con el que debemos comunicarnos.",function(){},$ionicPopup);
			}
			else if(telefono1 == "")
			{
				funciones.popAlert("Formulario de solicitud","Por favor escriba un número de teléfono de contacto.",function(){},$ionicPopup);
			}
			else if(contenidoFavor == "")
			{
				funciones.popAlert("Formulario de solicitud","Especifique con detalles del favor que desea que relicemos",function(){},$ionicPopup);
			}
			else
			{
				formCompleto 	=	true;
				var parametros = "form="+form+"&accion=6&fecha="+fecha+"&hora="+hora+"&texto="+contenidoFavor+"&usuario="+session+"&servicio="+servicio+"&direccion1="+direccion1+"&persona1="+persona1+"&telefono1="+telefono1;
			}
		}
		else if(form == 3)//solo datos de destino
		{
			var fecha			=	$("#fecha3").val();
			var hora			=	$("#hora3").val();
			var contenidoFavor	=	$("#contenidoFavor3").val();
			var direccion2 	 	= 	$("#direccion2").val();
			var persona2  		= 	$("#persona2").val();
			var telefono2  		= 	$("#telefono2").val();

			if(fecha == "")
			{
				funciones.popAlert("Formulario de solicitud","Seleccione la fecha del favor",function(){},$ionicPopup);
			}
			else if(hora == "")
			{
				funciones.popAlert("Formulario de solicitud","Seleccione la hora del favor",function(){},$ionicPopup);
			}
			else if(direccion2 == "")
			{
				funciones.popAlert("Formulario de solicitud","Por favor escriba la dirección de destino.",function(){},$ionicPopup);
			}
			else if(persona2 == "")
			{
				funciones.popAlert("Formulario de solicitud","Por favor escriba el nombre del contacto con el que debemos comunicarnos.",function(){},$ionicPopup);
			}
			else if(telefono2 == "")
			{
				funciones.popAlert("Formulario de solicitud","Por favor escriba un número de teléfono de contacto.",function(){},$ionicPopup);
			}
			else if(contenidoFavor == "")
			{
				funciones.popAlert("Formulario de solicitud","Especifique con detalles del favor que desea que relicemos",function(){},$ionicPopup);
			}
			else
			{
				formCompleto 	=	true;
				var parametros = "form="+form+"&accion=6&fecha="+fecha+"&hora="+hora+"&texto="+contenidoFavor+"&usuario="+session+"&servicio="+servicio+"&direccion2="+direccion2+"&persona2="+persona2+"&telefono2="+telefono2;
			}

		}
		else if(form == 4)//datos de origen y destino
		{
			var fecha			=	$("#fecha4").val();
			var hora			=	$("#hora4").val();
			var direccion1 	 	= 	$("#direccion14").val();
			var persona1  		= 	$("#persona14").val();
			var telefono1  		= 	$("#telefono14").val();
			var direccion2 	 	= 	$("#direccion24").val();
			var persona2  		= 	$("#persona24").val();
			var telefono2  		= 	$("#telefono24").val();
			var contenidoFavor	=	$("#contenidoFavor4").val();

			if(fecha == "")
			{
				funciones.popAlert("Formulario de solicitud","Seleccione la fecha del favor",function(){},$ionicPopup);
			}
			else if(hora == "")
			{
				funciones.popAlert("Formulario de solicitud","Seleccione la hora del favor",function(){},$ionicPopup);
			}
			else if(direccion1 == "")
			{
				funciones.popAlert("Formulario de solicitud","Por favor escriba la dirección de origen.",function(){},$ionicPopup);
			}
			else if(persona1 == "")
			{
				funciones.popAlert("Formulario de solicitud","Por favor escriba el nombre del contacto con el que debemos comunicarnos.",function(){},$ionicPopup);
			}
			else if(telefono1 == "")
			{
				funciones.popAlert("Formulario de solicitud","Por favor escriba un número de teléfono de contacto.",function(){},$ionicPopup);
			}
			else if(direccion2 == "")
			{
				funciones.popAlert("Formulario de solicitud","Por favor escriba la dirección de destino.",function(){},$ionicPopup);
			}
			else if(persona2 == "")
			{
				funciones.popAlert("Formulario de solicitud","Por favor escriba el nombre del contacto con el que debemos comunicarnos.",function(){},$ionicPopup);
			}
			else if(telefono2 == "")
			{
				funciones.popAlert("Formulario de solicitud","Por favor escriba un número de teléfono de contacto.",function(){},$ionicPopup);
			}
			else if(contenidoFavor == "")
			{
				funciones.popAlert("Formulario de solicitud","Especifique con detalles del favor que desea que relicemos",function(){},$ionicPopup);
			}
			else
			{
				formCompleto 	=	true;
				var parametros = "form="+form+"&accion=6&fecha="+fecha+"&hora="+hora+"&texto="+contenidoFavor+"&usuario="+session+"&servicio="+servicio+"&direccion1="+direccion1+"&persona1="+persona1+"&telefono1="+telefono1+"&direccion2="+direccion2+"&persona2="+persona2+"&telefono2="+telefono2;
			}
		}


		//valido si el formulario está completo para el envio
		if(formCompleto)
		{

			funciones.popConfirm("CONFIRMACIÓN","Está a punto de enviar una solicitud con la información ingresada, desea confinuar",function(){
					funciones.consultaApi(funciones.urlAPi,parametros,function(json){
						//realizo la validació
						if(json.continuar == 1)
						{
							funciones.popAlert("SOLICITUD EXITOSA",json.mensaje,function(){
								$state.go('misolicitudes');
							},$ionicPopup);
						}
						else
						{
							funciones.popAlert("ERROR DE SOLICITUD",json.mensaje,function(){},$ionicPopup);
						}
					},true,$ionicLoading)
			},$ionicPopup);

			
		}
	}

})
   
.controller('missolicitudes', function ($scope,$http, $q, $stateParams,$state,$ionicLoading,$ionicHistory,funciones,$ionicPopup,$ionicLoading,$location) 
{

	$scope.listaSolicitudes = [];
	var session = localStorage["id_usuario"];
	$scope.initSolicitudes = function()
	{
		$scope.getSolicitudes();
	}
	$scope.refreshSolicitudes = function()
	{
		$scope.getSolicitudes();
		$scope.$broadcast('scroll.refreshComplete');
	}
	$scope.getSolicitudes = function()
	{
		
		var parametros = "&accion=5&usuario="+session;
		funciones.consultaApi(funciones.urlAPi,parametros,function(json){
			//realizo la validació
			if(json.continuar == 1)
			{
				$scope.listaSolicitudes  = json.datos;
			}
		},true,$ionicLoading)
	}
})


.controller('descSolCtrl', function ($scope,$http, $q, $stateParams,$state,$ionicLoading,$ionicHistory,funciones,$ionicPopup,$ionicLoading,$location) 
{
	$scope.dataSolicitud = [];
	var session = localStorage["id_usuario"];
	$scope.myGoBack = function() 
	{
	    $ionicHistory.goBack();
	};

	$scope.initDetalleSolicitud = function()
	{
		$scope.getInfoSolicitud();
	}

	$scope.refreshSolicitudes = function()
	{
		$scope.getInfoSolicitud();
		$scope.$broadcast('scroll.refreshComplete');
	}

	$scope.getInfoSolicitud = function()
	{
		var parametros = "accion=5&idSolicitud="+$stateParams.solicitud+"&usuario="+session;
		funciones.consultaApi(funciones.urlAPi,parametros,function(json){
			//realizo la validació
			if(json.continuar == 1)
			{
				$scope.dataSolicitud  = json.datos[0];
			}
		},true,$ionicLoading)
	}

	

})


   
.controller('eDITARINFORMACINCtrl', ['$scope', '$stateParams','$ionicLoading','funciones', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('cONTACTENOSCtrl', ['$scope', '$stateParams','$ionicLoading','funciones', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('menuCtrl',function ($scope,$http, $q, $stateParams,$state,$ionicLoading,funciones,$ionicPopup,$ionicLoading,$location) 
{
	$scope.mostrarMenu = 0;
	$scope.dataUsuario = []
	
	var session = localStorage["id_usuario"];
	

	$scope.initMenu = function()
	{
		if(session == undefined)
		{
		 	$state.go('inicio');
		}
		else
		{
			//alert(session)
			//alert("hay sesion");
		}
		$scope.consultaInfoUsuario();
	}
	$scope.cerrarSession = function()
	{
		funciones.popConfirm("CERRAR SESIÓN","Está seguro que quiere salir de la aplicación, dejará de recibir notificaciones, desea confinuar",function(){
			localStorage.clear();
			$state.go('inicio');
		},$ionicPopup);
	}

	$scope.consultaInfoUsuario = function()
	{
		var parametros = "accion=4&idusuario="+session;
		funciones.consultaApi(funciones.urlAPi,parametros,function(json){
			//realizo la validació
			if(json.continuar == 1)
			{
				$scope.dataUsuario  = json.datos;
				$scope.$digest();
			}
		},true,$ionicLoading)
	}

})
.controller('favorCtrl', function ($scope,$http, $q, $stateParams,$state,$ionicLoading,funciones,$ionicPopup,$ionicLoading,$location) 
{

	$scope.initFavor = function()
	{
		alert("llega")
	}
	$scope.poneFormulario = function()
	{
		alert("jsdkjsadk");
	}

})
   

   
.controller('notificacionesCtrl', ['$scope', '$stateParams','$ionicLoading','funciones', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   

 