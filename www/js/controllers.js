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
			var parametros = $("#formLogin").serialize()+"&accion=2";
			funciones.consultaApi(funciones.urlAPi,parametros,function(json){
				//realizo la validació
				if(json.continuar == 1)
				{
					funciones.popAlert("REGISTRO DE USUARIO",json.mensaje,function(){
						//debo enrutar al inicio de la app y levantar la sessión
						localStorage.setItem("id_usuario",json.idusuario)
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
  
.controller('sERVICIOSCtrl', ['$scope', '$stateParams','$ionicLoading','funciones', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

	$scope.mostrarMenu = 1;
}])
   
.controller('nUEVASOLICITUDCtrl', ['$scope', '$stateParams','$ionicLoading','funciones', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('mISSOLICITUDESCtrl', ['$scope', '$stateParams','$ionicLoading','funciones', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
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
	var session = localStorage.getItem("id_usuario");
	if(session == undefined)
	{
	 	$state.go('inicio');
	}
	else
	{
		//alert("hay sesion");
	}

	$scope.cerrarSession = function()
	{
		funciones.popConfirm("CERRAR SESIÓN","Está seguro que quiere salir de la aplicación, dejará de recibir notificaciones, desea confinuar",function(){
			localStorage.clear();
			$state.go('inicio');
		},$ionicPopup);
	}

})
.controller('favorCtrl', ['$scope', '$stateParams','$ionicLoading','funciones', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

	//alert("lsdkfhksdfsdklfhjkl");

}])
   
.controller('descSolCtrl', ['$scope', '$stateParams','$ionicLoading','funciones', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('notificacionesCtrl', ['$scope', '$stateParams','$ionicLoading','funciones', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('nUESTROSSERVICIOSCtrl', ['$scope', '$stateParams','$ionicLoading','funciones', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
 