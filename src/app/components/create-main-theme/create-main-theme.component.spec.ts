import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMainThemeComponent } from './create-main-theme.component';

describe('CreateMainThemeComponent', () => {
  let component: CreateMainThemeComponent;
  let fixture: ComponentFixture<CreateMainThemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMainThemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMainThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
