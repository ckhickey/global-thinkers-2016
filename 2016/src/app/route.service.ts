import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RouteService {

  private routeParams: Observable<any>;

  constructor( private route : ActivatedRoute) { }

  getRoute() : Observable<any>{
    return this.route.params;
  }

}
