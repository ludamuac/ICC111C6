import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Product } from 'src/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private afs: AngularFirestore) { }

  getProduct(productId: string) {
    return this.afs.doc(`products/${productId}`).snapshotChanges().pipe(
      map(doc => {
        const data = doc.payload.data() as any;
        const id = doc.payload.id;

        return { id, ...data } as Product;
      })
    );
  }

  getProducts() {
    return this.afs.collection('products').snapshotChanges().pipe(
      map(snap => snap.map(doc => {
        const data = doc.payload.doc.data() as any;
        const id = doc.payload.doc.id;

        return { id, ...data } as Product;
      }))
    );
  }

  addProduct(product: Product) {
    const id = this.afs.createId();
    product.id = id;

    return this.afs.doc(`products/${id}`).set(product);
  }

  updateProduct(product: Product) {
    return this.afs.doc(`products/${product.id}`).update(product);
  }

  deleteProduct(id: string) {
    return this.afs.doc(`products/${id}`).delete();
  }
}
