angular.module('bootstrap').controller('BootstrapController',
['$scope',
'$routeParams',
'$location',
'Page',
'$window',
function ($scope,$routeParams,$location,Page,$window){

		console.log('Controller');

		Page.setTitle("Some Title");

		//$window.document.title = 'teste';


		$scope.validateForm = function(){
			
			var emailReg=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/;
				
			$("#submitButton").click(function(e){

				if($("#inputName").val()==""){
					e.preventDefault();
					$("#inputNameFormGroup").addClass("has-error");			
				}
				else if($("#inputEmail").val()==""){
					e.preventDefault();
					$("#inputEmailFormGroup").addClass("has-error");		
				}
				else if(!emailReg.test($("#inputEmail").val())){
					e.preventDefault();
					$("#inputEmailFormGroup").addClass("has-error");	
				}
				else if($("#inputPassword").val()==""){
					e.preventDefault();
					$("#inputPasswordFormGroup").addClass("has-error");		
				}
				else if($("#inputRepeatPassword").val()==""){
					e.preventDefault();
					$("#inputRepeatPasswordFormGroup").addClass("has-error");	
				}
				else if($("#inputPassword").val()!=$("#inputRepeatPassword").val()){
					e.preventDefault();
					$("#inputPasswordFormGroup").addClass("has-error");
					$("#inputRepeatPasswordFormGroup").addClass("has-error");
					$("#placeForAlert").addClass("alert alert-warning alert-dismissable");
					$("#placeForAlert").html("<button type='button' class='close' data-dismiss='alert'><span class='glyphicon glyphicon-remove'></span></button> Password and Repeat Password must be the same");
				}
				else {
					$("#signupForm").submit();
				}
			});	
		};

	},
]);


