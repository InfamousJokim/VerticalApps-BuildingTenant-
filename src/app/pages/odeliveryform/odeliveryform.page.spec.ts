import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OdeliveryformPage } from './odeliveryform.page';

describe('OdeliveryformPage', () => {
  let component: OdeliveryformPage;
  let fixture: ComponentFixture<OdeliveryformPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OdeliveryformPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OdeliveryformPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
