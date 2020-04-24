import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { Cart } from 'src/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-tip',
  templateUrl: './tip.page.html',
  styleUrls: ['./tip.page.scss'],
})
export class TipPage implements OnInit {

  cart: Cart;

  constructor(private cartService: CartService,
              private transactionService: TransactionService,
              private navCtrl: NavController,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) { }

  ngOnInit() {
    if (this.cartService.isCartEmpty()) {
      this.navCtrl.navigateRoot(['/menu/checkout']);
    }
    this.cart = this.cartService.getCart;
  }

  addTip(tip: number) {
    this.cartService.addTip(tip);
    this.processPayment();
  }

  processPayment() {
    const transaction = {
      ...this.cartService.getCart,
      items: this.cartService.getCartItems()
    };

    this.transactionService.createTransaction(transaction).then(() => {
      this.presentLoading();
    });
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Processing Tip...',
      duration: 2000
    });
    await loading.present();
    await loading.onDidDismiss().then(() => {
      this.finish();
    });
  }

  async presentCustomTipPrompt() {
    const alert = await this.alertCtrl.create({
      header: 'Add your tip!',
      inputs: [
        {
          name: 'tip',
          type: 'number',
          min: 0,
          value: 0,
          placeholder: '$ USD'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Ok',
          handler: (data) => {
            if (data.tip !== 0) {
              this.addTip(Number(data.tip));
            }
          }
        }
      ]
    });

    await alert.present();
  }

  finish() {
    this.navCtrl.navigateForward(['/menu/finish']);
  }
}
