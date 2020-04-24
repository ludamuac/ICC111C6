import { Component, OnInit } from '@angular/core';
import { Item } from 'src/models/item.model';
import { ItemsService } from 'src/app/services/items.service';
import { ModalController } from '@ionic/angular';
import { ItemCreatePage } from '../item-create/item-create.page';
import { ItemEditPage } from '../item-edit/item-edit.page';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {

  items: Item[];

  constructor(private itemService: ItemsService,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.itemService.getItems().subscribe((items: Item[]) => {
      this.items = items;
    });
  }

  toggleStatus(item: Item): void {
    item.status = item.status === 'available' ? 'hidden' : 'available';
    this.itemService.updateItem(item).then(() => {
      console.log('Item updated successfully.');
    });
  }

  updateItem(item: Item): void {
    this.itemService.updateItem(item).then(() => {
      console.log('Item updated successfully.');
    });
  }

  delete(item: Item): void {
    this.itemService.deleteItem(item.id).then(() => {
      console.log('Item deleted successfully.');
    });
  }

  async presentAddItemModal() {
    const modal = await this.modalCtrl.create({
      component: ItemCreatePage
    });
    return await modal.present();
  }

  async presentEditItemModal(item: Item) {
    const modal = await this.modalCtrl.create({
      component: ItemEditPage,
      componentProps: {
        item: item
      }
    });
    return await modal.present();
  }
}
