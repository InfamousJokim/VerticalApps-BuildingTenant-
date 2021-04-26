import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InboundPinComponent } from './inbound-pin.component';

describe('InboundPinComponent', () => {
  let component: InboundPinComponent;
  let fixture: ComponentFixture<InboundPinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InboundPinComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InboundPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
