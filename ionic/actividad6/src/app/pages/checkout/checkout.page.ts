import { Component, OnInit } from '@angular/core';
import { Item } from 'src/models/item.model';
import { NavController } from '@ionic/angular';
import { CartService } from 'src/app/services/cart.service';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  cart: any;
  items: Item[];

  segment = 'library';
  keypadValue = 0.0;
  keypadEntry = '00.00';

  constructor(private itemsService: ItemsService,
              private cartService: CartService,
              private navCtrl: NavController) { }

  ngOnInit() {
    this.cart = this.cartService.getCart;
    this.itemsService.getAvailableItems().subscribe((items: Item[]) => {
      this.items = items;
    });
  }

  segmentChanged(event: any): void {
    this.segment = event.target.value;
  }

  charge(): void {
    this.navCtrl.navigateForward(['/menu/charge']);
  }

  addToCart(item: Item): void {
    this.cartService.addToCart(item).then((cart) => {
      this.cart = cart;
    });
  }

  addCustomEntry(): void {
    const customEntry = {
      name: 'Custom Entry',
      price: this.keypadValue,
    };

    this.cartService.addCustomEntry(customEntry).then((cart) => {
      this.cart = cart;
      this.clearKeypad();
    });
  }

  appendToKeypad(value: string): void {
    const integer = Number(this.keypadEntry.split('.')[0]);
    const decimal = this.keypadEntry.split('.')[1];

    this.keypadEntry = `${integer}${decimal.slice(0, 1)}.${decimal.slice(1, decimal.length)}${value}`;
    this.keypadValue = Number(this.keypadEntry);
  }

  clearKeypad(): void {
    this.keypadEntry = '00.00';
    this.keypadValue = 0;
  }

  clearItems(): void {
    this.cartService.clearCart();
    this.cart = this.cartService.getCart;
  }
}
