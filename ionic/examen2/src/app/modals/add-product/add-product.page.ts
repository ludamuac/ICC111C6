import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from 'src/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {

  productForm: FormGroup;

  constructor(private productService: ProductService,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    this.initForm();
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

  createProduct(): void {
    if (this.productForm.valid) {
      const newProduct: Product = {
        id: null,
        ...this.productForm.value
      };

      this.productService.addProduct(newProduct).then(() => {
        this.dismiss();
      }).catch((error) => {
        console.log(error);
      });
      console.log(newProduct);
    } else {
      console.log('error');
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
