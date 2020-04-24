import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  pages = [
    {
      title: 'Checkout',
      icon: 'receipt-outline',
      url: '/menu/checkout'
    },
    {
      title: 'Transactions',
      icon: 'swap-vertical-outline',
      url: '/menu/transactions'
    },
    {
      title: 'Items',
      icon: 'list-outline',
      url: '/menu/items'
    },
  ];

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  logOut(): void {
    this.authService.logout();
  }

}
