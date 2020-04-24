import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-payment-finished',
  templateUrl: './payment-finished.page.html',
  styleUrls: ['./payment-finished.page.scss'],
})
export class PaymentFinishedPage implements OnInit {

  constructor(private cartService: CartService,
              private navCtrl: NavController) { }

  ngOnInit() {
    this.cartService.clearCart();
  }

  newSale() {
    this.navCtrl.navigateRoot(['/menu/checkout']);
  }
}
