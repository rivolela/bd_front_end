angular.module('bootstrap').controller('BootstrapController',
['$scope',
'$routeParams',
'$location',
'Page',
'$window',
function ($scope,$routeParams,$location,Page,$window){

		Page.setTitle("Some Title");

		angular.element(document).ready(function ($scope) {
            $('#inputName').tooltip({
            	trigger:'click',
            	placement:'bottom'
            });

           $("body").popover({ 
           		selector: '#popoverLink',
           		html:'true',
           		placement:'top'
           	});

           $('.panel-heading').click(function(){
				var target = $(this).data("target");
				$(target).collapse('toggle');
			});	


   //         $('.panel-heading').click(function(){
			// 	var target = $(this).data("target");
			// 	$('#accordion').on('show.bs.collapse', function () {
			// 		$('#accordion .in').collapse('hide');
			// 	});
			// 	$(target).collapse('toggle');
			// });	

			
			$('#btnExpandAll').click(function(){
				$('.collapse').collapse('toggle');
				var label=$('#btnExpandAll').text();
				var newLabel=(label=="Expand All" ? "Collapse All" : "Expand All");
				
				$('#btnExpandAll').text(newLabel);
			});	


			var counter=0;
				
			$("#btnAddProgress").click(function(){
				counter+=5;
				if(counter>100){
					counter=0;
				}
				$("#myProgressBar").css('width', counter+'%');
				$("#myProgressBar").text(counter+'%');
				
			});	

    	});

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


