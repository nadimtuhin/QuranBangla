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

.factory('SurahListService', ['$http', "$q", function($http, $q){
    var deferred = $q.defer();
    
    $http.get('/js/res/surah_list.json').then(function(res){
        deferred.resolve(res.data);
    });

    return deferred.promise;
}])

.factory('BoxService', function(){
    /** took me 8 hours -_- i am not a good programmer **/
    var Box = function(size, turn, set){
        var box = [],
        high = 0,
        low = 0,
        set = set || [],
        size = size || 10,
        turn = turn || 5,
        setSource, canLoadUp,canLoadDown, up, down;
        //set = [1,2,3,4,5,6,7,8,9,10]
        //size = 4
        //turn = 2,
        
        setSource = function(source){
            return set = source;
        }
        

        down = function(){
            if(!canLoadDown()) return box
            
            box = box.concat(set.slice(high, high+turn))
            
            high = high+turn > set.length ? set.length : high+turn
            low = high-size < 0 ? 0 : high-size

            
            if(box.length > size) box.splice(0, (box.length - size))
            
            console.log('low at: '+low)
            console.log('high at: '+high)

            return box
        }

        up = function(){
            if(!canLoadUp()) return box
            
            box = ( set.slice(low-turn, low) ).concat(box)

            low = low-turn < 0 ? 0 : low-turn
            high = low+size > set.length ? set.length : low+size

            if(box.length > size) box.splice(size)
            
            console.log('low at: '+low)
            console.log('high at: '+high)

            return box
        }

        canLoadDown = function(){
            return high < set.length;
        }

        canLoadUp = function(){
            return low > 0;
        }


        return {
            down: down,
            up: up,
            canLoadUp: canLoadUp,
            canLoadDown: canLoadDown,
            setSource: setSource
        }
    }

    return Box;
})