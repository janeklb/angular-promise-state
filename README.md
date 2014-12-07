angular-promise-state
=====================

Simple promise decoration, to bind to AngularJS promise states.

### ...

The idea behind this module is to provide the friendliest/easiest-to-use syntax for binding promise state
(ie. pending + resolution/rejection) to *something*. For example, some variable that will inform whether the
UI needs to display a loading spinner while data is loading, or the component once data has arrived.


Somewhere in a directive's controller
```javascript
  // all promises returned from $http have a 'bindPending' method
  // ($http(), $http.get(), $http.post()... etc.)
  
  $http.get('/allthethings').bindPending($scope, 'loading');
  // and now $scope.loading is true (now, as in within this tick of the event loop)
  
  // ..
  // once $http.get('/allthethings') is resolved or rejected, $scope.loading will be false
```
And in the directive's template
```html
  <!-- In your directive's template -->
  <div ng-show="loading">Loading...</div>
  <div ng-hide="loading">ALL THE THINGS!</div>
```

## Usage

To patch all $http promises with a 'bindPending' method, add the following to your config block:
```javascript
module.config(function(promiseStateProvider) {
  // you can use a different name, instead of 'bindPending':
  // promiseStateProvider.setPromisePropertyName('bindState');
  promiseStateProvider.decorateHttp();
})
```

Or, you can decorate any promise on the fly with the `promiseState` service:
```javascript
module.service('service', function($q, promiseState) {
  this.getDecoratedDeferred() {
    var deferred = $q.defer();
    promiseState.decoratePromise(deferred.promise);
    return deferred;
  };
});
```

## Installation

... Bower coming soon. 

## Notes

This is tested with Angular ~1.2.23
