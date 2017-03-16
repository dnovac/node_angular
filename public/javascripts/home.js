/**
 * Created by dnovac on 14.03.2017.
 */

var homeModule = angular.module("homeModule", []);

homeModule.controller('HomeController', function ($scope, $http) {
    $scope.movies = [];
    $scope.reviews = [];
    $scope.searchTitle = '';

    $scope.getMovies = function () {
        $http({
            method: 'GET',
            url: "http://www.omdbapi.com/?s=Star+Wars&plot=short&r=json"
        }).then(function (result) {
            $scope.movies = result.data.Search;
        }).catch(function (error) {
            console.log(JSON.stringify(error));
        });
    };

    $scope.search = function (searchText) {

        $http({
            method: 'GET',
            url: "http://www.omdbapi.com/?s=" + searchText + "&plot=short&r=json"
        }).then(function (result) {
            $scope.movies = result.data.Search;
        }).catch(function (error) {
            console.log(JSON.stringify(error));
        });

    };
});

homeModule.controller('ReviewController', function ($scope) {
    console.log("Review Controller init...");
    $scope.review = {};
    $scope.products = data;

    $scope.addReview = function (listReview) {
        listReview.reviews.push($scope.review);
        $scope.review = {};
    };
});

//static
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