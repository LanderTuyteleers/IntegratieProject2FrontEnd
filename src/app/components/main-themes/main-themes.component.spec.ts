import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainThemesComponent } from './main-themes.component';

describe('MainThemesComponent', () => {
  let component: MainThemesComponent;
  let fixture: ComponentFixture<MainThemesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainThemesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainThemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
