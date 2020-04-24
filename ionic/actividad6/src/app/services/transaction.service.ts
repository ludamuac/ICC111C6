import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Transaction } from 'src/models/transaction.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private afs: AngularFirestore) { }

  getTransactions(): Observable<Transaction[]>  {
    return this.afs.collection('pos-transactions').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;

        return { id, ...data } as Transaction;
      }))
    );
  }

  getTransaction(transactionId: string) {
    return this.afs.doc(`pos-transactions/${transactionId}`).snapshotChanges().pipe(
      map(a => {
        const data = a.payload.data() as any;
        const id = a.payload.id;

        return { id, ...data } as Transaction;
      })
    );
  }

  createTransaction(transaction: any): Promise<void> {
    const transactionId = this.afs.createId();
    const transactionDate = Date.now();
    const newTransaction: Transaction = {
      ...transaction,
      id: transactionId,
      date: transactionDate
    };

    return this.afs.doc(`pos-transactions/${transactionId}`).set(newTransaction);
  }
}
