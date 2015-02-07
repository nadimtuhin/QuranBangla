angular.module('app.controllers', [])

.controller("SurahCtrl", ['$scope','$stateParams','SurahService','BoxService','AudioSurahService', '$q',
    function ($scope,$stateParams,SurahService,BoxService,AudioSurahService,$q) {
        var surahBox = new BoxService(1000, 3); //load 3 lines each turn
        var audio = document.getElementsByTagName('audio');
        var surahLoaded = $q.defer(), audioLoading = $q.defer();

        $scope.bufstate = false;
        $scope.ayahs = [];
        

        //load surah from json
        SurahService.loadSurah($stateParams.surahId).then(function(surah){
            surahBox.setSource(surah.ayahs);
            $scope.surah = surah;

            surahLoaded.resolve();
        });

        //load audio stream after surah loaded
        surahLoaded.promise.then(function(){
            $scope.surah.audio_src = AudioSurahService.getSrc($stateParams.surahId);
            
            audio[0].addEventListener('error', function(e) {
                alert("Unable to fetch data, please check your internet connection.")
                $scope.bufstate = false;
                console.log('bufstate is '+$scope.bufstate);
            });

            audio[0].addEventListener('canplay', function() {
                $scope.bufstate = false;
                console.log('canplay .. bufstate is '+$scope.bufstate);
                $scope.$apply();
            });
        });



        $scope.play = function() {
            audio[0].play();
            console.log('bufstate is '+$scope.bufstate);
            $scope.bufstate = true;
        };
        $scope.pause = function() {
            audio[0].pause();
        };
        $scope.stop = function() {
              $scope.pause();
              audio[0].currentTime = 0;
              console.log('bufstate is '+$scope.bufstate);
        };


        $scope.loadDown = function() {
            console.log('loading down');
            $scope.ayahs = surahBox.down();
            $scope.$broadcast('scroll.infiniteScrollComplete');
        };

        $scope.canLoadDown = function(){
            console.log('can we load more offscreen ayahs? ' + (surahBox.canLoadDown() ? "why not":"nope"));
            return surahBox.canLoadDown();
        };

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