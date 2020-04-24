import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Item } from 'src/models/item.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private afs: AngularFirestore) { }

  getItems(): Observable<Item[]> {
    return this.afs.collection('pos-items').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;

        return { id, ...data } as Item;
      }))
    );
  }

  getAvailableItems(): Observable<Item[]> {
    return this.afs.collection('pos-items', ref => ref.where('status', '==', 'available'))
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;

          return { id, ...data } as Item;
        }))
      );
  }

  createItem(item: Item): Promise<void> {
    item.id = this.afs.createId();

    return this.afs.doc(`pos-items/${item.id}`).set(item);
  }

  updateItem(item: Item): Promise<void> {
    return this.afs.doc(`pos-items/${item.id}`).update(item);
  }

  deleteItem(itemId: string): Promise<void> {
    return this.afs.doc(`pos-items/${itemId}`).delete();
  }
}
