import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSessionEditComponent } from './game-session-edit.component';

describe('GameSessionEditComponent', () => {
  let component: GameSessionEditComponent;
  let fixture: ComponentFixture<GameSessionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameSessionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameSessionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
