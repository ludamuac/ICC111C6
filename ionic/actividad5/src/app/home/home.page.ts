import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/models/todo.model';
import { TodoService } from '../services/todo.service';
import { AuthService } from '../services/auth.service';
import { ModalController, AlertController } from '@ionic/angular';
import { AddTodoPage } from '../add-todo/add-todo.page';
import { EditTodoPage } from '../edit-todo/edit-todo.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  date: Date;
  segment = 'todo';
  pendingTodos: Todo[];
  doneTodos: Todo[];

  constructor(private todoService: TodoService,
              private authService: AuthService,
              private modalCtrl: ModalController,
              private alertCtrl: AlertController) {}

  ngOnInit(): void {
    this.date = new Date(Date.now());
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe((todos: Todo[]) => {
      this.pendingTodos = todos.filter((todo: Todo) => {
        return todo.status === 'todo';
      });

      this.doneTodos = todos.filter((todo: Todo) => {
        return todo.status === 'done';
      });
    });
  }

  segmentChanged(event: any): void {
    this.segment = event.detail.value;
  }

  async presentAddModal(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: AddTodoPage,
      swipeToClose: true,
    });
    return await modal.present();
  }

  async presentEditModal(todoId: string): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: EditTodoPage,
      swipeToClose: true,
      componentProps: {
        id: todoId
      }
    });
    return await modal.present();
  }

  async presentAlert(title: string, content: string): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: title,
      message: content,
      buttons: [ 'Okay']
    });
    await alert.present();
  }

  changeTodoStatus(todo: Todo): void {
    if (todo.status === 'todo') {
      todo.status = 'done';
    } else {
      todo.status = 'todo';
    }
    this.todoService.updateTodo(todo)
    .then(() => {
      if (todo.status === 'done') {
        this.presentAlert('Well done!', 'Very good, one more to-do done. Keep going!');
      } else {
        this.presentAlert('No worries!', 'Not done yet?, no problem, keep working on that!');
      }
    }).catch((error) => {
      this.presentAlert('Error!', error);
    });
  }

  deleteTodo(todoId: string): void {
    this.todoService.deleteTodo(todoId).then(() => {
      this.presentAlert('Success!', 'Your To-Do has been deleted successfully.');
    }).catch((error) => {
      this.presentAlert('Error!', error);
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
