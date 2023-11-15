import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationMedecinComponent } from './modification-medecin.component';

describe('ModificationMedecinComponent', () => {
  let component: ModificationMedecinComponent;
  let fixture: ComponentFixture<ModificationMedecinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificationMedecinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificationMedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
