import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditTodoPage } from './edit-todo.page';

describe('EditTodoPage', () => {
  let component: EditTodoPage;
  let fixture: ComponentFixture<EditTodoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTodoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditTodoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
