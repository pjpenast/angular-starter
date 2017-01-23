import { inject, async, TestBed, ComponentFixture } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { AppState } from './app.service';

describe('App', () => {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      providers: [ AppState ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture =  TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
  });

  it(`should be readly initialized`, () => {
    expect(fixture).toBeDefined();
    expect(comp).toBeDefined();
  });

});
