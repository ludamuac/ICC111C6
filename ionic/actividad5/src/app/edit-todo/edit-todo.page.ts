import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/models/todo.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TodoService } from '../services/todo.service';
import { ModalController, AlertController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.page.html',
  styleUrls: ['./edit-todo.page.scss'],
})
export class EditTodoPage implements OnInit {

  todo: Todo;
  todoForm: FormGroup;

  constructor(private todoService: TodoService,
              private modalCtrl: ModalController,
              private alertCtrl: AlertController,
              private navParams: NavParams) { }

  ngOnInit(): void {
    this.initForm();
    const todoId = this.navParams.get('id');
    this.getTodo(todoId);
  }

  initForm(): void {
    this.todoForm = new FormGroup({
      description: new FormControl(null, [Validators.required])
    });
  }

  patchForm(): void {
    this.todoForm.patchValue(this.todo);
  }

  getTodo(todoId: string): void {
    this.todoService.getTodo(todoId).subscribe((todo: Todo) => {
      this.todo = todo;
      this.patchForm();
    });
  }

  onSubmit(): void {
    if (this.todoForm.valid) {
      this.todo.description = this.todoForm.controls.description.value;

      this.todoService.updateTodo(this.todo).then(() => {
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
      message: 'Your To-Do has been updated successfully',
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
