
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
    'chart.js',
    "checklist-model",
    "ngMessages",
    'nvd3',
    'daterangepicker'
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


LabMonitoring.controller('SidebarController', ['$state', '$scope', function($state, $scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initSidebar($state);
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
   
    $http({
        method: 'GET',
        url: 'config/config.json'
    }).then(function (success){
        $rootScope.baseURL = success.data.baseURL;
        $rootScope.urlS = success.data.urlS;
        $rootScope.url = success.data.url;
        $rootScope.config = success.data;
    },function (error){
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

        .state('login', {
            url: "/login.html",
            templateUrl: "templates/views/login.html",
            data: {pageTitle: 'Admin Login'},
            controller: "LoginController"
        })

        .state('main', {
            url: "/main.html",
            templateUrl: "templates/views/main.html",
            data: {pageTitle: 'Admin Login'}
        })

       
        .state('main.dashboard', {
            url: "/dashboard.html",
            templateUrl: "templates/views/dashboard.html",
            data: {pageTitle: 'Admin Dashboard'},
            controller: "DashboardController"
            })


        .state('main.bayTools', {
            url: "/BayTools",
            templateUrl: "templates/views/bayTools.html",
            data: {pageTitle: 'Bay Tools'},
            controller: "ToolController"
        })


       
        .state("main.tool", {
            url: "/tool",
            templateUrl: "templates/views/tool.html",
            data: {pageTitle: 'Tool'},

        })

       
        .state("main.toolInfo", {
            url: "/status",
            templateUrl: "templates/views/toolInfo.html",
            data: {pageTitle: 'Tool Status'},
            controller: "ToolStatusController"
        })


        .state("main.tool.statistics", {
            url: "/statistics",
            templateUrl: "templates/partials/toolStatistics.html",
            data: {pageTitle: 'Tool Statistics'}
        })

        .state("main.tool.config", {
            url: "/configuration",
            templateUrl: "templates/partials/toolConfig.html",
            data: {pageTitle: 'Tool Configuration'}
        })

        .state("main.tool.work", {
            url: "/work",
            templateUrl: "templates/partials/toolWork.html",
            data: {pageTitle: 'Tool Work'}
        })


        .state('main.consoleTable', {
            url: "/consoleTable",
            templateUrl: "templates/views/consoleTable.html",
            data: {pageTitle: 'Bay Table'},
            controller: "ConsoleTableController"
        })


        .state('main.addTool', {
            url: "/addTool",
            templateUrl: "templates/views/addTool.html",
            data: {pageTitle: 'Add Tool'},
            controller: "AddToolController"
        })




        .state('main.toolTable', {
            url: "/toolTable",
            templateUrl: "templates/views/toolTable.html",
            data: {pageTitle: 'Tool Table'},
            controller: "ToolTableController"
        })


        .state('main.projectTable', {
            url: "/projectTable",
            templateUrl: "templates/views/projectTable.html",
            data: {pageTitle: 'Project Table'},
            controller: "ProjectTableController"
        })

        .state('main.ownerTable', {
            url: "/ownerTable",
            templateUrl: "templates/views/ownerTable.html",
            data: {pageTitle: 'Project Table'},
            controller: "ProjectTableController"
        })


        .state('main.addProject', {
            url: "/addProject",
            templateUrl: "templates/views/addProject.html",
            data: {pageTitle: 'Add Project'},
            controller: "AddProjectController"
        })

        .state('main.usersTable', {
            url: "/usersTable",
            templateUrl: "templates/views/usersTable.html",
            data: {pageTitle: 'Users Table'},
            controller: "UsersTableController"
        })
        .state('main.addUsers', {
            url: "/addUsers",
            templateUrl: "templates/views/addUsers.html",
            data: {pageTitle: 'Add Users'},
            controller: "AddUsersController"
        })
        .state('main.toolReport', {
            url: "/report",
            templateUrl: "templates/views/toolReport.html",
            data: {pageTitle: 'Report Generation'},
            controller: "ReportGenerationController"
        })

        .state('main.labTrend', {
            url: "/labTrend",
            templateUrl: "templates/views/labTrend.html",
            data: {pageTitle: 'Lab Trend'},
            controller: "LabTrendController"
        })

}]);
LabMonitoring.run(function($rootScope, $location) {
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        if (!(next.templateUrl == "templates/views/login.html")) {
            $location.path("/login.html");
        }
    })
});;;;;;;;;;;;;;;;;;;;;;;;;;;;;;


angular.module('LabMonitoring').controller('AddProjectController', function($rootScope, $scope, $http, $state,DataService) {

    var urlS = $rootScope.urlS;
    $scope.alerts = [];



       $scope.addProject = function(project){
           if(project === undefined || project.name === " " || project.name === undefined){
               console.log('error');
           }
           else{
           var url = urlS.projects
           DataService.post(url, project).then(function (data) {
               $rootScope.tool = data;
               $state.go('main.projectTable');
               $scope.alerts.push({type: 'success', msg: 'Added Successfully.'});
           }, function (err) {
               $scope.alerts.push({type: 'danger', msg: 'Sorry!!! Something went wrong. Please try again.'});
           });
           }
       };


   
    $scope.closeAlert = function(index){
        $scope.alerts.splice(index, 1);
    };



});




angular.module('LabMonitoring').controller('AddToolController', function($rootScope, $scope, $http, $state,$uibModal, $log,DataService,Upload,$timeout) {

    var urlS = $rootScope.urlS;
    var aurl = $rootScope.url;
    $scope.alerts = [];

    
 $scope.addToolDetails = function(tool){
     if($scope.name === " " || $scope.name === undefined)
     {
        console.log('error');
     }
      else {
         $scope.bay = $rootScope.bay;
         var id = $scope.bay.id;
         var url = urlS.bays + id + aurl.tool;
         tool.upload = Upload.upload({
             url: $rootScope.baseURL + url,
             data: {
                 name: $scope.name, image: tool, tool_owner: $scope.tool_owner, bay_number: $scope.bay_number
             }
         }).then(function (resp) {
             $state.go('main.toolTable');
         }, function (resp) {
             $scope.alerts.push({type: 'danger', msg: 'Sorry!!! Something went wrong. Please try again.'});
         });

     }
 };


 $scope.back = function(){
     $state.go('main.bayTable');
 }


    
    $scope.getUserGroups = function(){
        var url = urlS.groups;
    DataService.get(url).then(function (data) {
        $scope.groups = data;
    }, function (err) {

    });
    }
    $scope.getUserGroups();



 
$scope.getUsersData = function(){
     var url = urlS.users;
     DataService.get(url).then(function (data) {
         $scope.Users = data;
     }, function (err) {

     });
 }
$scope.getUsersData();  




   
    $scope.closeAlert = function(index){
        $scope.alerts.splice(index, 1);
    };



});




angular.module('LabMonitoring').controller('AddUsersController', function($rootScope, $scope, $http, $state,$uibModal, $log,DataService,Upload,$timeout) {

    var urlS = $rootScope.urlS;
    var aurl = $rootScope.url;
    $scope.alerts = [];

    
    $scope.addUsers = function(user){
        console.log(user);
            var url = urlS.users;
        DataService.post(url, user).then(function (data) {
            $rootScope.Users = data;
            $state.go('main.usersTable');
            $scope.alerts.push({type: 'success', msg: 'Added Successfully.'});
        }, function (err) {
            $scope.alerts.push({type: 'danger', msg: 'Sorry!!! Something went wrong. Please try again.'});
        });
    };


    $scope.back = function(){
        $state.go('main.bayTable');
    }







    
    $scope.getUsersData = function(){
        var url = urlS.groups;
        DataService.get(url).then(function (data) {
            $scope.groups = data;
        }, function (err) {

        });
    }
    $scope.getUsersData();  




   
    $scope.closeAlert = function(index){
        $scope.alerts.splice(index, 1);
    };



});






angular.module('LabMonitoring').controller('ConsoleTableController',  function($rootScope, $scope, $http, $state,$uibModal, $log,DataService) {


   

    var urlS = $rootScope.urlS;
    var aurl = $rootScope.url;
    var bay = $rootScope.bay;
    $scope.alerts = [];
    $rootScope.Bays = [];





    $rootScope.getBaysData = function() {
        var url = urlS.bays
        DataService.get(url).then(function (data) {
            $rootScope.Bays = data;
        }, function (err) {
            $scope.alerts.push({type: 'danger', msg: 'Sorry we are not able to get table information.Please try again.'});
        });
    };
    $rootScope.getBaysData();              



    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $rootScope.Bays = [];


    $scope.selectedBays = [];


   
    $scope.editbay = function(bay)
    {
        var _item = {},
            _indexOfTable = $scope.Bays.indexOf(bay);
        _item = angular.copy(bay);
        var modalInstance = $uibModal.open(
            {
                animation: $scope.animationsEnabled,
                templateUrl: "templates/modals/bayEdit.html",
                controller: "ModalController",
                resolve: {
                    item: function () {
                        return _item;
                    }
                }
            })
        modalInstance.result.then(function(item) {     
            var url = urlS.bays + item.id + '/';
            DataService.put(url, item).then(function (data) {
                $rootScope.getBaysData();
                $scope.alerts.push({type: 'success', msg: 'Changes Saved Successfully.'});
            }, function (err) {
                $scope.alerts.push({type: 'danger', msg: 'Sorry!!! Something went wrong. Please try again.'});
            });
    });
    }



    
    $scope.addTool = function(bay)
    {
        $state.go('main.addTool');
        $rootScope.bay = bay;
    };


    
    $scope.deleteBay = function(selectedBays)
    {
        var _item = {},
            _indexOfTable = $scope.Bays.indexOf(selectedBays);
        _item = angular.copy(selectedBays);
        var modalInstance = $uibModal.open(
            {
                animation: $scope.animationsEnabled,
                templateUrl: "templates/modals/confirmation.html",
                controller: "ModalController",
                resolve: {
                    item: function () {
                        return _item;
                    }
                }
            })
        modalInstance.result.then(function(item) {
             var ids = {};
             ids.bay_ids = selectedBays;
            var url = urlS.bays + 'delete/'
            DataService.put(url, ids).then(function (data) {
                $scope.selectedBays();
                $scope.alerts.push({type: 'success', msg: 'Deleted Successfully.'});
                $scope.selectedtools.length = 0;
            }, function (err) {
                $scope.alerts.push({type: 'danger', msg: 'Sorry!!! Something went wrong. Please try again.'});
            });
        });

    };

     $scope.selectBay = function (bayId,isSelected) {
         isSelected ? $scope.selectedBays.push(bayId): $scope.selectedBays.splice($scope.selectedBays.indexOf(bayId),1);
     };

    $scope.checkAll = function() {
        if(!$scope.selectAll){
            $scope.selectedBays = [];
        } else{
            angular.forEach($scope.Bays, function (bay) {
                $scope.selectedBays.push(bay.id);

            });
        }
    }



   
    $scope.closeAlert = function(index){
        $scope.alerts.splice(index, 1);
    };




});

angular.module('LabMonitoring').controller('DashboardController', function($rootScope,$state, $scope, $http, $timeout,DataService,$interval,$uibModal) {

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

    $scope.getQuaterlyCumulativeData = function() {
        var url = urlS.tools + 'lab_utilization_qtr/'
        DataService.get(url).then(function (data) {
            $rootScope.qtrcumulative = data;
        }, function (err) {

        });
    };
    $scope.getQuaterlyCumulativeData();


    $scope.setId = function (id) {
        $rootScope.id = id;
        $state.go('main.toolInfo');
    }





   
    $scope.closeAlert = function(index){
        $scope.alerts.splice(index, 1);
    };



    $scope.clock = "loading clock...";
    $scope.tickInterval = 1000

    var tick = function() {
        $scope.clock = Date.now()
        $timeout(tick, $scope.tickInterval);
    }

   
    $timeout(tick, $scope.tickInterval);


    $scope.help =  function (opt_attributes) {
        var out = $uibModal.open(
            {
                animation: $scope.animationsEnabled,
                templateUrl: "templates/modals/helpDashboard.html",
                controller: "Modal_handlerController",
                size : opt_attributes
            })
    }

});


angular.module('LabMonitoring').controller('LabController', function($rootScope,$state, $scope, $http, $timeout,DataService,$interval) {

    var urlS = $rootScope.urlS;
    $scope.alerts = [];




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
        
        
         
        
    };
    $scope.bayStatus();

    refreshMap = $interval($scope.bayStatus, 60000);

});


angular.module('LabMonitoring').controller('LabTrendController', function($rootScope, $scope, $http, $state,$uibModal, $log,DataService,Upload,$timeout) {

    var urlS = $rootScope.urlS;
    var aurl = $rootScope.url;
    $scope.alerts = [];


    Date.prototype.formatMMDDYYYY = function() {
        return (this.getMonth() + 1) +
            "/" +  this.getDate() +
            "/" +  this.getFullYear();
    }

    $scope.labTrendBar = function(){
        var start = $scope.start;
        var end = $scope.end;
        $scope.loading = false;
        var log = [];
        $scope.trend = [];
        var i = 0;
        var id =  $rootScope.id;
      pr = {}, mn = {}, id = {}, ins = {};
       Productive = [],  Maintenance = [], Idle = [], Installation = [];
        var url_trend = 'api/api_trends_overall/?start_date=' + start +'&end_date='+ end
        DataService.get(url_trend).then(function (data) {
            $scope.trend = data.trend;
            $scope.chart = data.Chart;
           
            angular.forEach($scope.chart, function(value, key) {
                this.push({key : key , y : value});
            }, log);
            $scope.stat = log;
             
            var n = $scope.trend.length;
            for(i = n-1 ; i >= 0; i--){
                pr.x = (new Date($scope.trend[i].date).formatMMDDYYYY());
                pr.y = $scope.trend[i].PR;
                Productive.push(pr);
                pr = {};
                mn.x = (new Date($scope.trend[i].date).formatMMDDYYYY());
                mn.y = $scope.trend[i].MA;
                Maintenance.push(mn);
                mn = {};
                id.x = (new Date($scope.trend[i].date).formatMMDDYYYY());
                id.y = $scope.trend[i].ID;
                Idle.push(id);
                id = {};
                ins.x = (new Date($scope.trend[i].date).formatMMDDYYYY());
                ins.y = $scope.trend[i].IN;
                Installation.push(ins);
                ins = {};
            }
            var chart = nv.models.multiBarChart();
            d3.select('#chart svg').datum([
                {
                    key: "Production",
                    color: "#c2de80",
                    values: Productive
                },
                {
                    key: "Maintenance",
                    color: "#9ac3f5",
                    values:Maintenance
                },
                {
                    key: "Idle",
                    color: "#ff7f7f",
                    values:Idle
                },
                {
                    key: "Installation",
                    color: "#ffff80",
                    values:Installation
                }
            ]).transition().duration(500).call(chart);
        }, function myError(response) {
            $scope.trend = response.statusText;
        }).finally(function () {
            $scope.loading = true;
        });
       

    };

    $scope.labTrendBar();


    $scope.options = {
        chart: {
            type: 'pieChart',
            height: 500,
            x: function(d){return d.key;},
            y: function(d){return d.y;},
            showLabels: true,
            duration: 500,
            labelThreshold: 0.01,
            labelType : 'percent',
            labelSunbeamLayout: true,
            showLegend : true,
            color: ['#ff7f7f','#c2de80','#ffff80','#9ac3f5'],
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



    $scope.date = {
        startDate: moment().subtract(1, "days"),
        endDate: moment()
    };

    $scope.setStartDate = function () {
        $scope.date.startDate = moment().subtract(4, "days");
    };

    var start = moment().subtract(29, 'days');
    var end = moment();

    $scope.opts = {
        locale: {
            applyClass: 'btn-green',
            applyLabel: "Apply",
            fromLabel: "From",
            format: "YYYY-MM-DD",
            toLabel: "To",
            cancelLabel: 'Cancel',
            customRangeLabel: 'Custom range'
        },
        ranges: {
            'Weekly': [moment().subtract(7, 'days'), moment().subtract(1, 'days')],
            'Last 30 Days': [moment().subtract(30, 'days'), moment().subtract(1, 'days')],
            'Current Month': [moment().startOf('month'), moment().subtract(1, 'days')],
            'Quaterly': [moment().subtract(2, 'month').startOf('month'), moment().subtract(1, 'days')]
        }
    };



    $('#labtrend').on('apply.daterangepicker', function(ev, picker) {
        $scope.start = picker.startDate.format('YYYY-MM-DD');
        $scope.end = picker.endDate.format('YYYY-MM-DD');
        $scope.labTrendBar();
    });



});




angular.module('LabMonitoring').controller('LoginController', function($rootScope, $scope, settings,$location, $state,$http,$localStorage,DataService) {

    var urlS = $rootScope.urlS;
    $scope.alerts = [];


    $scope.submit = function (login) {
           if(login === undefined || login.email === undefined || login.email === " " || login.password === " " || login.password === undefined) {
               console.log('enter valid username && password');
           }
           else {
               var url = urlS.login
               DataService.post(url, login).then(function (data) {
                   var token = data.token;
                   $localStorage.token = token;
                   $state.go('main.dashboard');
               }, function (err) {
                   $scope.alerts.push({type: 'danger', msg: 'Please enter valid Email and Password.'});
               });
           }
    }

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


angular.module('LabMonitoring').controller('ModalController', function ($rootScope,$scope, $state, $uibModalInstance, item, $http,DataService,Upload) {
        if (item) {
            $scope.item = item;
        }
        $scope.changedItem = {
            item: $scope.item
        };



    var urlS = $rootScope.urlS;
    var aurl = $rootScope.url;
    $scope.alerts = [];


       
    $scope.assignToolProject = function (Projectsmodel,item) {
        $rootScope.toolProject(Projectsmodel,item);
    };

    
    $scope.assignUsers = function (Usersmodel,item) {
        $rootScope.toolassignUser(Usersmodel,item);
    };


    
    $scope.assign = function (Usersmodel,item) {
          $rootScope.assignProjectUser(Usersmodel,item);

    };

    $scope.cancel = function () {                    
        $uibModalInstance.dismiss();
    };

    $scope.edit = function (tool,picFile) {                    
        if(item.name === "" || item.name === undefined){
            console.log('field is required');
        }
        else {
            var url = urlS.tools+item.id + '/';
            item.upload = Upload.upload({
                method: 'PATCH',
                url: $rootScope.baseURL + url,
                data: {
                    name: item.name, image: picFile, tool_owner: item.tool_owner, bay_number: item.bay_number
                }
            }).then(function (resp) {
                $state.go('main.toolTable');
            }, function (resp) {
                $scope.alerts.push({type: 'danger', msg: 'Sorry!!! Something went wrong. Please try again.'});
            });
            $uibModalInstance.close($scope.changedItem.item);
        }
    };


    $scope.ok = function () {                    
        if(item.name === "" || item.name === undefined){
          console.log('field is required');
        }
        else {
            $uibModalInstance.close($scope.changedItem.item);
        }
    };
    $scope.change = function () {                    
        console.log(item);
        if(item.rfid === "" || item.rfid === undefined){
            console.log('field is required');
        }
        else {
            $uibModalInstance.close($scope.changedItem.item);
        }
    };

    $scope.sure = function (){
            $uibModalInstance.close($scope.changedItem.item);
    };

   
    $scope.closeAlert = function(index){
        $scope.alerts.splice(index, 1);
    };



     $scope.getUsersData = function(){                     
         var url = urlS.users;
         DataService.get(url).then(function (data) {
             $scope.Users = data;
             $scope.Usersdata = $scope.Users;
         }, function (err) {
             $scope.alerts.push({type: 'danger', msg: 'Sorry!!! Something went wrong. Please try again.'});
         });
     }
    $scope.getUsersData();

    
    $scope.getProjectData = function(){
        var url = urlS.projects;
        DataService.get(url).then(function (data) {
            $scope.Projects = data;
            $scope.Projectsdata = $scope.Projects;
        }, function (err) {
            $scope.alerts.push({type: 'danger', msg: 'Sorry!!! Something went wrong. Please try again.'});
        });
    }
    $scope.getProjectData();

    $rootScope.assigntoolProject = function(Usersmodel,item){
        var dataToPost = {};
        var  project_ids= [];
        angular.forEach(Usersmodel, function(value, key) {
            this.push(value.id);
        }, project_ids);
        dataToPost.project_ids = project_ids;
        var url = urlS.tools+item.id + aurl.aproject;
        DataService.post(url, dataToPost).then(function (data) {
            $scope.item.toolProjects = data;
            $scope.users= $scope.item.toolProjects;

        }, function (err) {
            $scope.alerts.push({type: 'danger', msg: 'Sorry!!! Something went wrong. Please try again.'});
        });
    }
    $rootScope.toolassignUser = function(Usersmodel,item){
        var dataToPost = {};
        var  user_ids= [];
        angular.forEach(Usersmodel, function(value, key) {
            this.push(value.id);
        }, user_ids);
        dataToPost.user_ids = user_ids;
        var url = urlS.tools +item.id + aurl.tuser;
        DataService.post(url, dataToPost).then(function (data) {
            DataService.get(url).then(function (data) {
                $scope.item.toolUsers = data;
                $scope.user =  $scope.item.toolUsers;
            })
        }, function (err) {
            $scope.alerts.push({type: 'danger', msg: 'Sorry!!! Something went wrong. Please try again.'});
        });
    }

    $rootScope.assignProjectUser = function(Usersmodel,item){
        var  user_ids= [];
        var dataToPost = {};
        angular.forEach(Usersmodel, function(value, key) {
            this.push(value.id);
        }, user_ids);
        dataToPost.user_ids = user_ids;
        var url = urlS.projects +item.id + aurl.puser;
        DataService.post(url, dataToPost).then(function (data) {
            $scope.item.pusers = data;
            $scope.user =  $scope.item.pusers;
        }, function (err) {
            $scope.alerts.push({type: 'danger', msg: 'Sorry!!! Something went wrong. Please try again.'});
        });
    }

    
    $scope.Projectsmodel = item.toolProjects;
    $scope.Projectsdata = [];
    $scope.Projectssettings = {
        displayProp: 'name',
        smartButtonMaxItems: 3,
        scrollableHeight: '300px',
        scrollable: true,
        enableSearch: true,
        styleActive: true
    };
    $scope.ProjectscustomTexts = {buttonDefaultText: 'Select Projects'};



    
    $scope.Usersmodel = item.Users;
    $scope.Usersdata = [];
    $scope.Userssettings = {
        template :  '<b>{{option.first_name}} {{option.last_name}}</b>',
        displayProp: 'first_name',
        smartButtonMaxItems: 3,
        scrollableHeight: '300px',
        scrollable: true,
        enableSearch: true,
        styleActive: true
    };
    $rootScope.UserscustomTexts = {buttonDefaultText: 'Select Users'};


});


angular.module('LabMonitoring').controller('Modal_handlerController', function ($rootScope,$scope, $state, $uibModalInstance) {



    $scope.cancel = function () {                    
        $uibModalInstance.dismiss();
    };



});



angular.module('LabMonitoring').controller('ProjectTableController',  function($rootScope, $scope, $http, $state,$uibModal, $log,DataService) {

    var urlS = $rootScope.urlS;
    var aurl = $rootScope.url;
    $scope.alerts = [];



      $rootScope.getProjectData = function(){
        var url = urlS.projects;
        DataService.get(url).then(function (data) {
            $scope.Projects = data;
        }, function (err) {
            $scope.alerts.push({type: 'danger', msg: 'Sorry we are not able to get table information.Please try again.'});
        });
    }
    $rootScope.getProjectData();               

    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.Projects = [];


       
    $scope.editproject = function(project,opt_attributes)
    {
        var _item = {},
            _indexOfTable = $scope.Projects.indexOf(project);
        _item = angular.copy(project);
        var modalInstance = $uibModal.open(
            {
                animation: $scope.animationsEnabled,
                templateUrl: "templates/modals/projectEdit.html",
                controller: "ModalController",
                size: opt_attributes,
                resolve: {
                    item: function () {
                        return _item;
                    }
                }
            })

        modalInstance.result.then(function(item) {     
            var url = urlS.projects+item.id + '/';
            DataService.put(url, item).then(function (data) {
                $rootScope.getProjectData();
                $scope.alerts.push({type: 'success', msg: 'Changes Saved Successfully.'});
            }, function (err) {
                $scope.alerts.push({type: 'danger', msg: 'Sorry!!! Something went wrong. Please try again.'});
            });
        });
    }




    
    $scope.projectuser =  function (project,opt_attributes) {
        var  user_ids= [];
        var dataToPost = {};
        var url = urlS.projects + project.id + aurl.puser;
        DataService.get(url).then(function (data) {
            project.Users = data;
            var _item = {},
                _indexOfTable = $scope.Projects.indexOf(project);
            _item = angular.copy(project);
            var out = $uibModal.open(
                {
                    animation: $scope.animationsEnabled,
                    templateUrl: "templates/modals/projectUser.html",
                    controller: "ModalController",
                    size : opt_attributes,
                    resolve: {
                        item: function () {
                            return _item;
                        }
                    }
                })
        }, function (err) {
            $scope.alerts.push({type: 'danger', msg: 'Sorry we are not able to get table information.Please try again.'});
        });

    }




    
        
    $scope.addProject = function()
    {
        $state.go('main.addProject');
    };

    $scope.selectedprojects = [];
    
    $scope.deleteProject = function(selectedprojects)
    {
        var _item = {},
            _indexOfTable = $scope.Projects.indexOf(selectedprojects);
        _item = angular.copy(selectedprojects);
        var modalInstance = $uibModal.open(
            {
                animation: $scope.animationsEnabled,
                templateUrl: "templates/modals/confirmation.html",
                controller: "ModalController",
                resolve: {
                    item: function () {
                        return _item;
                    }
                }
            })


        modalInstance.result.then(function(item) {
            var ids = {};
            ids.project_ids = selectedprojects;
            var url = urlS.projects + 'delete/'
            DataService.put(url, ids).then(function (data) {
                $rootScope.getProjectData();
                $scope.alerts.push({type: 'success', msg: 'Deleted Successfully.'});
                $scope.selectedprojects.length = 0;
            }, function (err) {
                $scope.alerts.push({type: 'danger', msg: 'Sorry!!! Something went wrong. Please try again.'});
            });
        });

    };

    $scope.selectProject = function (projectId,isSelected) {
        isSelected ? $scope.selectedprojects.push(projectId): $scope.selectedtools.splice($scope.selectedprojects.indexOf(projectId),1);
    };

    

   
    $scope.closeAlert = function(index){
        $scope.alerts.splice(index, 1);
    };



});



angular.module('LabMonitoring').controller('ReportGenerationController', function($rootScope,$state, $scope, $http, $timeout,DataService,$interval) {

    var urlS = $rootScope.urlS;
    $scope.alerts = [];

    $scope.date = {
        startDate: moment().subtract(1, "days"),
        endDate: moment()
    };

    $scope.setStartDate = function () {
        $scope.date.startDate = moment().subtract(4, "days");
    };

    var start = moment().subtract(29, 'days');
    var end = moment();

    $scope.opts = {
        locale: {
            applyClass: 'btn-green',
            applyLabel: "Apply",
            fromLabel: "From",
            format: "YYYY-MM-DD",
            toLabel: "To",
            cancelLabel: 'Cancel',
            customRangeLabel: 'Custom range'
        },
        ranges: {
            'Weekly': [moment().subtract(7, 'days'), moment().subtract(1, 'days')],
            'Last 30 Days': [moment().subtract(30, 'days'), moment().subtract(1, 'days')],
            'Current Month': [moment().startOf('month'), moment().subtract(1, 'days')],
            'Quaterly': [moment().subtract(2, 'month').startOf('month'), moment().subtract(1, 'days')]
        }
    };



    $('#reportgenerate').on('apply.daterangepicker', function(ev, picker) {
        $scope.start = picker.startDate;
        $scope.end = picker.endDate;
    });


    $scope.getLabReport = function () {
        var start =  $scope.start.format('YYYY-MM-DD');
        var end =    $scope.end.format('YYYY-MM-DD');
        var url_report = 'api/export_tool_xls/?start_date=' + start +'&end_date='+ end
        var export_url = 'http://152.135.122.61:8871/api/export_tool_xls/?start_date=' + start +'&end_date='+ end
        DataService.get(url_report).then(function () {
            window.location = export_url;
        });
    }

    $scope.getProjectReport = function () {
        var start =  $scope.start.format('YYYY-MM-DD');
        var end =    $scope.end.format('YYYY-MM-DD');
        var url_report = 'api/export_tool_xls/?start_date=' + start +'&end_date='+ end;
        var export_url = 'http://152.135.122.61:8871/api/export_project_xls/?start_date=' + start +'&end_date='+ end
        DataService.get(url_report).then(function () {
            window.location = export_url;
        });
    }
    $scope.getUserReport = function () {
        var start =  $scope.start.format('YYYY-MM-DD');
        var end =    $scope.end.format('YYYY-MM-DD');
        var url_report = 'api/export_tool_xls/?start_date=' + start +'&end_date='+ end;
        var export_url = 'http://152.135.122.61:8871/api/export_user_xls/?start_date=' + start +'&end_date='+ end
        DataService.get(url_report).then(function () {
            window.location = export_url;
        });
    }

    $('#toolreportgenerate').on('apply.daterangepicker', function(ev, picker) {
        $scope.start = picker.startDate;
        $scope.end = picker.endDate;
    });

    $scope.getToolReport = function (item) {
        var id = item.id;
        var start =  $scope.start.format('YYYY-MM-DD');
        var end =    $scope.end.format('YYYY-MM-DD');
        var url_report = 'api/export_tools/'+ id +'/?start_date=' + start +'&end_date='+ end
        var export_url = 'http://152.135.122.61:8871/api/export_tools/'+ id +'?start_date=' + start +'&end_date='+ end
        DataService.get(url_report).then(function () {
            window.location = export_url;
        });
    }

    



    $rootScope.getToolDetails = function(){
        var url = urlS.tools
        DataService.get(url).then(function (data) {
            $scope.tools = data;
        }, function (err) {
            $scope.alerts.push({type: 'danger', msg: 'Sorry we are not able to get table information.Please try again.'});
        });
    }();
    
    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.tools = [];













   






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



});




angular.module('LabMonitoring').controller('ToolStatusController',  function($rootScope, $scope, settings, $state, $log, $interval, $http,$timeout,DataService,$uibModal) {

    var urlS = $rootScope.urlS;
    var aurl = $rootScope.url;
    $scope.alerts = [];



    
    $scope.statusChange = function(item) {
        var _item = {},
            _item = angular.copy(item);
        var modalInstance = $uibModal.open(
            {
                animation: $scope.animationsEnabled,
                templateUrl: "templates/modals/confirmation.html",
                controller: "ModalController",
                resolve: {
                    item: function () {
                        return _item;
                    }
                }
            })
        modalInstance.result.then(function (item) {
            var id = $rootScope.id;
            var url = urlS.tools + id + '/'
            DataService.put(url, item).then(function (data) {
                $scope.item = data;
                $scope.item.status.push = $scope.item.status;
                $state.go('main.dashboard');
                $scope.alerts.push({type: 'success', msg: 'Changes Saved Successfully.'});
            }, function (err) {
                $scope.alerts.push({type: 'danger', msg: 'Sorry!!! Something went wrong. Please try again.'});
            });
        });
    }


    
    $scope.status = function(){
       var id =  $rootScope.id;
        var url = urlS.tools + id + '/'
        DataService.get(url).then(function (data) {
            $scope.tool = data;
        }, function (err) {

        });
    }();




    $scope.statistics = function () {
        var log = [];
        var id =  $rootScope.id;
        var url_utilization = urlS.tools + id + '/utilization/'
        DataService.get(url_utilization).then(function (data) {
            $scope.utilization = data;
            angular.forEach($scope.utilization, function(value, key) {
                this.push({key : key , y : value});
            }, log);
            $scope.stat = log;
        });
        var url_userUtilization = urlS.tools + id + '/user_utilization/'
        DataService.get(url_userUtilization).then(function (data) {
            $scope.userUtilization = data;
        });
        var url_projectUtilization = urlS.tools + id + '/project_utilization/'
        DataService.get(url_projectUtilization).then(function (data) {
            $scope.projectUtilization = data;
        });
    }
    $scope.statistics();

   
    $scope.closeAlert = function(index){
        $scope.alerts.splice(index, 1);
    };





    $scope.options = {
        chart: {
            type: 'pieChart',
            height: 400,
            x: function(d){return d.key;},
            y: function(d){return d.y;},
            showLabels: true,
            duration: 500,
            labelThreshold: 0.01,
            labelType : 'percent',
            labelSunbeamLayout: true,
            showLegend : true,
            color: ['#ff7f7f','#c2de80','#ffff80','#9ac3f5'],
            legend: {
                margin: {
                    top: 5,
                    right: -30,
                    bottom: 5,
                    left: 0
                }
            }
        }
    };

    $scope.help =  function (opt_attributes) {
            var out = $uibModal.open(
                {
                    animation: $scope.animationsEnabled,
                    templateUrl: "templates/modals/helpStatus.html",
                    controller: "Modal_handlerController",
                    size : opt_attributes
                })
    }





    Date.prototype.formatMMDDYYYY = function() {
        return (this.getMonth() + 1) +
            "/" +  this.getDate() +
            "/" +  this.getFullYear();
    }
    $scope.date = {
        startDate: moment().subtract(1, "days").format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD')
    };

    $scope.setStartDate = function () {
        $scope.date.startDate = moment().subtract(4, "days");
    };

    $scope.start = moment().subtract(29, 'days').format('YYYY-MM-DD');
    $scope.end = moment().format('YYYY-MM-DD');


 


    var label = [], Productive = [],  Maintenance = [], Idle = [], Installation = [], data1=[];
    $scope.toolTrend =  function (){
        var start =  $scope.start;
        var end =    $scope.end;
        $scope.loading = false;
        $scope.trend = [];
        var i = 0;
        var id =  $rootScope.id;
        label = [], Productive = [],  Maintenance = [], Idle = [], Installation = [], data1=[];
        data1.push(Productive,Maintenance,Idle,Installation);
        var url_trend = urlS.tools + id +'/trend/?start_date='+ start +'&end_date='+ end
            DataService.get(url_trend).then(function (data) {
                $scope.trend = data.trend;
                $scope.trends = $scope.trend;
                var n = $scope.trend.length;
                for(i = n-1 ; i >= 0; i--){
                    label.push(new Date($scope.trend[i].date).formatMMDDYYYY());
                    Productive.push($scope.trend[i].PR);
                    Maintenance.push($scope.trend[i].MA);
                    Idle.push($scope.trend[i].ID);
                    Installation.push($scope.trend[i].IN);
                }
            }, function myError(response) {
                $scope.trend = response.statusText;
            }).finally(function () {
                $scope.loading = true;
            });
       
    };
    $scope.toolTrend();

    $scope.$watch('trend', function(){
        $scope.labels = label;
        $scope.series = ['Productive', 'Maintenance', 'Idle', 'Installation'];
        $scope.data = data1;
        $scope.colors = ['#c2de80','#9ac3f5','#ff7f7f','#ffff80' ];
        $scope.datasetOverride = [
            {
                yAxisID: 'y-axis-1'
            },
            {
                borderWidth: 3,
                backgroundColor: "transparent",
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
                type: 'line'
            }
        ];
        $scope.optionsTrend = {
            scales: {
                yAxes: [
                    {
                        id: 'y-axis-1',
                        type: 'linear',
                        display: true,
                        position: 'left',
                        beginAtZero:true,
                        labelString: 'probability'
                    }
                ]
            },
            pan: {
               
                enabled: true,
                mode: 'xy'
            },
            zoom: {
                enabled: true,
                mode: 'xy'
            }
        };
    });








    $scope.opts = {
        locale: {
            applyClass: 'btn-green',
            applyLabel: "Apply",
            fromLabel: "From",
            format: "YYYY-MM-DD",
            toLabel: "To",
            cancelLabel: 'Cancel',
            customRangeLabel: 'Custom range'
        },
        ranges: {
            'Weekly': [moment().subtract(7, 'days'), moment().subtract(1, 'days')],
            'Last 30 Days': [moment().subtract(30, 'days'), moment().subtract(1, 'days')],
            'Current Month': [moment().startOf('month'), moment().subtract(1, 'days')],
            'Quaterly': [moment().subtract(2, 'month').startOf('month'), moment().subtract(1, 'days')]
        }
    };



    $('#tooltrend').on('apply.daterangepicker', function(ev, picker) {
        $scope.start = picker.startDate.format('YYYY-MM-DD');
        $scope.end = picker.endDate.format('YYYY-MM-DD');
        $scope.toolTrend();
    });


});



angular.module('LabMonitoring').controller('ToolTableController', function($rootScope, $scope, $http, $state,$uibModal, $log,DataService,Upload) {

    var urlS = $rootScope.urlS;
    var aurl = $rootScope.url;
    $scope.alerts = [];



    $rootScope.getToolDetails = function(){
        var url = urlS.tools
        DataService.get(url).then(function (data) {
            $scope.tools = data;
        }, function (err) {
            $scope.alerts.push({type: 'danger', msg: 'Sorry we are not able to get table information.Please try again.'});
        });
    }
    $rootScope.getToolDetails();                    


           
    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.tools = [];



   
    $scope.editTool = function(tool)
    {
        var _item = {},
            _indexOfTable = $scope.tools.indexOf(tool);
        _item = angular.copy(tool);
        var modalInstance = $uibModal.open(
            {
                animation: $scope.animationsEnabled,
                templateUrl: "templates/modals/toolEdit.html",
                controller: "ModalController",
                size: tool,
                resolve: {
                    item: function () {
                        return _item;
                    }
                }
            })
       
    }


    




    
    $scope.tooluser =  function (tool,opt_attributes) {
        var url = urlS.tools + tool.id + aurl.tuser;
        DataService.get(url).then(function (data) {
           tool.Users = data;
            var _item = {},
                _indexOfTable = $scope.tools.indexOf(tool, tool.toolUsers);
            _item = angular.copy(tool);
            var out = $uibModal.open(
                {
                    animation: $scope.animationsEnabled,
                    templateUrl: "templates/modals/toolUser.html",
                    controller: "ModalController",
                    size : opt_attributes,
                    resolve: {
                        item: function () {
                            return _item;
                        }
                    }
                })
        }, function (err) {
        });
    }


    
    $scope.toolproject =  function (tool,opt_attributes) {
        var url = urlS.tools + tool.id + aurl.aproject;
        DataService.get(url).then(function (data) {
            tool.toolProjects = data;
            var _item = {},
                _indexOfTable = $scope.tools.indexOf(tool, tool.toolProjects);
            _item = angular.copy(tool);
            var out = $uibModal.open(
                {
                    animation: $scope.animationsEnabled,
                    templateUrl: "templates/modals/toolProject.html",
                    controller: "ModalController",
                    size : opt_attributes,
                    resolve: {
                        item: function () {
                            return _item;
                        }
                    }
                })
        }, function (err) {
        });
    }








    
    $scope.selectedtools = [];
    $scope.deleteTool = function(selectedtools)
    {
        var _item = {},
            _indexOfTable = $scope.tools.indexOf(selectedtools);
        _item = angular.copy(selectedtools);
        var modalInstance = $uibModal.open(
            {
                animation: $scope.animationsEnabled,
                templateUrl: "templates/modals/confirmation.html",
                controller: "ModalController",
                resolve: {
                    item: function () {
                        return _item;
                    }
                }
            })
        modalInstance.result.then(function(item) {
            var ids = {};
            ids.tool_ids = selectedtools;
            var url = urlS.tools + 'delete/'
            DataService.put(url, ids).then(function (data) {
                $rootScope.getToolDetails();
                $scope.alerts.push({type: 'success', msg: 'Deleted Successfully.'});
                $scope.selectedtools.length = 0;

            }, function (err) {
                $scope.alerts.push({type: 'danger', msg: 'Sorry!!! Something went wrong. Please try again.'});
            });
        });

    };

    $scope.selectTool = function (toolId,isSelected) {
        isSelected ? $scope.selectedtools.push(toolId): $scope.selectedtools.splice($scope.selectedtools.indexOf(toolId),1);
    };


    $scope.checkAll = function() {
        if(!$scope.selectAll){
            $scope.selectedtools = [];
        } else{
            angular.forEach($scope.tools, function (tool) {
                $scope.selectedtools.push(tool.id);

            });
        }
    }

   
    $scope.closeAlert = function(index){
        $scope.alerts.splice(index, 1);
    };

});




angular.module('LabMonitoring').controller('UsersTableController', function($rootScope, $scope, $http, $state,$uibModal, $log,DataService) {

    var urlS = $rootScope.urlS;
    var aurl = $rootScope.url;
    $scope.alerts = [];


    $scope.getUsersData = function(){                     
        var url = urlS.users;
        DataService.get(url).then(function (data) {
            $scope.Users = data;
            $scope.Usersdata = $scope.Users;
        }, function (err) {
            $scope.alerts.push({type: 'danger', msg: 'Sorry we are not able to get table information.Please try again.'});
        });
    }
    $scope.getUsersData();

    
    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.tools = [];


    
    $scope.addProject = function()
    {
        $state.go('main.addUsers');
    };



    
    $scope.editUser = function(user)
    {
        var url = urlS.groups;
        DataService.get(url).then(function (data) {
            user.groups = data;
            var _item = {},
                _indexOfTable = $scope.Users.indexOf(user, user.groups);
            _item = angular.copy(user);
            console.log(_item);
            var modalInstance = $uibModal.open(
                {
                    animation: $scope.animationsEnabled,
                    templateUrl: "templates/modals/userEdit.html",
                    controller: "ModalController",
                    resolve: {
                        item: function () {
                            return _item;
                        }
                    }
                })
            modalInstance.result.then(function(item) {     
                var url = urlS.users+item.id + '/';
                DataService.put(url, item).then(function (data) {
                    $scope.getUsersData();
                    $scope.alerts.push({type: 'success', msg: 'Changes Saved Successfully.'});
                }, function (err) {
                    $scope.alerts.push({type: 'danger', msg: 'Sorry!!! Something went wrong. Please try again.'});
                });
            });
        });

    }








    
    $scope.selectedusers = [];
    $scope.deleteUsers = function(selectedusers)
    {
        var _item = {},
            _indexOfTable = $scope.Users.indexOf(selectedusers);
        _item = angular.copy(selectedusers);
        var modalInstance = $uibModal.open(
            {
                animation: $scope.animationsEnabled,
                templateUrl: "templates/modals/confirmation.html",
                controller: "ModalController",
                resolve: {
                    item: function () {
                        return _item;
                    }
                }
            })
        modalInstance.result.then(function(item) {
            var ids = {};
            ids.tool_ids = selectedusers;
            var url = urlS.users + 'delete/'
            DataService.put(url, ids).then(function (data) {
                $scope.getUsersData();
                $scope.alerts.push({type: 'success', msg: 'Deleted Successfully.'});
                $scope.selectedusers.length = 0;

            }, function (err) {
                $scope.alerts.push({type: 'danger', msg: 'Sorry!!! Something went wrong. Please try again.'});
            });
        });

    };

    $scope.selectuser = function (userId,isSelected) {
        isSelected ? $scope.selectedusers.push(userId): $scope.selectedusers.splice($scope.selectedusers.indexOf(userId),1);
    };


   
    $scope.closeAlert = function(index){
        $scope.alerts.splice(index, 1);
    };

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
            $http({
                method: [type],
                url: (apiBaseURL),
                data: data,
                headers: {
                    'Authorization': 'JWT '+ $localStorage.token
                },
            }).then(function (success){
                if(success.data!= null && success.data.collection != null && success.data.collection.error) {
                    var err = success.data.collection.error;
                    deferred.reject(err);
                    $log.error('API Error:', err);
                } else {
                    deferred.resolve(success.data);
                }
            },function (error){
                $log.error('API Error:', error);
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

