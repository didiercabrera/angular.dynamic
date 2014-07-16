# Angular Dynamic

Adding Classes and Ids based on routes.

# How To

```html
<!doctype html>
<html ng-app="myApp">
<head>
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.1.5/angular.min.js"></script>
    <script src="js/angular.dynamic.js"></script>
    <script>
        var myApp = angular.module('myApp', ['angular.dynamic']);
    </script>
    ...
</head>
<body dm-id='body'>
    <header dm-id='main-header'></header>
    <div dm-class='container'></div>
    <div dm-class='second-container'></div>
</body>
</html>
```

```js

myApp.config(function (DynamicIDProvider,DynamicClassProvider){

	//Adds IDs based on the dm-id directive
	DynamicIDProvider.idByPath({
		'/about':{
			'body':'about'
		},
		'/contact':{
			'body':'contact'
		}
	});

	//Adds class based on the dm-class directive
	DynamicClassProvider.classByPath({
		'/about':{
			'container':'about-container',
			'second-container':'main-container'
		},
		'/contact':{
			'container':'contact-container'
		}
	});

});

```

# Work in Progress
