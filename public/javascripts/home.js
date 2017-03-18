/**
 * Created by dnovac on 14.03.2017.
 */

var homeModule = angular.module("homeModule", []);

homeModule.controller('HomeController', function ($scope, $http) {
    $scope.movies = [];
    $scope.reviewedMovieList = {};
    $scope.searchTitle = '';
    $scope.products = data;

    $scope.getMovies = function () {
        console.log("Home Controller: getMovies()")
    };

    $scope.getDataForHighChart = function () {
        $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=range.json&callback=?', function (data) {
            Highcharts.chart('hCharts-container', {

                chart: {
                    type: 'arearange',
                    zoomType: 'x'
                },

                title: {
                    text: 'Some data to display'
                },

                xAxis: {
                    type: 'datetime'
                },

                yAxis: {
                    title: {
                        text: null
                    }
                },

                tooltip: {
                    crosshairs: true,
                    shared: true,
                    valueSuffix: '°C'
                },

                legend: {
                    enabled: false
                },

                series: [{
                    name: 'Random Data',
                    data: data
                }]

            });
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

    $scope.saveList = function (review) {
        if($scope.movies.length > 0) {
            review.movieList = $scope.movies;
            alert(JSON.stringify(review));
            $http({
                method: 'POST',
                url: '/api/reviewListAPI/',
                data: review
            }).then(function(result){
                $scope.message = "<div class=\"alert alert-success\"> <strong>Succes!</strong> </div>";
            }).catch(function(error){
                $scope.message = "<div class=\"alert alert-success\"> <strong>Error!</strong> </div>";
            });
        }
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

homeModule.filter('searchFor', function(){
    return function(arr, searchString) {
        if(!searchString){
            return arr;
        }
        var result = [];
        searchString = searchString.toLowerCase();
        angular.forEach(arr, function(movie){
            if(movie.Title.toLowerCase().indexOf(searchString) !== -1){
                result.push(movie);
            }
        });
        return result;
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