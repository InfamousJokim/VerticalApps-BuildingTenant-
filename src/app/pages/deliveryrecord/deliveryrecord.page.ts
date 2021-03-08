import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Inbound_Delivery, Outbound_Delivery } from 'src/app/interface';
import { DeliveryrecordService } from './deliveryrecord.service';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { MoreInfoPage } from './more-info/more-info.page';



@Component({
  selector: 'app-deliveryrecord',
  templateUrl: './deliveryrecord.page.html',
  styleUrls: ['./deliveryrecord.page.scss'],
  providers: [DeliveryrecordService , AlertController ],
  
  

})



export class DeliveryrecordPage  {


  
  public inbounds : Inbound_Delivery; 
  public outbound : Outbound_Delivery;
  public outbounds : any;
  public inbound : any ; 

  //This is to be used when there is ngx-datatable 
  public outbounddata:any = [] 
  public inbounddata:any = [] 
  public outboundrows : any ; 
  public inboundrows: any;
  inboundColumns:any = {};
  outboundColumns: any = {};
  
  public count : any ; 
  

  public doublecolumn : "Double Column" ; 
  public fullcolumn : "Full Column" ; 

  public outboundInfo : any ={};
  public orn : any ; 

  public OutboundUserDeliveryRecords : any[] = [] ; 
  public InboundUserDeliveryRecords : any[] = [] ; 

  constructor(private http: HttpClient , public ds : DeliveryrecordService , private alertCtrl : AlertController , public popoverController : PopoverController ) { }
 

  //rows needed
  ngOnInit(){
    
    this.ds.getInboundStatus().then((res: any) =>{
      this.inbound = res['result']['list'];
      console.log(this.inbound);
      this.GetInboundUserDelivery();
     })

    
    this.ds.getOutboundStatus().then((res: any) =>{
      this.outbounds = res['result']['list'];
      console.log(this.outbounds);
      this.GetOutboundUserDelivery();

    })  

  
  }


  /*Update Database for objects that are being "cancelled" 
   GetOrn(orn : Outbound_Delivery){
     console.log(orn);
     this.ds.UpdateOutbound(orn).subscribe(outbound => this.outbounds.push(outbound));
     this.ds.getOutboundStatus().then((res: any) =>{
       this.outbounds = res['result']['list'];
       console.log(this.outbounds);

     })  
   }*/


  async doRefresh(event) {
    await this.ngOnInit();
    event.target.complete();
  }

  //refresh content dynamically 
  async ionViewWillEnter(){
    await this.ngOnInit();
  }

  //popover after clicking on particular delivery record 

  getData(outbound : Outbound_Delivery){
    localStorage.setItem("outbound_delivery", JSON.stringify(outbound));
    this.presentPopover(outbound);
  }

  //Presenting the popover for the outbound delivery records
  async presentPopover(outbound: any) {


    const popover = await this.popoverController.create({
      component: MoreInfoPage,
      cssClass: 'my-custom-class',
      event: outbound,
      translucent: true,
    });

    console.log(outbound);
    return await popover.present();
    
    
  }

  //Getting the objects from "Outbound Delivery" table to be displayed 
  GetOutboundUserDelivery(){
    console.log(JSON.parse(localStorage.getItem("Display_Name")));

    this.OutboundUserDeliveryRecords = [];
    for(let  i = 0 ; i < this.outbounds.length ; i++){
      if(this.outbounds[i].tenant_name === JSON.parse(localStorage.getItem("Display_Name"))){
        this.OutboundUserDeliveryRecords.push(this.outbounds[i]);
        
        
      }
    }

  }

  //Getting the objects from the "Inbound Delivery" table to be displayed 
  GetInboundUserDelivery(){
    this.InboundUserDeliveryRecords = [];
    console.log(this.inbound);
    

    for(let i = 0 ; i < this.inbound.length ; i ++){
      if(this.inbound[i].tenant_name === JSON.parse(localStorage.getItem("Display_Name"))){
        this.InboundUserDeliveryRecords.push(this.inbound[i]);
        
      }
    }
  }

  
  
  
}
