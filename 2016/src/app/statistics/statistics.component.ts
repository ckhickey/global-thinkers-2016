import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../data.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  providers: [ DataService ]
})

export class StatisticsComponent implements OnInit {

    stats : Array<any>;

    constructor( private dataService : DataService ) { }

    getStats() {
        this.dataService.getData('statistics')
        .subscribe(
            response => {
                this.stats = response;
                this.updateTracking();
            },
            error => {}
        );
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
            window['pSUPERFLY'].virtualPage(location.pathname, 'Statistics');
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
            window['ga']('set', {page: location.pathname, title: 'Statistics'});
            window['ga']('send', 'pageview');
        }
    }

    ngOnInit() {
        this.getStats();
    }

}
