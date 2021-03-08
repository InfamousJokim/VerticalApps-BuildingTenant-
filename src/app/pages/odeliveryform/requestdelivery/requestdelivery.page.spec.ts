import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RequestdeliveryPage } from './requestdelivery.page';

describe('RequestdeliveryPage', () => {
  let component: RequestdeliveryPage;
  let fixture: ComponentFixture<RequestdeliveryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestdeliveryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RequestdeliveryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
