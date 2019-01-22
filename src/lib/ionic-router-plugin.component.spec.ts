import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IonicRouterPluginComponent } from './ionic-router-plugin.component';

describe('IonicRouterPluginComponent', () => {
  let component: IonicRouterPluginComponent;
  let fixture: ComponentFixture<IonicRouterPluginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IonicRouterPluginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IonicRouterPluginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
