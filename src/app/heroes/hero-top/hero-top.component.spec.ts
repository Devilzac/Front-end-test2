import { Hero } from './../shared/hero.model';
import { Observable } from 'rxjs/Observable';
import { HeroRowComponent } from './../hero-row/hero-row.component';
import {async, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';
import {HeroTopComponent} from './hero-top.component';
import {HeroService} from '../shared/hero.service';
import {TestsModule} from '../../shared/modules/tests.module';
import {TranslateModule} from '@ngx-translate/core';
import {APP_CONFIG, AppConfig} from '../../config/app.config';
import {NO_ERRORS_SCHEMA} from '@angular/core';

const heroes: Hero[] = [
  new Hero(0, 'A', 'B', 0),
  new Hero(0, 'C', 'D', 0),
  new Hero(0, 'E', 'F', 0),
  new Hero(0, 'G', 'H', 0),
  new Hero(0, 'I', 'J', 0),
  new Hero(0, 'K', 'L', 0),
];

describe('HeroTopComponent', () => {
  let fixture;
  let component;
  let heroService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule,
        TranslateModule.forRoot(),
      ],
      declarations: [
        HeroTopComponent
      ],
      providers: [
        {provide: APP_CONFIG, useValue: AppConfig},
        {provide: APP_BASE_HREF, useValue: '/'},
        HeroService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    
    heroService = TestBed.get(HeroService);

    spyOn(heroService, 'getAllHeroes').and.callFake(() => {
      return Observable.of(heroes);
    });

    fixture = TestBed.createComponent(HeroTopComponent);
    component = fixture.debugElement.componentInstance;

    fixture.detectChanges();
  }));

  it('should create hero top component', (() => {
    expect(component).toBeTruthy();
  }));

  it('should initialice component', async(() => {
    fixture.detectChanges();

    component.heroes.subscribe((_heroes: Hero[]) => {
      expect(_heroes.length).toBe(heroes.length);
    });
  }));

  it('should like a hero', async(() => {
    localStorage.setItem('votes', String(AppConfig.votesLimit - 1));
    component.like({id: 1}).then((result) => {
      expect(result).toBe(true);
    });
  }));

  it('should not like a hero', async(() => {
    localStorage.setItem('votes', String(AppConfig.votesLimit));
    component.like({id: 1}).then(() => {
    }, (error) => {
      expect(error).toBe('maximum votes');
    });
    expect(heroService.checkIfUserCanVote()).toBe(false);
  }));
});
