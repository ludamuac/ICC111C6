import { Injectable } from '@angular/core';
import { Item } from 'src/models/item.model';
import { Cart } from 'src/models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: Cart = {
    items: {},
    customEntries: [],
    totalQuantity: 0,
    subtotal: 0,
    tax: 0,
    tips: 0,
    total: 0
  };

  constructor() {
    const sessionCart: Cart = JSON.parse(localStorage.getItem('cart'));

    if (sessionCart) {
      this.cart = sessionCart;
    } else {
      this.updateSessionCart();
    }
  }

  get getCart(): any {
    return this.cart;
  }

  updateSessionCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  clearCart(): void {
    this.cart = {
      items: {},
      customEntries: [],
      totalQuantity: 0,
      subtotal: 0,
      tax: 0,
      tips: 0,
      total: 0
    };
    this.updateSessionCart();
  }

  isCartEmpty(): boolean {
    return this.cart.totalQuantity < 1;
  }

  addToCart(item: Item): Promise<any> {
    return new Promise((resolve, reject) => {
      let storedItem = this.cart.items[item.id];

      if (!storedItem) {
        storedItem = this.cart.items[item.id] = { item: item, quantity: 0, price: 0 };
      }

      storedItem.quantity++;
      storedItem.price = storedItem.item.price * storedItem.quantity;
      this.cart.totalQuantity++;
      this.cart.subtotal += storedItem.item.price;
      this.cart.tax = this.cart.subtotal * .0975;
      this.cart.total = this.cart.subtotal + this.cart.tax + this.cart.tips;
      this.updateSessionCart();

      resolve(this.cart);
    });
  }

  addCustomEntry(customEntry: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cart.customEntries.push(customEntry);
      this.cart.totalQuantity++;
      this.cart.subtotal += customEntry.price;
      this.cart.tax = this.cart.subtotal * .0975;
      this.cart.total = this.cart.subtotal + this.cart.tax + this.cart.tips;
      this.updateSessionCart();

      resolve(this.cart);
    });
  }

  addTip(tip: number) {
    this.cart.tips = tip;
    this.cart.total = this.cart.subtotal + this.cart.tax + this.cart.tips;
    this.updateSessionCart();
  }

  getCartItems(): Item[] {
    const items = [];
    for(const id in this.cart.items) {
      const item = {
        ...this.cart.items[id].item,
        quantity: this.cart.items[id].quantity,
        totalPrice: this.cart.items[id].price
      };
      items.push(item);
    }

    return items;
  }
}
