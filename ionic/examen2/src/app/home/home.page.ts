import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from 'src/models/product.model';
import { ModalController } from '@ionic/angular';
import { AddProductPage } from '../modals/add-product/add-product.page';
import { EditProductPage } from '../modals/edit-product/edit-product.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  segment = 'available';
  availableProducts: Product[];
  unavailableProducts: Product[];

  constructor(private productService: ProductService,
              private modalCtrl: ModalController) {}

  ngOnInit(): void {
    this.getProducts();
  }

  segmentChanged(event: any) {
    this.segment = event.detail.value;
  }

  getProducts(): void {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.availableProducts = products.filter((product: Product) => {
        return product.availability === 'available';
      });

      this.unavailableProducts = products.filter((product: Product) => {
        return product.availability === 'unavailable';
      });
    });
  }

  deleteProduct(productId: string): void {
    this.productService.deleteProduct(productId).then(() => {
      console.log('Product deleted.');
    }).catch((error) => {
      console.log(error);
    });
  }

  toggleAvailability(product: Product): void {
    product.availability = (product.availability === 'available') ? 'unavailable' : 'available';

    this.productService.updateProduct(product).then(() => {
      console.log('Visibility updated');
    }).catch((error) => {
      console.log(error);
    });
  }

  async showAddModal() {
    const modal = await this.modalCtrl.create({
      component: AddProductPage,
      swipeToClose: true,
    });
    return await modal.present();
  }

  async showEditModal(productId: string) {
    const modal = await this.modalCtrl.create({
      component: EditProductPage,
      swipeToClose: true,
      componentProps: {
        productId
      }
    });
    return await modal.present();
  }
}
