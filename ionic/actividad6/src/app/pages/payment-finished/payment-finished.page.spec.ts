import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PaymentFinishedPage } from './payment-finished.page';

describe('PaymentFinishedPage', () => {
  let component: PaymentFinishedPage;
  let fixture: ComponentFixture<PaymentFinishedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentFinishedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentFinishedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
