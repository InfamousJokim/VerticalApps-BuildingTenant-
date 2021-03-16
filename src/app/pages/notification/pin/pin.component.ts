import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss'],
  providers : [NotificationService]
})
export class PinComponent implements OnInit {

  public outboundPin : any ; 
  public inboundPin : any ; 
  


  constructor(private ns : NotificationService ) { }

  ngOnInit() {

    this.GetDecyptedInboundPin();
  }

  async GetDecyptedInboundPin(){
    await this.ns.GetOutboundPin().then((res: any) =>{
      this.outboundPin = (res['result']);
      console.log(this.outboundPin);
    })
    
  }


}
