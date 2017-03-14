/**
 * Created by dnovac on 14.03.2017.
 */

var homeModule = angular.module("homeModule",[]);

homeModule.controller('HomeController', function($scope, $http){
    $scope.products = data;
    $scope.movies = [];

 /*   $scope.logToConsole = function () {
     console.log("Home Controller");
     }*/

    $scope.getMovies = function() {
        $http({
            method: 'GET',
            url: "http://www.omdbapi.com/?s=Star+Wars&plot=short&r=json"
        }).then(function(result){
            $scope.movies = result.data.Search;
        }).catch(function(error) {
            console.log(JSON.stringify(error));
        });
    }
});

var data = [
    {
        name: 'Cheese',
        price: '2$',
        description: 'Blue Cheese',
        isAvailable: true
    },
    {
        name: 'Bacon',
        price: '5$',
        description: 'Bacooooon',
        isAvailable: false
    },
    {
        name: 'Cheddar',
        price: '9$',
        description: 'Cheese',
        isAvailable: true
    },
    {
        name: 'Prosche',
        price: '100000$',
        description: 'Sexi AF',
        isAvailable: true
    }
];

angular.bootstrap(document.getElementById("containerApp"), ['homeModule']);