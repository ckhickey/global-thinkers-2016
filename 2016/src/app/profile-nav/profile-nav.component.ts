import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-nav',
  templateUrl: './profile-nav.component.html',
  styleUrls: ['./profile-nav.component.css']
})
export class ProfileNavComponent implements OnInit {

  @Input() group : Object
  @Input() colors : Object
  @Input() routeID : string
  @Input() currentCat: string;
  @Input() animate: any;

  isClassVisible: false;
  firstCheck : boolean = true;

  constructor( private sanitizer : DomSanitizer, private router : Router) { 
  }

  // to add active state to nav items
  isActive( url : string ){
    if( url == this.routeID ){
      return true;
    }

  }

  getColor( url ){
    if( this.isActive( url ) == true ){
      return this.colors['full'];
    }
  }

  navigate( slug: string ){
    if( slug != this.routeID ){
      this.animate("center", "out");
      let ctrl = this;
      setTimeout(function(){
        ctrl.router.navigate([ '/profile/'  +  slug ]);
      }, 300);
    }
    
  }

  convertHex(hex,opacity){

    hex = hex.replace('#','');
    let r = parseInt(hex.substring(0,2), 16);
    let g = parseInt(hex.substring(2,4), 16);
    let b = parseInt(hex.substring(4,6), 16);

    let result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
    return result;
  }

  applyGradient( fadeTo : String){
    if( this.colors['half'] != undefined ){

      let color = this.colors['half'];
      let transparent = this.convertHex( this.colors['half'], 0);

      return this.sanitizer.bypassSecurityTrustStyle('linear-gradient(to ' + fadeTo + ', ' + transparent + ',' + this.colors['half'] + ' 40%)');
    }
  }

  checkPosition( el ){

        var _x = 0;
        var _y = 0;
        if( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
            _x += el.offsetLeft;
            _y += el.offsetTop;
        }
        return { top: _y, left: _x };
  }

  navWidth( ){
    let items = document.querySelectorAll('#nav-wrapper li');
    let navWidth = 0;
    for( let i = 0; i < items.length; i++){
      navWidth += parseInt(window.getComputedStyle(items[i]).width);
    }
    return navWidth;
  }

  centerNav(){
    
    let active : any = document.querySelector('li a.active');
    let wrapper : any = document.querySelector('#nav-wrapper')
    let activePosition = this.checkPosition(active).left;
    let windowWidth = window.innerWidth;
    

    if( ( this.firstCheck == true) && ( activePosition !== 0 ) ){
      let activeWidth = active.offsetWidth;
      wrapper.style.width = this.navWidth() + 'px';
      wrapper.style.position = 'relative';
      wrapper.style.marginLeft = (windowWidth/2) - activePosition - (activeWidth/2) + 'px';
      wrapper.style.paddingLeft = (windowWidth/2) + 'px';
      wrapper.style.paddingRight = (windowWidth/2) + 'px';
    }
      
  }

  ngOnInit() {
    
  }

  ngAfterViewChecked(){

    let ctrl = this;
    this.centerNav();
    window.onresize = function(event){ ctrl.centerNav() };

  }



}
