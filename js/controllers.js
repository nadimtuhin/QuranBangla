angular.module('app.controllers', [])

.controller("SurahCtrl", ['$scope','$stateParams','FeedService','$sce', function ($scope,$stateParams,Feed,$sce) {  
	try {
        Feed.parseFeedNoGoogle("/js/res/surahs/" + $stateParams.surahId + ".json").then(function(res){
        	$scope.surah = res.data;
            $scope.surah.audio_src = $sce.trustAsResourceUrl('http://www.ourholyquran.com/surah/arabic/' + $stateParams.surahId + '.mp3');
        	$scope.surah.ayahss = [];
        	for (var i = 0; i < $scope.surah.ayahs.length; i++) {
        		$scope.surah.ayahss.push($scope.surah.ayahs[i]);
        	}
            document.getElementsByTagName('audio')[0].addEventListener('error', function(e) {
                alert("Unable to fetch data, please check your internet connection.")
            });
            $scope.play = function() {
                document.getElementsByTagName('audio')[0].play();
                $scope.bufstate = true;
            };
            $scope.pause = function() {
                document.getElementsByTagName('audio')[0].pause();
            };
            $scope.stop = function() {
                  $scope.pause();
                  document.getElementsByTagName('audio')[0].currentTime = 0;
            };
            document.getElementsByTagName('audio')[0].addEventListener('canplay', function() {
                $scope.bufstate = false;
                $scope.$apply();
            })

        });
        
    }
    catch(e) {}

}])

.controller("SurahListCtrl", ['$scope','$stateParams','SurahListService','$ionicLoading', 'BoxService',
    function ($scope,$stateParams,SurahListService,$ionicLoading, BoxService) {
        var surahListBox = new BoxService(114, 10); //because we have 114 surahs, load 10 each time
        $scope.surahs = [];

        SurahListService.then(function(list){
            surahListBox.setSource(list);
        });

        $scope.loadMore = function() {
            console.log('loading more surahs');
            $scope.surahs = surahListBox.down();
            
            $scope.$broadcast('scroll.infiniteScrollComplete');
        };

        $scope.moreDataCanBeLoaded = function(){
            console.log('can we load more surahs? ' + (surahListBox.canLoadDown() ? "why not":"nope"));
            return surahListBox.canLoadDown() ;
        };
}]);