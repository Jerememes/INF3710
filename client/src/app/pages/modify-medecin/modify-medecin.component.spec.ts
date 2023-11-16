import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyMedecinComponent } from './modify-medecin.component';

describe('ModifyMedecinComponent', () => {
  let component: ModifyMedecinComponent;
  let fixture: ComponentFixture<ModifyMedecinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyMedecinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyMedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
