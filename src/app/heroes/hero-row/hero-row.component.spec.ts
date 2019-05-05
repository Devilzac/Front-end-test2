import { Hero } from './../shared/hero.model';
import { TranslateModule } from '@ngx-translate/core';
import { TestsModule } from './../../shared/modules/tests.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroRowComponent } from './hero-row.component';

describe('HeroRowComponent', () => {
  let component: HeroRowComponent;
  let fixture: ComponentFixture<HeroRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule,
        TranslateModule.forRoot(),
      ],
      declarations: [ HeroRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroRowComponent);
    component = fixture.componentInstance;
    component.hero = new Hero(1, "Batman", "Bruce Wayne", 0);
    component.canVote = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
