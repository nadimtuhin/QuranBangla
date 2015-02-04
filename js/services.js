angular.module('app.services', [])

.factory('FeedService',['$http',function($http){
    return {
        parseFeed: function(url){
            return $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&output=xml&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
        },
        parseFeedNoGoogle : function(url){
            return $http.get(url);
        }
    }
}])