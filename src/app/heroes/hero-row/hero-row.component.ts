import { Hero } from './../shared/hero.model';
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-hero-row',
  templateUrl: './hero-row.component.html',
  styleUrls: ['./hero-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroRowComponent implements OnInit {
  @Input() hero:Hero;
  @Input() canVote:boolean;

  @Output() onRemove: EventEmitter<Hero> = new EventEmitter<Hero>();
  @Output() onLike: EventEmitter<Hero> = new EventEmitter<Hero>();

  constructor() { }

  ngOnInit() {
  }

  removeHero(hero: Hero){
    this.onRemove.emit(hero);
  }

  likeHero(hero: Hero){
    this.onLike.emit(hero);
  }
}
