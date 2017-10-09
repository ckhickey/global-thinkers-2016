import { Component, OnInit, Input } from '@angular/core';
import { RouteService } from '../route.service';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [DataService]
})
export class NavbarComponent implements OnInit {
  @Input() isHome: Boolean;
  @Input() colors: Object;
  @Input() currentCat: string;
  categories: Object;
  routeID: string;

  constructor( private routeService : RouteService, private dataService: DataService ) { }

  getData(){
    this.dataService.getData('nav/burger_menu')
      .subscribe(
        response => {
          this.categories = response.categories;
        },
        error => {}
      )
  }

  getRoute(){
    this.routeService.getRoute().subscribe(
      response=>{
        this.routeID = response.id;
      }
    )

  }

  stripThe( title: string ){
    let strippedTitle = title.replace("The ", "");
    return strippedTitle;
  }

  isActive( slug : string ){
    if( slug == this.routeID ){
      return this.colors['full'];
    }

    if( slug == this.currentCat ){
      return this.colors['half'];
    }
  }

  ngOnInit() {
    this.getData();
    this.getRoute();
  }

}
