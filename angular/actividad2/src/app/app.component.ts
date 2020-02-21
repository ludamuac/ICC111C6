import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  balance = 0;
  transactions = [];

  addTransaction(input: HTMLInputElement, operationType: string) {
    const value = Number(input.value);

    if (value <= 0) {
      alert('Por favor introduce un valor numérico mayor a 0.')
    } else {

      const transaction = {
        amount: value,
        type: operationType
      };
      this.transactions.unshift(transaction);

      if (operationType === 'income') {
        this.balance += value;
      } else if (operationType === 'expense') {
        this.balance -= value;
      }

    }
  }
}
