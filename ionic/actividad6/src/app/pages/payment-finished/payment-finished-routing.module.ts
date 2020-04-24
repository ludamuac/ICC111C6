import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentFinishedPage } from './payment-finished.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentFinishedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentFinishedPageRoutingModule {}
