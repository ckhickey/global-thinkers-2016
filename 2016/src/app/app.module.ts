import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MenuComponent } from './menu/menu.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { AarpComponent } from './aarp/aarp.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { EssayComponent } from './essay/essay.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { ProfileNavComponent } from './profile-nav/profile-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    MenuComponent,
    LandingComponent,
    ProfileComponent,
    AarpComponent,
    StatisticsComponent,
    EssayComponent,
    HomeComponent,
    CategoryComponent,
    ProfileNavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: 'profile/:id', component: ProfileComponent },
      { path: '2016/profile/:id', component: ProfileComponent },
      { path: 'essay/:id', component: EssayComponent },
      { path: '2016/essay/:id', component: EssayComponent },
      { path: 'category/:id', component: CategoryComponent },
      { path: '2016/category/:id', component: CategoryComponent },
      { path: 'aarp', component: AarpComponent },
      { path: '2016/aarp', component: AarpComponent },
      { path: 'statistics', component: StatisticsComponent },
      { path: '2016/statistics', component: StatisticsComponent },
      { path: '', component: HomeComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
