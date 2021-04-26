import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Inbound_Delivery, Outbound_Delivery } from 'src/app/interface';
import { SettingService } from './setting.service';


@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
  providers : [SettingService]
})
export class SettingPage implements OnInit {

  Delivery_orn : string ; 
  Delivery_orn2 : string ; 
  SelectedOutbound : string ; 

  //Status for notification 
  status1 : string; 
  status2 : string; 
  status3 : string ; 


  public outbound : Outbound_Delivery ; 
  public outbounds : any ; 

  public inbound : Inbound_Delivery ; 
  public inbounds : any ; 

  InboundStatus : string ; 

  

  constructor(public SS : SettingService , private http : HttpClient) { }

  ngOnInit() {

    //Calling GetOutboundDeliveries API to get list of all outbound deliveries 
    this.SS.GetOutboundDelivery().then((res : any ) => {
      this.outbounds = res['result']['list'];
      console.log(this.outbounds);
    })

    //Calling GetInboundDeliveries API to get list of all inbound deliveries 
    this.SS.GetInboundDelivery().then((res : any ) => {
      this.inbounds = res['result']['list'];
      console.log(this.inbounds);
    })
    

  }

  //Checking the previous Status && call the API to update delivery status (To BT)
  BTDeliveryStatusLogic(outbound : any){
   
    
    if(outbound.delivery_status == "Cart to Building Tenant"){
      this.status1 = "Cart Arrived at Building Tenant"
      localStorage.setItem("UpdateDataBT", JSON.stringify(outbound));
      let outbounddata = JSON.parse(localStorage.getItem("UpdateDataBT"));
      this.SS.UpdateOutboundDeliveryStatus(outbounddata.orn , this.status1); 
      
    }

    

    /*if(outbound.delivery_status == "Parcel Awaiting for Collection by Logistic Partner"){

      localStorage.setItem("UpdateDataBT", JSON.stringify(outbound));
      let outbounddata = JSON.parse(localStorage.getItem("UpdateDataBT"));
      this.SS.UpdateOutboundDeliveryStatus(outbounddata.orn , this.status1); 
      
    }*/
  }

  //Checking the previous Status && call the API to update delivery status (To DA)
  DADeliveryStatusLogic(outbound : any){
    console.log(outbound);
    console.log(outbound.delivery_status);
    if(outbound.delivery_status == "Cart to Depot Admin"){
      this.status2 = "Cart Arrived at Depot Admin"
      localStorage.setItem("UpdateDataDA", JSON.stringify(outbound));
      let outbounddata = JSON.parse(localStorage.getItem("UpdateDataDA"));
      this.SS.UpdateOutboundDeliveryStatus(outbounddata.orn , this.status2); 
      
    }
  }

   //Checking the previous Status && call the API to update delivery status (To Logistic Partner)
   LogDeliveryStatusLogic(outbound : any){
    console.log(outbound);
    console.log(outbound.delivery_status);
    if(outbound.delivery_status == "Parcel Awaiting Collection"){
      this.status3 = "Handled Over to Logistic Partner"
      localStorage.setItem("UpdateDataLog", JSON.stringify(outbound));
      let outbounddata = JSON.parse(localStorage.getItem("UpdateDataLog"));
      this.SS.UpdateOutboundDeliveryStatus(outbounddata.orn , this.status3); 
      
    }
  }

    InboundDeliveryStatusLogic(inbound : any ){
      console.log(inbound);
      console.log(inbound.delivery_status);
      if(inbound.delivery_status == "Delivery In Progress"){
        this.InboundStatus = "Delivery Arrived"
        localStorage.setItem("UpdateDataInbound" , JSON.stringify(inbound));
        let inbounddata = JSON.parse(localStorage.getItem("UpdateDataInbound"));
        this.SS.UpdateInboundDeliveryStatus(inbounddata.irn , this.InboundStatus);
      }
    }


  async doRefresh(event) {
    await this.ngOnInit();
    event.target.complete();
  }

  


  
  
  

  

}
