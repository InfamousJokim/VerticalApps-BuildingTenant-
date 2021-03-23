import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-inbound-pin',
  templateUrl: './inbound-pin.component.html',
  styleUrls: ['./inbound-pin.component.scss'],
})
export class InboundPinComponent implements OnInit {

  public inboundPin : any ; 

  constructor(private ns : NotificationService , private popoverController : PopoverController) { }

  ngOnInit() {
    this.GetDecryptedInboundPin();
    this.DismissClick();
  }

  async DismissClick() {
    await this.popoverController.dismiss();
      }

  async GetDecryptedInboundPin(){
    await this.ns.GetInboundPin().then((res: any) =>{
      this.inboundPin = (res['result']);
      console.log(this.inboundPin);
    })
    
  }

}
