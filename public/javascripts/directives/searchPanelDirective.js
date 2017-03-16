/**
 * Created by dnovac on 16.03.2017.
 */

var searchMovieModule = angular.module("searchMovieModule", []);

searchMovieModule.directive('searchMovie', function () { //the name must match the html name like search-movie.html in this case
    return {
        restrict: 'E',  // E stands for element
        templateUrl: 'search-movie.ejs' // URL of a template
    };
});