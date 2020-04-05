import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TodoService } from '../services/todo.service';
import { AuthService } from '../services/auth.service';
import { ModalController, AlertController } from '@ionic/angular';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.page.html',
  styleUrls: ['./add-todo.page.scss'],
})
export class AddTodoPage implements OnInit {

  todoForm: FormGroup;

  constructor(private todoService: TodoService,
              private authService: AuthService,
              private modalCtrl: ModalController,
              private alertCtrl: AlertController) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.todoForm = new FormGroup({
      description: new FormControl(null, [Validators.required])
    });
  }

  onSubmit(): void {
    if (this.todoForm.valid) {
      const newTodo: Todo = {
        id: null,
        owner: this.authService.user.email,
        description: this.todoForm.controls.description.value,
        status: 'todo'
      };
      this.todoService.createTodo(newTodo).then(() => {
        this.presentAlertConfirm();
      }).catch((error) => {
        console.log(error);
      });
    } else {
      console.log('Form not complete');
    }
  }

  async presentAlertConfirm(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Success!',
      message: 'Your To-Do has been created successfully',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.dismiss();
          }
        }
      ]
    });

    await alert.present();
  }

  dismiss(): void {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
}
