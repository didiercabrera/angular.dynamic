/* 
@AUTHOR Didier Cabrera

Adding Dynamic Classes and Ids based on routes

*/

;(function(angular,undefined) {
	'use strict';

	var app=angular.module('angular.dynamic',[]);
	
	app.provider('DynamicClass',[function (){
		var class_hash_map={};
		function dynamicClass ($rootScope,dmService,$q) {
			dmService.all_classes=class_hash_map;

			var methods={
				getClassFromMap:function(location){
					var class_dict_found;
					var defered=$q.defer();
					for(var key in class_hash_map) {
						if(location.indexOf(key)!==-1){
							class_dict_found=class_hash_map[key]
							dmService.last_class_item=class_dict_found;
							defered.resolve(class_dict_found);
							$rootScope.$broadcast('$ClassMapFound');
						}
					}
					return defered.promise;	
				},
				classByPath:function(class_hash){
					for(var key in class_hash) {
						class_hash_map[key]=class_hash[key];
					}
					dmService.all_classes=class_hash_map;
				}
			};

			return methods;
		};

		this.classByPath=function( class_hash ){
			for(var key in class_hash) {
				class_hash_map[key]=class_hash[key];
			}
		};

		this.$get = ['$rootScope','dmService','$q', function($rootScope,dmService,$q){
			return new dynamicClass($rootScope,dmService,$q);
		}];
	}]);

	app.provider('DynamicID',[function (){
		var id_hash_map={};
		function dynamicID ($rootScope,dmService,$q) {
			dmService.all_ids=id_hash_map;

			var methods={
				getIDFromMap:function(location){
					var id_dict_found;
					var defered=$q.defer();
					for(var key in id_hash_map) {
						if(location.indexOf(key)!==-1){
							id_dict_found=id_hash_map[key]
							dmService.last_id_item=id_dict_found;
							defered.resolve(id_dict_found);
							$rootScope.$broadcast('$idMapFound');
						}
					}
					return defered.promise;	
				},
				idByPath:function(id_hash){
					for(var key in id_hash) {
						id_hash_map[key]=id_hash[key];
					}
					dmService.all_ids=id_hash_map;
				}
			};

			return methods;
		};

		this.idByPath=function( id_hash ){
			for(var key in id_hash) {
				id_hash_map[key]=id_hash[key];
			}
		};

		this.$get = ['$rootScope','dmService','$q', function($rootScope,dmService,$q){
			return new dynamicID($rootScope,dmService,$q);
		}];		
	}]);

	app.factory('dmService',[function(){
		var dm={
			all_classes:{},
			all_ids:{},
			last_class_item:{},
			last_id_item:{}
		};

		return dm;
	}]);

	app.directive('dmClass',['$location','dmService','DynamicClass','$timeout',function($location,dmService,DynamicClass,$timeout) {
		return {
			restrict: 'A',
			scope: {
				'dmClass':'@'
			},
			link: function(scope, element, attrs) {
				scope.$on('$locationChangeStart', function(){
					$timeout(function(){
						DynamicClass.getClassFromMap($location.$$path).then(function(classes){
							scope.class_found=classes[scope.dmClass];
					    	element.addClass(scope.class_found);
						});
					},100);//FIXING FOUC
				});
				DynamicClass.getClassFromMap($location.$$path).then(function(classes){
					scope.class_found=classes[scope.dmClass];
					element.addClass(scope.class_found);
				});

			}
		};
	}]);

	app.directive('dmId',['$location','dmService','DynamicID','$timeout',function($location,dmService,DynamicID,$timeout) {
		return {
			restrict: 'A',
			scope: {
				'dmId':'@'
			},
			link: function(scope, element, attrs) {
				scope.id_found="";
				scope.$on('$locationChangeStart', function(){
					$timeout(function(){
						DynamicID.getIDFromMap($location.$$path).then(function(ids){
							scope.id_found=ids[scope.dmId];
					    	element.attr("id",scope.id_found);
						});						
					},100);
				});	
				DynamicID.getIDFromMap($location.$$path).then(function(ids){
					scope.id_found=ids[scope.dmId];
			    	element.attr("id",scope.id_found);
				});			
			}
		};
	}]);

}(angular));