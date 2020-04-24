import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/models/transaction.model';
import { TransactionService } from 'src/app/services/transaction.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {

  transactions: any[] = [];

  constructor(private transactionService: TransactionService,
              private navCtrl: NavController) { }

  ngOnInit() {
    this.getTransactions();
  }

  getTransactions(): void {
    this.transactionService.getTransactions().subscribe((transactions: Transaction[]) => {
      const grouped = transactions.reduce((r, a) => {
        const d = new Date(a.date).setHours(0, 0, 0, 0).toString();
        r[d] = [...r[d] || [], a];
        return r;
      }, {});

      const keysSorted = Object.keys(grouped).sort((a, b) => {
        return Number(b) - Number(a);
      });

      for (const key in keysSorted) {
        if (keysSorted.hasOwnProperty(key)) {
          const obj = {
            date: keysSorted[key],
            transactions: grouped[keysSorted[key]]
          };
          this.transactions.push(obj);
        }
      }
    });
  }

  seeDetail(transactionId: string): void {
    this.navCtrl.navigateForward(['/menu/transactions', transactionId]);
  }

}
