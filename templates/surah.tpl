<!-- <div class="bar bar-subheader button-bar bar-positive">
  <a class="button button-icon"><i class="icon ion-play"></i></a>
  <a class="button button-icon"><i class="icon ion-pause"></i></a>
  <a class="button button-icon"><i class="icon ion-stop"></i></a>
  0:00
</div> -->
<ion-view style="" title="{{surah.name_ar}} ({{surah.name_bn}})" class="nopadding">
    <ion-content class="has-header" padding="true" id="suraview">
        <ion-list class='ayahs'>
            <ion-item class="item item-complex" ng-repeat="ayah in surah.ayahs track by $index">
                <p class='arabic'>{{ayah.ar}}</p>
                <p class='bangla'>
                  <span ng-if="ayah.line">{{(ayah.line)}}. </span>{{ayah.bn}}
                </p>
            </ion-item>
        </ion-list>

        </ion-infinite-scroll>
    </ion-content>
    
    <ion-footer-bar style="padding:0;margin:0;border:0;">
        <div class="button-bar">
          <a class="button button-balanced icon" 
            ng-class="{'ion-play': !bufstate, 'ion-load-b': bufstate}" 
            ng-click="play()"></a>
          <a class="button button-balanced icon ion-pause" ng-click="pause()"></a>
          <a class="button button-balanced icon ion-stop" ng-click="stop()"></a>
        </div>
      </ion-footer-bar>
    <audio ng-src="{{surah.audio_src}}" id="audioplayer"></audio>
</ion-view>