import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbyItemUserComponent } from './lobby-item-user.component';

describe('LobbyItemUserComponent', () => {
  let component: LobbyItemUserComponent;
  let fixture: ComponentFixture<LobbyItemUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LobbyItemUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LobbyItemUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
