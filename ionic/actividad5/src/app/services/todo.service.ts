import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Todo } from 'src/models/todo.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private afs: AngularFirestore) { }

  getTodos(): Observable<Todo[]> {
    return this.afs.collection<Todo>('todosv1-todos').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Todo;
        const id = a.payload.doc.id;

        return { id, ...data } as Todo;
      }))
    );
  }

  getTodo(todoId: string): Observable<Todo> {
    return this.afs.doc(`todosv1-todos/${todoId}`).snapshotChanges().pipe(
      map(doc => {
        const data = doc.payload.data() as Todo;
        const id = doc.payload.id;

        return { id, ...data } as Todo;
      })
    );
  }

  createTodo(todo: Todo): Promise<void> {
    const afsId = this.afs.createId();
    const newTodo: Todo = {
      ...todo,
      id: afsId,
    };
    return this.afs.collection<Todo>('todosv1-todos').doc(afsId).set(newTodo);
  }

  updateTodo(todo: Todo): Promise<void> {
    return this.afs.doc<Todo>(`todosv1-todos/${todo.id}`).update(todo);
  }

  deleteTodo(todoId: string): Promise<void> {
    return this.afs.doc<Todo>(`todosv1-todos/${todoId}`).delete();
  }
}
