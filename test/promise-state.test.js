describe("promise-state", function() {
	
	describe("promiseState service", function() {

		var promiseState,
			deferred,
			promise,
			object;

		beforeEach(module('promise-state'));
		beforeEach(inject(function(_promiseState_, $q) {
			promiseState = _promiseState_;
			deferred = $q.defer();
			promise = deferred.promise;
			object = {};
		}));

		it("should allow you to decorate a promise", function() {
			promiseState.decoratePromise(promise);
			expect(typeof promise.bindPending).toBe('function');
		});

		it("should update state after binding", function() {
			promiseState.decoratePromise(promise);
			promise.bindPending(object, 'property');
			expect(object.property).toBe(true);
		});

		it("should update state after binding with custom value", function() {
			promiseState.decoratePromise(promise);
			promise.bindPending(object, 'property', 'HELLO');
			expect(object.property).toBe('HELLO');
		});

	});

	describe("module with decorated $http service", function() {

		var $http;
		
		beforeEach(function() {
			angular.module('decoratedHttpModule', ['promise-state'])
				.config(function(promiseStateProvider) {
					promiseStateProvider.decorateHttp();
				});

			module('decoratedHttpModule');
		});

		beforeEach(inject(function(_$http_) {
			$http = _$http_;
		}));

		describe("$http promise has been decorated", function() {
			it("for $http", function() {
				var promise = $http({});
				expect(typeof promise.bindPending).toBe('function');
			});
			it("for $http.get", function() {
				var promise = $http.get('test');
				expect(typeof promise.bindPending).toBe('function');
			});
			it("for $http.post", function() {
				var promise = $http.post('test');
				expect(typeof promise.bindPending).toBe('function');
			});
			it("for $http.put", function() {
				var promise = $http.put('test');
				expect(typeof promise.bindPending).toBe('function');
			});
			it("for $http.delete", function() {
				var promise = $http.delete('test');
				expect(typeof promise.bindPending).toBe('function');
			});
		});

	});

	describe("module with decorated $http service, and custom property name", function() {

		var $http;
		
		beforeEach(function() {
			angular.module('decoratedHttpModule', ['promise-state'])
				.config(function(promiseStateProvider) {
					promiseStateProvider.setPromisePropertyName('bindState');
					promiseStateProvider.decorateHttp();
				});

			module('decoratedHttpModule');
		});

		it("should return a promise with a 'bindState' property instead of 'bindPending'", inject(function($http) {
			var promise = $http.get('test');
			expect(promise.bindPending).toBeUndefined();
			expect(typeof promise.bindState).toBe('function');
		}));
	});

});