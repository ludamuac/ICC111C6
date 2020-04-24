import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/models/transaction.model';
import { TransactionService } from 'src/app/services/transaction.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.page.html',
  styleUrls: ['./transaction-detail.page.scss'],
})
export class TransactionDetailPage implements OnInit {

  transaction: Transaction;

  constructor(private transactionService: TransactionService,
              private activatedRoute: ActivatedRoute,
              private navCtrl: NavController) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('transactionId');
    if (id) {
      this.getTransaction(id);
    } else {
      this.navCtrl.navigateRoot(['/menu/transactions']);
    }
  }

  getTransaction(transactionId: string) {
    this.transactionService.getTransaction(transactionId).subscribe((transaction: Transaction) => {
      this.transaction = transaction;
    });
  }

}
