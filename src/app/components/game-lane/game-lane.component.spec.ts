import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameLaneComponent } from './game-lane.component';

describe('GameLaneComponent', () => {
  let component: GameLaneComponent;
  let fixture: ComponentFixture<GameLaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameLaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameLaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
