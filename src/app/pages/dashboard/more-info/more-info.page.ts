import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { Inbound_Delivery, Outbound_Delivery } from 'src/app/interface';
import { DeliveryrecordService } from '../../deliveryrecord/deliveryrecord.service';


@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.page.html',
  styleUrls: ['./more-info.page.scss'],
  providers : [DeliveryrecordService , AlertController]
})
export class MoreInfoPage implements OnInit {

  outboundData : any = {};


  constructor(public ds : DeliveryrecordService , public alertCtrl : AlertController , public popover : PopoverController) { }

  ngOnInit() {
    this.outboundData = JSON.parse(localStorage.getItem("outbound_delivery"));
  }

  //function to cancel the delivery
  CancelDelivery(outbound : Outbound_Delivery){
    console.log(outbound);
    if(this.outboundData.delivery_status === "Outbound Delivery Scheduled"){
      this.presentAlertConfirm(outbound);
      console.log("pass")
    }

    if(this.outboundData.delivery_status === "Cart to Building Tenant" || this.outboundData.delivery_status === "Cart Arrived At Building Tenant" || this.outboundData.delivery_status === "Loading Parcels" || this.outboundData.delivery_status === "Cart To Depot Admin" || this.outboundData.delivery_status === "Cart Arrived at Depot Admin" || 
    this.outboundData.delivery_status === "Parcel Unloading" || this.outboundData.delivery_status === "Handled Over To Logistic Partner"  || this.outboundData.delivery_status === "Parcel awaiting collection from Logistic Partner"){
      this.presentAlert();
    }

    
  }

  //Alert when deleting delivery record 
  async presentAlertConfirm(outbound : Outbound_Delivery) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Are you sure you want to cancel this request ?',
      buttons: [
        {
          text: 'yes',
          handler: () => {
            this.ds.UpdateCart(this.outboundData.cart_assigned);
            console.log(this.outboundData.cart_assigned);
            this.ds.UpdateOutbound(this.outboundData);

            this.ds.getOutboundStatus().then((res: any) =>{
            this.outboundData = res['result']['list'];
            console.log(this.outboundData);
            
            this.close();
      
      
       })  
          }
        }, {
          text: 'No'
        }
      ]
    });

    await alert.present();
  }


  //Alert for cancellation "not allowed"
  async presentAlert() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Unable to cancel. Delivery is in progress.',
      buttons: ['OK']
    });

    await alert.present();
  }

  //To close the popover 
  close(){
    this.popover.dismiss()
  }

  
}
