import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SidepopoverPage } from './sidepopover.page';

describe('SidepopoverPage', () => {
  let component: SidepopoverPage;
  let fixture: ComponentFixture<SidepopoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidepopoverPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SidepopoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
