import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../data.service';
import { RouteService } from '../route.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ DataService, RouteService ]
})

export class ProfileComponent implements OnInit {
  profile: any;
  group: any;
  routeID: string;
  colors: Object = {};
  currentCat: string;
  prevID: string;
  nextID: string;
  prevName: string;
  nextName: string;
  animateClass: Array<string> = []
  animateDir: string = 'center';
  loadNextImage: string;
  loadPrevImage: string;

  constructor(
    private dataService : DataService,
    private routeService : RouteService,
    private router : Router
  ) {

  }

  animate( direction: string, fade: string){
    // direction should be either left or right
    // fade should be either in or out

    let container : any = document.querySelector('.profile-wrapper');
    let image : any = document.querySelector('.profile-photo');

    if( container != null ){

      if( direction == 'left'){
        container.style.position = 'relative';
        container.style.left = '-20%';
      }
      if( direction == 'right'){
        container.style.position = 'relative';
        container.style.left = '20%';
      }
      if( direction == 'center'){
        container.style.left = '0';
      }

      if( fade == 'in' ){
        setTimeout( function(){
          container.style.left = '0';
          container.style.opacity = '1';
          image.style.opacity = '1';
        }, 100);
      }
      if( fade == 'out' ){
        container.style.opacity = '0';
        image.style.opacity = '0';
      }
    }

  }

  toNextProfile(){
    this.animate('left', 'out');
    this.animateDir = 'right';
    let ctrl = this;
    setTimeout( function(){
      ctrl.router.navigate([ 'profile/' + ctrl.nextID ]);
    }, 300)

  }

  toPrevProfile(){
    this.animate('right', 'out');
    this.animateDir = 'left';
    let ctrl = this;
    setTimeout( function(){
      ctrl.router.navigate([ 'profile/' + ctrl.prevID ]);
    }, 300);
  }

  loadNextImages(){
    this.dataService.getData(`entries/${ this.nextID }`)
      .subscribe(
        response => {
          this.loadNextImage = response.main_image[0] + '?w=500';
        }
      )
    this.dataService.getData(`entries/${ this.prevID }`)
      .subscribe(
        response => {
          this.loadPrevImage = response.main_image[0] + '?w=500';
        }
      )
  }

  getProfile(id:string){
    this.dataService.getData(`entries/${id}`)
      .subscribe(
        response=> {
          this.profile = response
          this.getGroup(this.profile.category_slug)
          this.getColors(this.profile.category_slug);
          this.animate( this.animateDir, 'in');
          this.animateDir = 'center';
        },
        error => {}
      )
  }

  getGroup(id:string){
    this.dataService.getData(`categories/${id}`)
      .subscribe(
        response => {
          this.group = response.entries
          this.getPrevNext()
        },
        error => {}
      )
  }

  updateTracking() {
    if (typeof window !== 'object' && typeof location !== 'object') {
      return;
    }
    // CB
    if (typeof window['pSUPERFLY'] === 'object' && window['pSUPERFLY'].virtualPage) {
      window['pSUPERFLY'].virtualPage(location.pathname, this.routeID);
    }
    // OM
    if (typeof window['s'] === 'object' && window['s'].t) {
      delete window['s'].eVar3;
      delete window['s'].eVar20;
      delete window['s'].prop20;
      void(window['s'].t());
    }
    // GA
    if (typeof window['ga'] === 'function') {
      window['ga']('set', {page: location.pathname, title: this.routeID});
      window['ga']('send', 'pageview');
    }
  }

  getRoute(){
    this.routeService.getRoute().subscribe(
      response => {
        this.routeID = response.id;
        this.getProfile( this.routeID );
        this.updateTracking();
      }
    );

  }

  getCurrentUrl(): string {
    return typeof location === 'object'
      ? `${location.protocol}//${location.host}${location.pathname}`
      : '';
  }

  getColors(slug:string ){
    this.colors = this.dataService.getColors( slug );
  }

  getPrevNext(){
    this.dataService.getData('nav/burger_menu')
      .subscribe(
        response => {

          let currentCatIndex : number;
          let currentProfileIndex : number;
          let currentProfile: Object;
          let previousProfile: Object;
          let nextProfile: Object;

          // loop to find current category_slug
          for( let i = 0; i < response.categories.length; i++ ){

            if( response.categories[i].slug == this.profile.category_slug ){
              // once matched, set current cat index
              currentCatIndex = i;
              this.currentCat = response.categories[i].slug;

              // loop to find current profile
              for( let j = 0; j < response.categories[currentCatIndex].entries.length; j++ ){

                //once matched, set current profile index and current/past/next profile objects
                if( response.categories[currentCatIndex].entries[j].slug == this.routeID ){

                  currentProfileIndex = j;

                  currentProfile = response.categories[currentCatIndex].entries[currentProfileIndex]
                  previousProfile = response.categories[currentCatIndex].entries[currentProfileIndex-1]
                  nextProfile = response.categories[currentCatIndex].entries[currentProfileIndex+1]

                  // previous profile undefined when at the first thinker, if so, go to the last of prev cat
                  if( previousProfile == undefined ){
                    let prevCategory = response.categories[ currentCatIndex - 1];


                    if( prevCategory != undefined ){
                      let prevCatEntriesLength = response.categories[currentCatIndex - 1].entries.length;
                      previousProfile = response.categories[currentCatIndex - 1 ].entries[prevCatEntriesLength - 1];
                    }else{
                      // prev category is undefined when at the first thinker, so loop back to last thinker in last cat
                      let prevCatEntriesLength = response.categories[response.categories.length-1].entries.length
                      previousProfile = response.categories[response.categories.length-1].entries[prevCatEntriesLength-1]
                    }
                  }

                  // next profile undefined when at the last thinker, if so, go to the first of next cat
                  if( nextProfile == undefined ){
                    let nextCategory = response.categories[i+1]

                    //if next cat is undefined, at the end of the list, loop back to the beginning
                    if( nextCategory != undefined ){ nextProfile = nextCategory.entries[0] }
                    else{ nextProfile = response.categories[0].entries[0] }
                  }

                  this.nextID = nextProfile['slug']
                  this.nextName = nextProfile['name']
                  this.prevID = previousProfile['slug']
                  this.prevName = previousProfile['name']
                  this.loadNextImages();
                }
              }
            }
          }
        },
        error => {}
      )
  }


  ngOnInit() {
    this.getRoute();
  }

}
