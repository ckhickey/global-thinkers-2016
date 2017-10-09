import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../data.service';
import { RouteService } from '../route.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [ DataService, RouteService ]
})

export class CategoryComponent implements OnInit {
  category: any;
  routeID: string;
  colors: Object;
  nextCatID: string;
  nextCatName: string;
  prevCatID: string;
  prevCatName: string;


  constructor(
    private dataService : DataService,
    private routeService : RouteService,
    private router : Router
  ) { }

  getCategory( id : String){

    this.dataService.getData(`categories/${id}`)
      .subscribe(
        response => {
          this.category = response
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
        this.getCategory( this.routeID );
        this.getColors(this.routeID);
        this.getPrevNext();
        this.updateTracking();
      }
    );

  }

  getCurrentUrl(): string {
    return typeof location === 'object'
      ? `${location.protocol}//${location.host}${location.pathname}`
      : '';
  }

  getColors(slug: string ){
    this.colors = this.dataService.getColors(slug);
  }

  toNextCat(){
      this.router.navigate([ 'category/' + this.nextCatID ]);
  }

  toPrevCat(){
    this.router.navigate([ 'category/' + this.prevCatID ]);
  }

  getPrevNext(){
    this.dataService.getData('nav/burger_menu')
      .subscribe(
        response => {
          let length = response.categories.length;

          // loop to find current category_slug
          for( let i = 0; i < length; i++ ){

            if( response.categories[i].slug == this.routeID ){

              // once matched, set previous and next cat IDs
              if( i != 0 ){
                this.prevCatID = response.categories[i-1].slug;
                this.prevCatName = response.categories[i-1].title;
              }else{
                this.prevCatID = response.categories[length-1].slug;
                this.prevCatName = response.categories[length-1].title;
              }

              if( i != length-1 ){
                this.nextCatID = response.categories[i+1].slug;
                this.nextCatName = response.categories[i+1].title;
              }else{
                this.nextCatID = response.categories[0].slug;
                this.nextCatName = response.categories[0].title;
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
