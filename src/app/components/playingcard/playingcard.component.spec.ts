import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {PlayingcardComponent} from './playingcard.component';

describe('PlayingcardComponent', () => {
  let component: PlayingcardComponent;
  let fixture: ComponentFixture<PlayingcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayingcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayingcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
