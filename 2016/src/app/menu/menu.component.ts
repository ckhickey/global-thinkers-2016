/* TODO -- get MenuIcon an MenuClose modules working to insert svg code into the template */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../data.service';
import { MenuIcon } from '../../assets/svgs/menu-icon.svg';
import { MenuClose } from '../../assets/svgs/menu-close.svg';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [ DataService, MenuIcon, MenuClose ]
})

export class MenuComponent implements OnInit {

  menuClasses : Array<String> = [];
  categories : Array<any>;

  constructor(
    private dataService : DataService,
    private menuIcon : MenuIcon,
    private menuClose : MenuClose
  ) { }

  getPeople(){

    this.dataService.getData(`nav/burger_menu`)
      .subscribe(
        response=> {
          this.categories = response.categories;
        },
        error => {}
      )

  }

  openMenu(){

    let main = document.querySelector('main');
    let index = this.menuClasses.indexOf( 'is-visible' );

    if( index !== -1 ){
      this.removeClass( this.menuClasses, 'is-visible' );
      main.classList.remove('menu-open');
    }else{
      this.addClass( this.menuClasses, 'is-visible' );
      main.classList.add('menu-open');
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

  ngOnInit() {
    this.getPeople();
  }

}
