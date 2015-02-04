<!-- <div class="bar bar-subheader button-bar bar-positive">
  <a class="button button-icon"><i class="icon ion-play"></i></a>
  <a class="button button-icon"><i class="icon ion-pause"></i></a>
  <a class="button button-icon"><i class="icon ion-stop"></i></a>
  0:00
</div> -->
<ion-view style="" title="{{surah.name_ar}} ({{surah.name_bn}})" class="nopadding">
    <ion-content class="has-header" padding="true" id="suraview">
    	<p ng-repeat="ayah in surah.ayahss track by $index" >
    		<span ng-if="$index % 2 != 0">{{($index + 1)/ 2}}. </span>{{ayah}}
    	</p>
    </ion-content>
    <ion-footer-bar style="padding:0;margin:0;border:0;">
        <div class="button-bar">
          <a class="button button-balanced icon" ng-class="{'ion-play': !bufstate, 'ion-load-b': bufstate}" ng-click="play()"></a>
		  <a class="button button-balanced icon ion-pause" ng-click="pause()"></a>
		  <a class="button button-balanced icon ion-stop" ng-click="stop()"></a>
        </div>
      </ion-footer-bar>
    <audio ng-src="{{surah.audio_src}}" id="audioplayer"></audio>
</ion-view>