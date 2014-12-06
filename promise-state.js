(function() {

    "use strict";

    angular.module('promise-state', [])

    .provider('promiseState', function promiseStateProvider($provide) {

        var promisePropertyName = 'bindPending';

        /**
         * Send the promise property/function name (default is 'bindPending')
         */
        this.setPromisePropertyName = function(name) {
            if (!angular.isString(name)) throw new Error('promiseState function name must be a string');
            promisePropertyName = name;
        };

        /**
         * Decorate all $http promises
         */
        this.decorateHttp = function() {

            $provide.decorator('$http', ['$delegate', function($http) {

                var decoratedHttp = decoratedFn($http);

                angular.forEach($http, function(value, key) {
                    if (angular.isFunction(value)) {
                        decoratedHttp[key] = decoratedFn(value, $http);
                    } else {
                        decoratedHttp[key] = value;
                    }
                });

                return decoratedHttp;
            }]);
        };

        this.$get = function promiseStateFactory() {
            return {
                decoratePromise: decoratePromise,
                decoratedFn: decoratedFn
            };
        };

        /**
         * Decorate a promise with a 'bindPending' function
         */
        function decoratePromise(promise) {

            promise[promisePropertyName] = function(object, property, pendingValue, completedValue) {

                if (angular.isUndefined(pendingValue)) {
                    pendingValue = true;
                }

                if (angular.isUndefined(completedValue)) {
                    completedValue = false;
                }

                object[property] = pendingValue;
                return promise['finally'](function() {
                    object[property] = completedValue;
                });
            };
        }

        /**
         * Decorate a function that returns a promise
         *
         * @return a new decorated function
         */
        function decoratedFn(fn, context) {
            return function promiseStateDecoratedFn() {
                var promise = fn.apply(context || this, arguments);
                if (angular.isFunction(promise.then)) {
                    decoratePromise(promise);
                }
                return promise;
            };
        }

    });

})();
