import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoreInfoInboundPage } from './more-info-inbound.page';

describe('MoreInfoInboundPage', () => {
  let component: MoreInfoInboundPage;
  let fixture: ComponentFixture<MoreInfoInboundPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreInfoInboundPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoreInfoInboundPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
