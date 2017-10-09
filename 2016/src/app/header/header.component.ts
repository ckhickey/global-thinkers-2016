import { Component, OnInit, Input } from '@angular/core';
import { RouteService } from '../route.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [ RouteService ]
})
export class HeaderComponent implements OnInit {
  @Input() colors: Object;
  @Input() currentCat: string;
  private routeID: String;
  private isHome: Boolean;

  constructor( private routeService: RouteService ) { }

  getRoute(){
    this.routeService.getRoute().subscribe(
      response => {
        this.routeID = response.id;
        this.checkIfHome( this.routeID );
      }
    );

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

  checkIfHome(routeID){
    if( routeID ===  undefined ){
      this.isHome = true;
      this.updateTracking();
    }else{
      this.isHome = false;
    }
  }

  ngOnInit() {
    this.getRoute();
  }

}
