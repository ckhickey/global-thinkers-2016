import {Component, ElementRef, OnInit} from '@angular/core';

import { DataService } from '../data.service';
import { RouteService } from '../route.service';

@Component({
  selector: 'app-essay',
  templateUrl: './essay.component.html',
  styleUrls: ['./essay.component.css'],
  providers: [ DataService, RouteService ]
})

export class EssayComponent implements OnInit {
    essay: any;
    routeID: String;
    pullquotesPatched: boolean;

    constructor(
        private dataService: DataService,
        private routeService: RouteService,
        private elementRef: ElementRef
    ) {
    }

    getEssay(id:String){
        this.dataService.getData(`entries/${id}`)
        .subscribe(
            response=> {
            this.essay = response
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

    getRoute() {
      this.routeService.getRoute().subscribe(
        response => {
          this.routeID = response.id;
          this.getEssay( this.routeID );
          this.updateTracking();
        }
      );

    }

    getCurrentUrl(): string {
      return typeof location === 'object'
        ? `${location.protocol}//${location.host}${location.pathname}`
        : '';
    }

    ngOnInit() {
      this.getRoute();
    }

    /**
     * Hook into lifecycle event to patch pullquote (i.e., they need to be duplicated in
     * the DOM)
     */
    ngAfterViewChecked() {
      // Verify func is present
      if (!this.elementRef.nativeElement.querySelectorAll || typeof document !== 'object') {
        return;
      }
      const pullquotes: HTMLElement[] = (<HTMLElement[]><any> this.elementRef.nativeElement.querySelectorAll('.pull-quote'));
      if (!pullquotes || !pullquotes.length) {
        return;
      }
      if (this.pullquotesPatched) {
        return;
      }
      this.pullquotesPatched = true;
      pullquotes.forEach(pullquote => {
        let duplicate: HTMLElement = document.createElement('span');
        duplicate.innerHTML = pullquote.innerHTML;
        pullquote.parentElement.insertBefore(duplicate, pullquote);
      });
    }

}
