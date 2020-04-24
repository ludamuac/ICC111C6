import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { NavController, LoadingController, ModalController } from '@ionic/angular';
import { Cart } from 'src/models/cart.model';

@Component({
  selector: 'app-charge',
  templateUrl: './charge.page.html',
  styleUrls: ['./charge.page.scss'],
})
export class ChargePage implements OnInit {

  cart: Cart;
  items = [];

  constructor(private cartService: CartService,
              private navCtrl: NavController,
              private loadingCtrl: LoadingController) { }

  ngOnInit(): void {
    if (this.cartService.isCartEmpty()) {
      this.navCtrl.navigateRoot(['/menu/checkout']);
    }
    this.cart = this.cartService.getCart;
    this.items = this.cartService.getCartItems();
  }

  confirmPayment(): void {
    this.navCtrl.navigateRoot(['/menu/tip']);
  }

  async presentLoading(): Promise<void> {
    const loading = await this.loadingCtrl.create({
      message: 'Processing Payment...',
      duration: 2000
    });
    await loading.present();
    await loading.onDidDismiss().then(() => {
      this.confirmPayment();
    });
  }
}
