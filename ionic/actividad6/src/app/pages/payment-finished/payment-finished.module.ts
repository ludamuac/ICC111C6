import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentFinishedPageRoutingModule } from './payment-finished-routing.module';

import { PaymentFinishedPage } from './payment-finished.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentFinishedPageRoutingModule
  ],
  declarations: [PaymentFinishedPage]
})
export class PaymentFinishedPageModule {}
