import { Observable } from 'rxjs/Observable';
import {Component} from '@angular/core';

import {Hero} from '../shared/hero.model';

import {HeroService} from '../shared/hero.service';
import {AppConfig} from '../../config/app.config';

@Component({
  selector: 'app-hero-top',
  templateUrl: './hero-top.component.html',
  styleUrls: ['./hero-top.component.scss']
})
export class HeroTopComponent {

  limit: Number = AppConfig.topHeroesLimit;
  heroes: Observable<Hero[]>;
  canVote = false;
  allHeros: Array<Object>;

  constructor(private heroService: HeroService) {
    this.canVote = this.heroService.checkIfUserCanVote();
    this.heroService.getAllHeroes().subscribe( data => {

      this.allHeros = [];
      
      data.forEach( ( x ) => {
           this.allHeros.push( x );
       } );

  }, err => { } );
  }

  like(hero: Hero): Promise<any> {
    return new Promise((resolve, reject) => {
      this.heroService.like(hero).subscribe(() => {
        this.canVote = this.heroService.checkIfUserCanVote();
        resolve(true);
      }, (error) => {
        reject(error);
      });
    });
  }
}
