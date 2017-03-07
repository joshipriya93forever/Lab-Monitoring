


var LabMonitoring = angular.module("LabMonitoring", [
    "ui.router",
    "ui.bootstrap",
    "oc.lazyLoad",
    "ngSanitize",
    "ngStorage",
    "angularjs-dropdown-multiselect",
    "datatables",
    "ngFileUpload",
    "angularUtils.directives.dirPagination",
    "checklist-model",
    "ngMessages",
    'nvd3'
]); 





LabMonitoring.factory('settings', ['$rootScope', function($rootScope) {
   
    var settings = {
        layout: {
            pageSidebarClosed: false,
            pageContentWhite: true,
            pageBodySolid: false,
            pageAutoScrollOnLoad: 1000
        },
        assetsPath: 'lib',
        globalPath: 'lib/global',
        layoutPath: 'lib/layouts/layout'
    };

    $rootScope.settings = settings;

    return settings;
}]);


LabMonitoring.controller('AppController', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.$on('$viewContentLoaded', function() {
       
       

    });
}]);




LabMonitoring.controller('HeaderController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initHeader();
    });
}]);




LabMonitoring.controller('FooterController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initFooter();
    });
}]);

LabMonitoring.directive('myDirective', function() {
    function link(scope, elem, attrs, ngModel) {
        ngModel.$parsers.push(function (viewValue) {
            var reg = /^[^`~#$%\^&*+={}|[\]\\:';"<>?]*$/;
           
            if (viewValue.match(reg)) {
                return viewValue;
            }
           
            var transformedValue = ngModel.$modelValue;
            ngModel.$setViewValue(transformedValue);
            ngModel.$render();
            return transformedValue;
        });
    }

    return {
        restrict: 'A',
        require: 'ngModel',
        link: link
    };
});




    
LabMonitoring.run(["$rootScope", "settings", "$state","$http","$localStorage", function($rootScope, settings, $state,$http,$localStorage) {
    $rootScope.$state = $state;
    $rootScope.$settings = settings;
   
    $http.get('config/config.json').success(function (response)
    {
        $rootScope.baseURL = response.baseURL;
        $rootScope.urlS = response.urlS;
        $rootScope.url = response.url;
        $rootScope.config = response;
    }).error(function () {
        console.log('config file missing');
    });
}]);

LabMonitoring.config(['$httpProvider',function($httpProvider)
{
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withcredentials = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

}]);



LabMonitoring.config([ '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider', function($stateProvider, $urlRouterProvider,$locationProvider) {

       
        

   
    $urlRouterProvider.otherwise("/login.html");

    $stateProvider


       
        .state('dashboard', {
            url: "/dashboard.html",
            templateUrl: "templates/views/dashboard.html",
            data: {pageTitle: 'Admin Dashboard'},
            controller: "DashboardController"
            })

        .state('tool', {
            url: "/tool.html",
            templateUrl: "templates/views/tool.html",
            data: {pageTitle: 'Admin Dashboard'},
            controller: "ToolStatusController"
        })



        .state("tool.statistics", {
            url: "/statistics",
            templateUrl: "templates/partials/toolStatistics.html",
            data: {pageTitle: 'Tool Statistics'}
        })



}]);
LabMonitoring.run(function($rootScope, $location) {
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        if (!(next.templateUrl == "templates/views/login.html")) {
            $location.path("/login.html");
        }
    })
})

angular.module('LabMonitoring').controller('DashboardController', function($rootScope,$state, $scope, $http, $timeout,DataService,$interval) {

    var urlS = $rootScope.urlS;
    $scope.alerts = [];


    $scope.getBaysData = function() {
        var url = urlS.bays
        DataService.get(url).then(function (data) {
            $rootScope.Bays = data;
        }, function (err) {

        });
    };
    $scope.getBaysData();              

    $scope.getCumulativeData = function() {
        var url = urlS.tools + 'lab_utilization/'
        DataService.get(url).then(function (data) {
            $rootScope.cumulative = data;
        }, function (err) {

        });
    };
    $scope.getCumulativeData();

    $scope.setId = function (id) {
        $rootScope.id = id;
        $state.go('tool.statistics');
    }



    $scope.bayStatus = function() {
        $("#bay1").ready(function () {
            var url = urlS.tools + 31 + '/'
            DataService.get(url).then(function (data) {
                $scope.tool = data;
                $scope.tstatus = $scope.tool.status;
                if ($scope.tstatus === 'IN') {
                    $('#bay1').css({fill: "#ffff80"});
                }
                else if ($scope.tstatus === 'ID') {
                    $('#bay1').css({fill: "#ff7f7f"});
                }
                else if ($scope.tstatus === 'PR') {
                    $('#bay1').css({fill: "#c2de80"});
                }
                else if ($scope.tstatus === 'MA') {
                    $('#bay1').css({fill: "#9ac3f5"});
                }
            }, function (err) {

            });
        });
       
        $("#bay3").ready(function () {
            var url = urlS.tools + 65 + '/'
            DataService.get(url).then(function (data) {
                $scope.tool = data;
                $scope.tstatus = $scope.tool.status;
                if ($scope.tstatus === 'IN') {
                    $('#bay3').css({fill: "#ffff80"});
                }
                else if ($scope.tstatus === 'ID') {
                    $('#bay3').css({fill: "#ff7f7f"});
                }
                else if ($scope.tstatus === 'PR') {
                    $('#bay3').css({fill: "#c2de80"});
                }
                else if ($scope.tstatus === 'MA') {
                    $('#bay3').css({fill: "#9ac3f5"});
                }
            }, function (err) {

            });
        });
        $("#bay4").ready(function () {
            var url = urlS.tools + 66 + '/'
            DataService.get(url).then(function (data) {
                $scope.tool = data;
                $scope.tstatus = $scope.tool.status;
                if ($scope.tstatus === 'IN') {
                    $('#bay4').css({fill: "#ffff80"});
                }
                else if ($scope.tstatus === 'ID') {
                    $('#bay4').css({fill: "#ff7f7f"});
                }
                else if ($scope.tstatus === 'PR') {
                    $('#bay4').css({fill: "#c2de80"});
                }
                else if ($scope.tstatus === 'MA') {
                    $('#bay4').css({fill: "#9ac3f5"});
                }
            }, function (err) {

            });
        });
       
        
        $("#bay7").ready(function () {
            var url = urlS.tools + 50 + '/'
            DataService.get(url).then(function (data) {
                $scope.tool = data;
                $scope.tstatus = $scope.tool.status;
                if ($scope.tstatus === 'IN') {
                    $('#bay7').css({fill: "#ffff80"});
                }
                else if ($scope.tstatus === 'ID') {
                    $('#bay7').css({fill: "#ff7f7f"});
                }
                else if ($scope.tstatus === 'PR') {
                    $('#bay7').css({fill: "#c2de80"});
                }
                else if ($scope.tstatus === 'MA') {
                    $('#bay7').css({fill: "#9ac3f5"});
                }
            }, function (err) {

            });
        });
        $("#bay8").ready(function () {
            var url = urlS.tools + 49 + '/'
            DataService.get(url).then(function (data) {
                $scope.tool = data;
                $scope.tstatus = $scope.tool.status;
                if ($scope.tstatus === 'IN') {
                    $('#bay8').css({fill: "#ffff80"});
                }
                else if ($scope.tstatus === 'ID') {
                    $('#bay8').css({fill: "#ff7f7f"});
                }
                else if ($scope.tstatus === 'PR') {
                    $('#bay8').css({fill: "#c2de80"});
                }
                else if ($scope.tstatus === 'MA') {
                    $('#bay8').css({fill: "#9ac3f5"});
                }
            }, function (err) {

            });
        });
        
        $("#bay10").ready(function () {
            var url = urlS.tools + 18 + '/'
            DataService.get(url).then(function (data) {
                $scope.tool = data;
                $scope.tstatus = $scope.tool.status;
                if ($scope.tstatus === 'IN') {
                    $('#bay10').css({fill: "#ffff80"});
                }
                else if ($scope.tstatus === 'ID') {
                    $('#bay10').css({fill: "#ff7f7f"});
                }
                else if ($scope.tstatus === 'PR') {
                    $('#bay10').css({fill: "#c2de80"});
                }
                else if ($scope.tstatus === 'MA') {
                    $('#bay10').css({fill: "#9ac3f5"});
                }
            }, function (err) {

            });
        });
        $("#bay11").ready(function () {
            var url = urlS.tools + 26 + '/'
            DataService.get(url).then(function (data) {
                $scope.tool = data;
                $scope.tstatus = $scope.tool.status;
                if ($scope.tstatus === 'IN') {
                    $('#bay11').css({fill: "#ffff80"});
                }
                else if ($scope.tstatus === 'ID') {
                    $('#bay11').css({fill: "#ff7f7f"});
                }
                else if ($scope.tstatus === 'PR') {
                    $('#bay11').css({fill: "#c2de80"});
                }
                else if ($scope.tstatus === 'MA') {
                    $('#bay11').css({fill: "#9ac3f5"});
                }
            }, function (err) {

            });
        });
        $("#bay12").ready(function () {
            var url = urlS.tools + 48 + '/'
            DataService.get(url).then(function (data) {
                $scope.tool = data;
                $scope.tstatus = $scope.tool.status;
                if ($scope.tstatus === 'IN') {
                    $('#bay12').css({fill: "#ffff80"});
                }
                else if ($scope.tstatus === 'ID') {
                    $('#bay12').css({fill: "#ff7f7f"});
                }
                else if ($scope.tstatus === 'PR') {
                    $('#bay12').css({fill: "#c2de80"});
                }
                else if ($scope.tstatus === 'MA') {
                    $('#bay12').css({fill: "#9ac3f5"});
                }
            }, function (err) {

            });
        });
        $("#bay13").ready(function () {
            var url = urlS.tools + 38 + '/'
            DataService.get(url).then(function (data) {
                $scope.tool = data;
                $scope.tstatus = $scope.tool.status;
                if ($scope.tstatus === 'IN') {
                    $('#bay13').css({fill: "#ffff80"});
                }
                else if ($scope.tstatus === 'ID') {
                    $('#bay13').css({fill: "#ff7f7f"});
                }
                else if ($scope.tstatus === 'PR') {
                    $('#bay13').css({fill: "#c2de80"});
                }
                else if ($scope.tstatus === 'MA') {
                    $('#bay13').css({fill: "#9ac3f5"});
                }
            }, function (err) {

            });
        });
        $("#bay14").ready(function () {
            var url = urlS.tools + 27 + '/'
            DataService.get(url).then(function (data) {
                $scope.tool = data;
                $scope.tstatus = $scope.tool.status;
                if ($scope.tstatus === 'IN') {
                    $('#bay14').css({fill: "#ffff80"});
                }
                else if ($scope.tstatus === 'ID') {
                    $('#bay14').css({fill: "#ff7f7f"});
                }
                else if ($scope.tstatus === 'PR') {
                    $('#bay14').css({fill: "#c2de80"});
                }
                else if ($scope.tstatus === 'MA') {
                    $('#bay14').css({fill: "#9ac3f5"});
                }
            }, function (err) {

            });
        });
        
        $("#bay16").ready(function () {
            var url = urlS.tools + 53 + '/'
            DataService.get(url).then(function (data) {
                $scope.tool = data;
                $scope.tstatus = $scope.tool.status;
                if ($scope.tstatus === 'IN') {
                    $('#bay16').css({fill: "#ffff80"});
                }
                else if ($scope.tstatus === 'ID') {
                    $('#bay16').css({fill: "#ff7f7f"});
                }
                else if ($scope.tstatus === 'PR') {
                    $('#bay16').css({fill: "#c2de80"});
                }
                else if ($scope.tstatus === 'MA') {
                    $('#bay16').css({fill: "#9ac3f5"});
                }
            }, function (err) {

            });
        });
        
        $("#bay18").ready(function () {
            var url = urlS.tools + 54 + '/'
            DataService.get(url).then(function (data) {
                $scope.tool = data;
                $scope.tstatus = $scope.tool.status;
                if ($scope.tstatus === 'IN') {
                    $('#bay18').css({fill: "#ffff80"});
                }
                else if ($scope.tstatus === 'ID') {
                    $('#bay18').css({fill: "#ff7f7f"});
                }
                else if ($scope.tstatus === 'PR') {
                    $('#bay18').css({fill: "#c2de80"});
                }
                else if ($scope.tstatus === 'MA') {
                    $('#bay18').css({fill: "#9ac3f5"});
                }
            }, function (err) {

            });
        });
       
        $("#bay20").ready(function () {
            var url = urlS.tools + 55 + '/'
            DataService.get(url).then(function (data) {
                $scope.tool = data;
                $scope.tstatus = $scope.tool.status;
                if ($scope.tstatus === 'IN') {
                    $('#bay20').css({fill: "#ffff80"});
                }
                else if ($scope.tstatus === 'ID') {
                    $('#bay20').css({fill: "#ff7f7f"});
                }
                else if ($scope.tstatus === 'PR') {
                    $('#bay20').css({fill: "#c2de80"});
                }
                else if ($scope.tstatus === 'MA') {
                    $('#bay20').css({fill: "#9ac3f5"});
                }
            }, function (err) {

            });
        });
        $("#bay21").ready(function () {
            var url = urlS.tools + 58 + '/'
            DataService.get(url).then(function (data) {
                $scope.tool = data;
                $scope.tstatus = $scope.tool.status;
                if ($scope.tstatus === 'IN') {
                    $('#bay21').css({fill: "#ffff80"});
                }
                else if ($scope.tstatus === 'ID') {
                    $('#bay21').css({fill: "#ff7f7f"});
                }
                else if ($scope.tstatus === 'PR') {
                    $('#bay21').css({fill: "#c2de80"});
                }
                else if ($scope.tstatus === 'MA') {
                    $('#bay21').css({fill: "#9ac3f5"});
                }
            }, function (err) {

            });
        });
        $("#bay22").ready(function () {
            var url = urlS.tools + 52 + '/'
            DataService.get(url).then(function (data) {
                $scope.tool = data;
                $scope.tstatus = $scope.tool.status;
                if ($scope.tstatus === 'IN') {
                    $('#bay22').css({fill: "#ffff80"});
                }
                else if ($scope.tstatus === 'ID') {
                    $('#bay22').css({fill: "#ff7f7f"});
                }
                else if ($scope.tstatus === 'PR') {
                    $('#bay22').css({fill: "#c2de80"});
                }
                else if ($scope.tstatus === 'MA') {
                    $('#bay22').css({fill: "#9ac3f5"});
                }
            }, function (err) {

            });
        });
        
        $("#bay24").ready(function () {
            var url = urlS.tools + 14 + '/'
            DataService.get(url).then(function (data) {
                $scope.tool = data;
                $scope.tstatus = $scope.tool.status;
                if ($scope.tstatus === 'IN') {
                    $('#bay24').css({fill: "#ffff80"});
                }
                else if ($scope.tstatus === 'ID') {
                    $('#bay24').css({fill: "#ff7f7f"});
                }
                else if ($scope.tstatus === 'PR') {
                    $('#bay24').css({fill: "#c2de80"});
                }
                else if ($scope.tstatus === 'MA') {
                    $('#bay24').css({fill: "#9ac3f5"});
                }
            }, function (err) {

            });
        });
        $("#bay25").ready(function () {
            var url = urlS.tools + 16 + '/'
            DataService.get(url).then(function (data) {
                $scope.tool = data;
                $scope.tstatus = $scope.tool.status;
                if ($scope.tstatus === 'IN') {
                    $('#bay25').css({fill: "#ffff80"});
                }
                else if ($scope.tstatus === 'ID') {
                    $('#bay25').css({fill: "#ff7f7f"});
                }
                else if ($scope.tstatus === 'PR') {
                    $('#bay25').css({fill: "#c2de80"});
                }
                else if ($scope.tstatus === 'MA') {
                    $('#bay25').css({fill: "#9ac3f5"});
                }
            }, function (err) {

            });
        });
        $("#bay26").ready(function () {
            var url = urlS.tools + 15 + '/'
            DataService.get(url).then(function (data) {
                $scope.tool = data;
                $scope.tstatus = $scope.tool.status;
                if ($scope.tstatus === 'IN') {
                    $('#bay26').css({fill: "#ffff80"});
                }
                else if ($scope.tstatus === 'ID') {
                    $('#bay26').css({fill: "#ff7f7f"});
                }
                else if ($scope.tstatus === 'PR') {
                    $('#bay26').css({fill: "#c2de80"});
                }
                else if ($scope.tstatus === 'MA') {
                    $('#bay26').css({fill: "#9ac3f5"});
                }
            }, function (err) {

            });
        });
        $("#bay27").ready(function () {
            var url = urlS.tools + 7 + '/'
            DataService.get(url).then(function (data) {
                $scope.tool = data;
                $scope.tstatus = $scope.tool.status;
                if ($scope.tstatus === 'IN') {
                    $('#bay27').css({fill: "#ffff80"});
                }
                else if ($scope.tstatus === 'ID') {
                    $('#bay27').css({fill: "#ff7f7f"});
                }
                else if ($scope.tstatus === 'PR') {
                    $('#bay27').css({fill: "#c2de80"});
                }
                else if ($scope.tstatus === 'MA') {
                    $('#bay27').css({fill: "#9ac3f5"});
                }
            }, function (err) {

            });
        });
        $("#bay28").ready(function () {
            var url = urlS.tools + 28 + '/'
            DataService.get(url).then(function (data) {
                $scope.tool = data;
                $scope.tstatus = $scope.tool.status;
                if ($scope.tstatus === 'IN') {
                    $('#bay28').css({fill: "#ffff80"});
                }
                else if ($scope.tstatus === 'ID') {
                    $('#bay28').css({fill: "#ff7f7f"});
                }
                else if ($scope.tstatus === 'PR') {
                    $('#bay28').css({fill: "#c2de80"});
                }
                else if ($scope.tstatus === 'MA') {
                    $('#bay28').css({fill: "#9ac3f5"});
                }
            }, function (err) {

            });
        });
        $("#bay29").ready(function () {
            var url = urlS.tools + 59 + '/'
            DataService.get(url).then(function (data) {
                $scope.tool = data;
                $scope.tstatus = $scope.tool.status;
                if ($scope.tstatus === 'IN') {
                    $('#bay29').css({fill: "#ffff80"});
                }
                else if ($scope.tstatus === 'ID') {
                    $('#bay29').css({fill: "#ff7f7f"});
                }
                else if ($scope.tstatus === 'PR') {
                    $('#bay29').css({fill: "#c2de80"});
                }
                else if ($scope.tstatus === 'MA') {
                    $('#bay29').css({fill: "#9ac3f5"});
                }
            }, function (err) {

            });
        });
        
        $("#bay31").ready(function () {
            var url = urlS.tools + 30 + '/'
            DataService.get(url).then(function (data) {
                $scope.tool = data;
                $scope.tstatus = $scope.tool.status;
                if ($scope.tstatus === 'IN') {
                    $('#bay31').css({fill: "#ffff80"});
                }
                else if ($scope.tstatus === 'ID') {
                    $('#bay31').css({fill: "#ff7f7f"});
                }
                else if ($scope.tstatus === 'PR') {
                    $('#bay31').css({fill: "#c2de80"});
                }
                else if ($scope.tstatus === 'MA') {
                    $('#bay31').css({fill: "#9ac3f5"});
                }
            }, function (err) {

            });
        });
      
        
        $("#bay34").ready(function () {
            var url = urlS.tools + 29 + '/'
            DataService.get(url).then(function (data) {
                $scope.tool = data;
                $scope.tstatus = $scope.tool.status;
                if ($scope.tstatus === 'IN') {
                    $('#bay34').css({fill: "#ffff80"});
                }
                else if ($scope.tstatus === 'ID') {
                    $('#bay34').css({fill: "#ff7f7f"});
                }
                else if ($scope.tstatus === 'PR') {
                    $('#bay34').css({fill: "#c2de80"});
                }
                else if ($scope.tstatus === 'MA') {
                    $('#bay34').css({fill: "#9ac3f5"});
                }
            }, function (err) {

            });
        });
        $("#bay35").ready(function () {
            var url = urlS.tools + 60 + '/'
            DataService.get(url).then(function (data) {
                $scope.tool = data;
                $scope.tstatus = $scope.tool.status;
                if ($scope.tstatus === 'IN') {
                    $('#bay35').css({fill: "#ffff80"});
                }
                else if ($scope.tstatus === 'ID') {
                    $('#bay35').css({fill: "#ff7f7f"});
                }
                else if ($scope.tstatus === 'PR') {
                    $('#bay35').css({fill: "#c2de80"});
                }
                else if ($scope.tstatus === 'MA') {
                    $('#bay35').css({fill: "#9ac3f5"});
                }
            }, function (err) {

            });
        });
        $("#bay36").ready(function () {
            var url = urlS.tools + 61 + '/'
            DataService.get(url).then(function (data) {
                $scope.tool = data;
                $scope.tstatus = $scope.tool.status;
                if ($scope.tstatus === 'IN') {
                    $('#bay36').css({fill: "#ffff80"});
                }
                else if ($scope.tstatus === 'ID') {
                    $('#bay36').css({fill: "#ff7f7f"});
                }
                else if ($scope.tstatus === 'PR') {
                    $('#bay36').css({fill: "#c2de80"});
                }
                else if ($scope.tstatus === 'MA') {
                    $('#bay36').css({fill: "#9ac3f5"});
                }
            }, function (err) {

            });
        });
        $("#bay37").ready(function () {
            var url = urlS.tools + 62 + '/'
            DataService.get(url).then(function (data) {
                $scope.tool = data;
                $scope.tstatus = $scope.tool.status;
                if ($scope.tstatus === 'IN') {
                    $('#bay37').css({fill: "#ffff80"});
                }
                else if ($scope.tstatus === 'ID') {
                    $('#bay37').css({fill: "#ff7f7f"});
                }
                else if ($scope.tstatus === 'PR') {
                    $('#bay37').css({fill: "#c2de80"});
                }
                else if ($scope.tstatus === 'MA') {
                    $('#bay37').css({fill: "#9ac3f5"});
                }
            }, function (err) {

            });
        });
        $("#bay38").ready(function () {
            var url = urlS.tools + 43 + '/'
            DataService.get(url).then(function (data) {
                $scope.tool = data;
                $scope.tstatus = $scope.tool.status;
                if ($scope.tstatus === 'IN') {
                    $('#bay38').css({fill: "#ffff80"});
                }
                else if ($scope.tstatus === 'ID') {
                    $('#bay38').css({fill: "#ff7f7f"});
                }
                else if ($scope.tstatus === 'PR') {
                    $('#bay38').css({fill: "#c2de80"});
                }
                else if ($scope.tstatus === 'MA') {
                    $('#bay38').css({fill: "#9ac3f5"});
                }
            }, function (err) {

            });
        });
        $("#bay39").ready(function () {
            var url = urlS.tools + 44 + '/'
            DataService.get(url).then(function (data) {
                $scope.tool = data;
                $scope.tstatus = $scope.tool.status;
                if ($scope.tstatus === 'IN') {
                    $('#bay39').css({fill: "#ffff80"});
                }
                else if ($scope.tstatus === 'ID') {
                    $('#bay39').css({fill: "#ff7f7f"});
                }
                else if ($scope.tstatus === 'PR') {
                    $('#bay39').css({fill: "#c2de80"});
                }
                else if ($scope.tstatus === 'MA') {
                    $('#bay39').css({fill: "#9ac3f5"});
                }
            }, function (err) {

            });
        });
        $("#bay40").ready(function () {
            var url = urlS.tools + 45 + '/'
            DataService.get(url).then(function (data) {
                $scope.tool = data;
                $scope.tstatus = $scope.tool.status;
                if ($scope.tstatus === 'IN') {
                    $('#bay40').css({fill: "#ffff80"});
                }
                else if ($scope.tstatus === 'ID') {
                    $('#bay40').css({fill: "#ff7f7f"});
                }
                else if ($scope.tstatus === 'PR') {
                    $('#bay40').css({fill: "#c2de80"});
                }
                else if ($scope.tstatus === 'MA') {
                    $('#bay40').css({fill: "#9ac3f5"});
                }
            }, function (err) {

            });
        });
        $("#bay41").ready(function () {
            var url = urlS.tools + 46 + '/'
            DataService.get(url).then(function (data) {
                $scope.tool = data;
                $scope.tstatus = $scope.tool.status;
                if ($scope.tstatus === 'IN') {
                    $('#bay41').css({fill: "#ffff80"});
                }
                else if ($scope.tstatus === 'ID') {
                    $('#bay41').css({fill: "#ff7f7f"});
                }
                else if ($scope.tstatus === 'PR') {
                    $('#bay41').css({fill: "#c2de80"});
                }
                else if ($scope.tstatus === 'MA') {
                    $('#bay41').css({fill: "#9ac3f5"});
                }
            }, function (err) {

            });
        });
        $("#bay42").ready(function () {
            var url = urlS.tools + 67 + '/'
            DataService.get(url).then(function (data) {
                $scope.tool = data;
                $scope.tstatus = $scope.tool.status;
                if ($scope.tstatus === 'IN') {
                    $('#bay42').css({fill: "#ffff80"});
                }
                else if ($scope.tstatus === 'ID') {
                    $('#bay42').css({fill: "#ff7f7f"});
                }
                else if ($scope.tstatus === 'PR') {
                    $('#bay42').css({fill: "#c2de80"});
                }
                else if ($scope.tstatus === 'MA') {
                    $('#bay42').css({fill: "#9ac3f5"});
                }
            }, function (err) {

            });
        });
        
       
        $("#bay45").ready(function () {
            var url = urlS.tools + 134 + '/'
            DataService.get(url).then(function (data) {
                $scope.tool = data;
                $scope.tstatus = $scope.tool.status;
                if ($scope.tstatus === 'IN') {
                    $('#bay45').css({fill: "#ffff80"});
                }
                else if ($scope.tstatus === 'ID') {
                    $('#bay45').css({fill: "#ff7f7f"});
                }
                else if ($scope.tstatus === 'PR') {
                    $('#bay45').css({fill: "#c2de80"});
                }
                else if ($scope.tstatus === 'MA') {
                    $('#bay45').css({fill: "#9ac3f5"});
                }
            }, function (err) {

            });
        });
       
    };
    $scope.bayStatus();

    refreshMap = $interval($scope.bayStatus, 60000);

   
    $scope.closeAlert = function(index){
        $scope.alerts.splice(index, 1);
    };




    $rootScope.settings.layout.pageBodySolid = true;           
    $rootScope.settings.layout.pageSidebarClosed = true;        
});

angular.module('LabMonitoring').controller('LoginController', function($rootScope, $scope, settings,$location, $state,$http,$localStorage,DataService) {

    var urlS = $rootScope.urlS;
    $scope.alerts = [];



      $scope.login = function() {
          $.post("http://152.135.122.61:8871/api-token-auth/", {
              email: "bay@gmail.com",
              password: "1234"
          }).then(function (data) {
              var token = data.token;
              $localStorage.token = token;
              $state.go('dashboard');
          }, function (err) {
              $scope.alerts.push({type: 'danger', msg: 'Please enter valid Email and Password.'});
          });
      };
    $scope.login();
    if($localStorage.token === undefined) {
        $location.path('/login');
    };


    $scope.logout = function () {
        var tokenClaims = {};
        delete $localStorage.token;
        $location.path('/login');
    };


    $scope.show = true;
   
    $scope.closeAlert = function(index){
        $scope.alerts.splice(index, 1);
        $scope.show = false;
    };








});




angular.module('LabMonitoring').controller('ToolController',  function($rootScope, $scope, settings, $state,DataService) {

    var urlS = $rootScope.urlS;
    var aurl = $rootScope.url;
    $scope.alerts = [];

       
    $scope.status = function(item){
        $scope.tool = $rootScope.tool;
           var id = $scope.tool.id;
           var bay_id =  $scope.tool.bay.id;
        var url = urlS.bays + bay_id + aurl.tool + id + '/';
        DataService.patch(url, item).then(function (data) {
            $rootScope.item = data;
        }, function (err) {

        });
    }

    
    $scope.toolstat = function(id){
        $rootScope.id = id;
        $state.go('main.tool.status');
    }





    $scope.getTools =  function() {
        var id = $rootScope.id;
        var url = urlS.bays + id + '/'
        DataService.get(url).then(function (data) {
            $scope.bay = data

        }, function (err) {

        });
    }
    $scope.getTools();


   
    $scope.closeAlert = function(index){
        $scope.alerts.splice(index, 1);
    };



   
    $rootScope.settings.layout.pageBodySolid = true;
    $rootScope.settings.layout.pageSidebarClosed = false;
});




angular.module('LabMonitoring').controller('ToolStatusController',  function($rootScope, $scope, settings, $state,DataService,$uibModal, $log) {

    var urlS = $rootScope.urlS;
    var aurl = $rootScope.url;
    $scope.alerts = [];

    
    $scope.status = function(){
       var id =  $rootScope.id;
        var url = urlS.tools + id + '/'
        DataService.get(url).then(function (data) {
            $scope.tool = data;
        }, function (err) {

        });
    }

    $scope.status() ;



    $scope.statistics = function () {
        var log = [];
        var id =  $rootScope.id;
        var url = urlS.tools + id + '/utilization/'
        DataService.get(url).then(function (data) {
            $scope.utilization = data;
            angular.forEach($scope.utilization, function(value, key) {
                this.push({key : key , y : value});
            }, log);
            $scope.stat = log;
          console.log(log);
            $state.go('tool.statistics');
        }, function (err) {

        });
    }

    $scope.statistics();

   
    $scope.closeAlert = function(index){
        $scope.alerts.splice(index, 1);
    };





    $scope.options = {
        chart: {
            type: 'pieChart',
            height: 500,
            x: function(d){return d.key;},
            y: function(d){return d.y;},
            showLabels: true,
            duration: 500,
            labelThreshold: 0.01,
            labelSunbeamLayout: true,
            showLegend : false,
            color: ['#c2de80','#ffff80','#9ac3f5','#ff7f7f'],
            legend: {
                margin: {
                    top: 5,
                    right: 30,
                    bottom: 5,
                    left: 0
                }
            }
        }
    };




   
    $rootScope.settings.layout.pageBodySolid = true;
    $rootScope.settings.layout.pageSidebarClosed = false;
});





LabMonitoring.directive('ngSpinnerBar', ['$rootScope', '$state',
    function($rootScope, $state) {
        return {
            link: function(scope, element, attrs) {
               
                element.addClass('hide');

               
                $rootScope.$on('$stateChangeStart', function() {
                    element.removeClass('hide');
                });

               
                $rootScope.$on('$stateChangeSuccess', function(event) {
                    element.addClass('hide');
                    $('body').removeClass('page-on-load');
                    Layout.setAngularJsSidebarMenuActiveLink('match', null, event.currentScope.$state);
                   
                   
                    setTimeout(function () {
                        App.scrollTop();
                    }, $rootScope.settings.layout.pageAutoScrollOnLoad);     
                });

               
                $rootScope.$on('$stateNotFound', function() {
                    element.addClass('hide');
                });

               
                $rootScope.$on('$stateChangeError', function() {
                    element.addClass('hide');
                });
            }
        };
    }
])


LabMonitoring.directive('a', function() {
    return {
        restrict: 'E',
        link: function(scope, elem, attrs) {
            if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                elem.on('click', function(e) {
                    e.preventDefault();
                });
            }
        }
    };
});


LabMonitoring.directive('dropdownMenuHover', function () {
  return {
    link: function (scope, elem) {
      elem.dropdownHover();
    }
  };  
});


angular.module('LabMonitoring').filter('propsFilter', function() {
    return function(items, props) {
        var out = [];

        if (angular.isArray(items)) {
            var keys = Object.keys(props);

            items.forEach(function(item) {
                var itemMatches = false;

                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                        itemMatches = true;
                        break;
                    }
                }

                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
           
            out = items;
        }

        return out;
    };
});






LabMonitoring.service('DataService',[
    '$http',
    '$q',
    '$log',
    '$rootScope',
    '$state',
    '$localStorage',
    '$location',
    function($http, $q, $log, $rootScope, $state,$localStorage,$location)
    {
        



        var r = function(type, url, data) {
            var deferred = $q.defer();
            var apiBaseURL = url.indexOf('.json')>-1 ? url : $rootScope.baseURL+url;
            $http.defaults.headers.common['Authorization'] = 'JWT '+ $localStorage.token;
            $http[type](apiBaseURL,data).success(function(data) {
                if(data!= null && data.collection != null && data.collection.error) {
                    var err = data.collection.error;
                    deferred.reject(err);
                    $log.error('API Error:', err);
                } else {
                    deferred.resolve(data);
                }
            }).error(function(data, status, headers, config) {
                var request = config.method + ' ' + config.url,
                    err = 'API request ' + request + ' failed with response code ' + status;

                deferred.reject(err);

                $log.error('API Error:', err);
            });
            return deferred.promise;
        };



        this.get = function(url) {
            return r('get', url);
        };

        this.post = function(url, data) {
            return r('post', url, data);
        };

        this.put = function(url, data) {
            return r('put', url, data);
        };

        this.delete = function(url, data) {
            return r('delete', url, data);
        };
        this.patch = function(url, data) {
            return r('patch', url, data);
        };

    }

]);

