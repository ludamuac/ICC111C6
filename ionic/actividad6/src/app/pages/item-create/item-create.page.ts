import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ItemsService } from 'src/app/services/items.service';
import { Item } from 'src/models/item.model';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.page.html',
  styleUrls: ['./item-create.page.scss'],
})
export class ItemCreatePage implements OnInit {

  itemForm: FormGroup;

  constructor(private itemService: ItemsService,
              private modalCtrl: ModalController,
              private alertCtrl: AlertController) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.itemForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    if (this.itemForm.valid) {
      const newItem: Item = {
        ...this.itemForm.value,
        id: null,
        status: 'available'
      };

      this.itemService.createItem(newItem).then(() => {
        this.presentAlert('Done!', 'Your item has been created successfully!.');
        this.dismiss();
      }).catch((error) => {
        this.presentAlert('Error!', error);
      });
    } else {
      this.presentAlert('Error!', 'Please fill in the name and price fields.');
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
