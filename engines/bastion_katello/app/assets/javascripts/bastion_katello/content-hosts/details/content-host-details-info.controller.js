/**
 * @ngdoc object
 * @name  Bastion.content-hosts.controller:ContentHostDetailsController
 *
 * @requires $scope
 * @requires $q
 * @requires translate
 * @requires ContentHost
 * @requires ContentView
 * @requires Organization
 * @requires CurrentOrganization
 * @requires CurrentHostsHelper
 *
 * @description
 *   Provides the functionality for the content host details action pane.
 */
angular.module('Bastion.content-hosts').controller('ContentHostDetailsInfoController',
    ['$scope', '$q', 'translate', 'ContentHost', 'ContentView', 'Organization', 'CurrentOrganization', 'ContentHostsHelper',
    function ($scope, $q, translate, ContentHost, ContentView, Organization, CurrentOrganization, ContentHostsHelper) {
        function dotNotationToObj(dotString) {
            var dotObject = {}, tempObject, parts, part, key, property;
            for (property in dotString) {
                if (dotString.hasOwnProperty(property)) {
                    tempObject = dotObject;
                    parts = property.split('.');
                    key = parts.pop();
                    while (parts.length) {
                        part = parts.shift();
                        tempObject = tempObject[part] = tempObject[part] || {};
                    }
                    tempObject[key] = dotString[property];
                }
            }
            return dotObject;
        }

        function populateExcludedFacts() {
            var index = 0;

            $scope.advancedInfoLeft = {};
            $scope.advancedInfoRight = {};

            angular.forEach($scope.contentHostFacts, function (value, key) {
                if (index % 2 === 0) {
                    $scope.advancedInfoLeft[key] = value;
                } else {
                    $scope.advancedInfoRight[key] = value;
                }
                index = index + 1;
            });
            $scope.hasAdvancedInfo = Object.keys($scope.advancedInfoLeft).length > 0 ||
                Object.keys($scope.advancedInfoRight).length > 0;

        }

        $scope.successMessages = [];
        $scope.errorMessages = [];

        $scope.showVersionAlert = false;
        $scope.editContentView = false;
        $scope.disableEnvironmentSelection = false;
        $scope.environments = [];

        $scope.environments = Organization.readableEnvironments({id: CurrentOrganization});

        $scope.contentHost.$promise.then(function () {
            $scope.contentHostFacts = dotNotationToObj($scope.contentHost.facts);
            populateExcludedFacts();
            $scope.originalEnvironment = $scope.contentHost.environment;
        });

        $scope.$watch('contentHost.environment', function (environment) {
            if (environment && $scope.originalEnvironment) {
                if (environment.id !== $scope.originalEnvironment.id) {
                    $scope.editContentView = true;
                    $scope.disableEnvironmentSelection = true;
                }
            }
        });

        $scope.cancelReleaseVersionUpdate = function () {
            $scope.showVersionAlert = false;
        };

        $scope.cancelContentViewUpdate = function () {
            if ($scope.editContentView) {
                $scope.editContentView = false;
                $scope.contentHost.environment = $scope.originalEnvironment;
                $scope.disableEnvironmentSelection = false;
            }
        };

        $scope.saveContentView = function (contentHost) {
            $scope.editContentView = false;
            $scope.save(contentHost).then(function (response) {
                $scope.originalEnvironment = response.environment;
            });
            $scope.disableEnvironmentSelection = false;
        };

        $scope.releaseVersions = function () {
            var deferred = $q.defer();

            ContentHost.releaseVersions({ id: $scope.contentHost.uuid }, function (response) {
                if (response.total === 0) {
                    $scope.showVersionAlert = true;
                }
                deferred.resolve(response.results);
            });

            return deferred.promise;
        };

        $scope.clearReleaseVersion = function () {
            $scope.contentHost['release_ver'] = '';
            $scope.save($scope.contentHost);
        };

        $scope.clearServiceLevel = function () {
            $scope.contentHost['service_level'] = '';
            $scope.save($scope.contentHost);
        };

        $scope.contentViews = function () {
            var deferred = $q.defer();

            ContentView.queryUnpaged({ 'environment_id': $scope.contentHost.environment.id}, function (response) {
                deferred.resolve(response.results);
                $scope.contentViews = response.results;
            });

            return deferred.promise;
        };

        $scope.getActivationKeyLink = function (activationKey) {
            return '/activation_keys!=&panel=activation_key_%s&panelpage=edit'.replace('%s', activationKey.id);
        };

        $scope.getTemplateForType = function (value) {
            var template = 'content-hosts/details/views/partials/content-host-detail-value.html';
            if (angular.isObject(value)) {
                template = 'content-hosts/details/views/partials/content-host-detail-object.html';
            }
            return template;
        };

        $scope.memory = ContentHostsHelper.memory;

        $scope.virtualGuestIds = function (contentHost) {
            var ids = [];
            angular.forEach(contentHost['virtual_guests'], function (host) {
                ids.push('id:%s'.replace('%s', host.id));
            });

            return ids.join(" ");
        };
    }]
);
