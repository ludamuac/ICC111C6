import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, NavParams } from '@ionic/angular';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ItemsService } from 'src/app/services/items.service';
import { Item } from 'src/models/item.model';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.page.html',
  styleUrls: ['./item-edit.page.scss'],
})
export class ItemEditPage implements OnInit {

  item: Item;
  itemForm: FormGroup;

  constructor(private itemService: ItemsService,
              private modalCtrl: ModalController,
              private alertCtrl: AlertController,
              private navParams: NavParams) { }

  ngOnInit() {
    this.initForm();
    this.item = this.navParams.get('item');

    if (this.item !== null && this.item !== undefined) {
      this.patchForm();
    } else {
      this.dismiss();
    }
  }

  initForm(): void {
    this.itemForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required])
    });
  }

  patchForm(): void {
    this.itemForm.patchValue({
      name: this.item.name,
      price: this.item.price
    });
  }

  onSubmit() {
    if (this.itemForm.valid) {
      const newItem: Item = {
        ...this.item,
        ...this.itemForm.value,
      };

      this.itemService.updateItem(newItem).then(() => {
        this.presentAlert('Done!', 'Your item has been updated successfully!.');
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
