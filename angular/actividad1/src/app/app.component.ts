import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  inputValue: string = null;

  updateValue(input: HTMLInputElement): void {
    if (input.value === '') {
      alert('El elemento de entrada debe contener un valor.');
    } else {
      this.inputValue = input.value;
    }
  }
}
