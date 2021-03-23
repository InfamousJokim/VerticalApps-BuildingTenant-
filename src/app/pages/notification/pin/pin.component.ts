import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss'],
  providers : [NotificationService]
})
export class PinComponent implements OnInit {

  public outboundPin : any ; 
  
  


  constructor(private ns : NotificationService , private popoverController : PopoverController ) { }

  ngOnInit() {

    this.GetDecryptedOutboundPin();
    this.DismissClick();
  }

  async DismissClick() {
    await this.popoverController.dismiss();
      }

  async GetDecryptedOutboundPin(){
    await this.ns.GetOutboundPin().then((res: any) =>{
      this.outboundPin = (res['result']);
      console.log(this.outboundPin);
    })
    
  }

  


}
