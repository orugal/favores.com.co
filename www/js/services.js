angular.module('app.services', [])

.factory('factory', [function(){

	var paquete = 
	{
		validaSession:function(){
			alert("Validando Sesión");
		}
	}

	return paquete;

}])

.service('BlankService', [function(){

}]);