import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { NotificationService } from '../pages/notification/notification.service';
import {Notifications} from '../interface' ; 
import { HomeService } from './home.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers : [NotificationService , HomeService] ,
  encapsulation: ViewEncapsulation.None
})
export class HomePage implements OnInit {

 

  public inbounds : any ; 
  public outbounds : any ; 

  public num_inbound_notification : number ; 
  public num_outbound_notification : number ; 

  public UserDeliveryRecords : any[] = [] ; 

  constructor(private NS : NotificationService , private HS : HomeService) {}


  //Refreshing 
  async doRefresh(event){
    await this.get_deliveries();
    await this.ngOnInit();
    event.target.complete();
  }

  async ionViewWillEnter(){
    await this.get_deliveries();
  }

  async get_deliveries(){
    await delay(200);
    if(this.UserDeliveryRecords !== null){
      this.num_outbound_notification = this.UserDeliveryRecords.length;
      console.log("Number of outbound deliveries : " + this.num_outbound_notification);
    }
    
    

  }




  async ngOnInit(){


    //Get the list of outbound deliveries 
    this.HS.GetOutboundData().then((res : any) => {
      this.outbounds = res['result']['list'];
      console.log(this.outbounds);
      //this.GetNotificationNum();
    })
    
    //Get the list of inbound deliveries 
    this.HS.getInboundData().then((res : any ) => {
      this.inbounds = res['result']['list'];
      console.log(this.inbounds);
      
    })
    await this.get_deliveries();
  }

  
}
