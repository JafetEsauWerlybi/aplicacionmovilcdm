import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagarcarritoPage } from './pagarcarrito.page';

describe('PagarcarritoPage', () => {
  let component: PagarcarritoPage;
  let fixture: ComponentFixture<PagarcarritoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PagarcarritoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
