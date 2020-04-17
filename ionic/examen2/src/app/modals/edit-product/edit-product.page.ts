import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from 'src/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.page.html',
  styleUrls: ['./edit-product.page.scss'],
})
export class EditProductPage implements OnInit {

  product: Product;
  productForm: FormGroup;

  constructor(private productService: ProductService,
              private modalCtrl: ModalController,
              private navParams: NavParams) { }

  ngOnInit() {
    this.initForm();

    const productId = this.navParams.get('productId');

    if (productId) {
      this.getProduct(productId);
    } else {

    }
  }

  initForm(): void {
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      availability: new FormControl('', [Validators.required]),
    });
  }

  getProduct(productId: string) {
    this.productService.getProduct(productId).subscribe((product: Product) => {
      this.product = product;
      this.productForm.patchValue(product);
    });
  }

  updateProduct(): void {
    if (this.productForm.valid) {
      const updatedProduct: Product = {
        ...this.productForm.value,
        id: this.product.id
      };

      this.productService.updateProduct(updatedProduct).then(() => {
        this.dismiss();
      }).catch((error) => {
        console.log(error);
      });
    } else {
      console.log('error');
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
