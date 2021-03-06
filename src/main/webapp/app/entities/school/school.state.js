(function() {
    'use strict';

    angular
        .module('alexandriaApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('school', {
            parent: 'entity',
            url: '/school',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'alexandriaApp.school.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/school/schools.html',
                    controller: 'SchoolController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('school');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('school-detail', {
            parent: 'entity',
            url: '/school/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'alexandriaApp.school.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/school/school-detail.html',
                    controller: 'SchoolDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('school');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'School', function($stateParams, School) {
                    return School.get({id : $stateParams.id});
                }]
            }
        })
        .state('school.new', {
            parent: 'school',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/school/school-dialog.html',
                    controller: 'SchoolDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                fantasyName: null,
                                code: null,
                                addressNumber: null,
                                phone: null,
                                email: null,
                                site: null,
                                mecNumber: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('school', null, { reload: true });
                }, function() {
                    $state.go('school');
                });
            }]
        })
        .state('school.edit', {
            parent: 'school',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/school/school-dialog.html',
                    controller: 'SchoolDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['School', function(School) {
                            return School.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('school', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('school.delete', {
            parent: 'school',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/school/school-delete-dialog.html',
                    controller: 'SchoolDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['School', function(School) {
                            return School.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('school', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
