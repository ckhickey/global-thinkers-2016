import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../data.service';

@Component({
  selector: 'app-aarp',
  templateUrl: './aarp.component.html',
  styleUrls: ['./aarp.component.css'],
  providers: [ DataService ]
})

export class AarpComponent implements OnInit {

  winners : Array<any>;

  constructor( private dataService : DataService ) { }

  getWinners() {
    this.dataService.getData('pages/aarp')
      .subscribe(
        response => {
          this.winners = response.data.winners;
          this.updateTracking();
        },
        error => {}
      );
  }

  toggleClass(array, className){

    let index = array.indexOf( className );

    if( index !== -1 ){
      this.removeClass( array, className );
    }else{
      this.addClass( array, className );
    }

  }

  addClass(array, className) {
    array.push(className);
  }

  removeClass(array, className) {
    let key = array.indexOf(className);

    while ( key !== -1 ){
      array.splice(key, 1);
      key = array.indexOf(className);
    }
  }

  getCurrentUrl(): string {
    return typeof location === 'object'
      ? `${location.protocol}//${location.host}${location.pathname}`
      : '';
  }

  updateTracking() {
    if (typeof window !== 'object' && typeof location !== 'object') {
      return;
    }
    // CB
    if (typeof window['pSUPERFLY'] === 'object' && window['pSUPERFLY'].virtualPage) {
      window['pSUPERFLY'].virtualPage(location.pathname, 'AARP');
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
      window['ga']('set', {page: location.pathname, title: 'AARP'});
      window['ga']('send', 'pageview');
    }
  }

  ngOnInit() {
    this.getWinners();
  }

}
