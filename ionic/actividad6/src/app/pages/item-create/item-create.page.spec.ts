import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ItemCreatePage } from './item-create.page';

describe('ItemCreatePage', () => {
  let component: ItemCreatePage;
  let fixture: ComponentFixture<ItemCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCreatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
