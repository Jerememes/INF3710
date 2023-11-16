import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationMedecinComponent } from './creation-medecin.component';

describe('ModificationMedecinComponent', () => {
  let component: CreationMedecinComponent;
  let fixture: ComponentFixture<CreationMedecinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationMedecinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationMedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
