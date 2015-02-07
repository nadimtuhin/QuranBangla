<ion-view style="" title="আল-কুরআন" ng-controller="SurahListCtrl">
    <ion-content class="has-header" padding="true">
        <ion-list class="surahlistowner" >
            <ion-item href="#/surah/{{surah.number}}" class="item item-complex suralist" ng-repeat="surah in surahs | filter:filterText"><span class="surah_number">{{surah.number}}</span>. {{surah.name_bn}} ({{surah.name_ar}})</ion-item>
        </ion-list>

        <ion-infinite-scroll ng-if="moreDataCanBeLoaded()" on-infinite="loadMore()" distance="10%">
        </ion-infinite-scroll>
    </ion-content>
</ion-view>

