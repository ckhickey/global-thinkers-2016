import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  providers: [ DataService ]
})

export class LandingComponent implements OnInit {

  cats : Array<any>;

  constructor( private dataService : DataService ) { }

  getCats(){

    this.dataService.getData('landing')
      .subscribe(
        response=> {
          this.cats = response;
        },
        error => {}
      )

  }

  ngOnInit() {
    this.getCats();
  }

}
