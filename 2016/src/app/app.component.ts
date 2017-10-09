import { Component } from '@angular/core';

import { RouteService } from './route.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ RouteService ]
})
export class AppComponent {

  routeID : String;

  constructor( private routeService : RouteService ){

  }

  getRoute() {
    this.routeService.getRoute().subscribe(
      response => {
        this.routeID = response.id;
      }
    );
  }

  ngInit(){
    this.getRoute();
  }

}
