import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { DashboardService } from './dashboard.service';
import * as delay from 'delay';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ParamList , Outbound_Delivery , Inbound_Delivery } from '../../interface';
import { AppSettings } from '../../app.settings';
import { DatePipe } from '@angular/common';
import { AlertController, PopoverController } from '@ionic/angular';
import { MoreInfoPage } from '../deliveryrecord/more-info/more-info.page';
import { MoreInfoInboundPage } from './more-info-inbound/more-info-inbound.page';

export interface Data {
  deliveries: string;

 

}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  providers : [AppSettings , AlertController , DashboardService , DatePipe] , 
  encapsulation: ViewEncapsulation.None
})
export class DashboardPage  implements OnInit {



  public inbounds : Inbound_Delivery; 
  public outbounds : Outbound_Delivery;
  public outbound : any;
  public inbound : any ; 

  inboundColumns:any = {};
  outboundColumns: any = {};
  public inboundrows : any; 
  public outboundrows : any;  
  
  public OutboundUserDeliveryRecords : any[] = [] ; 
  public InboundUserDeliveryRecords : any[] = [] ; 

  usersRows : any;
  paramlist= new ParamList();


  constructor( private http: HttpClient ,  private datepipe: DatePipe , private ds : DashboardService , private cookieservice:CookieService  , private router : Router , private appSettings : AppSettings , public popoverController : PopoverController ) {
    this.paramlist.PageNo = 1;
    this.paramlist.PageSize = 10;
    this.paramlist.SearchColumn = "userName";
    this.paramlist.SearchText = "";
    this.paramlist.SortColumn = "";
    this.paramlist.SortOrder = 1;
  }


//Getting IRN/ORN & status

  async ngOnInit(){


    await this.user_list();
    
    await this.ds.getInboundStatus().then((res: any) =>{
      this.inbound = res['result']['list'];
      console.log(this.inbound);
      this.GetInboundUserDelivery();
     })

    
    await this.ds.getOutboundStatus().then((res: any) =>{
      this.outbound = res['result']['list'];
      console.log(this.outbound);
      this.GetOutboundUserDelivery();
    })  


    this.inboundColumns = [ 
      {prop : 'irn' , name: "IRN" },
      {prop : 'delivery_status' , name: "Delivery Status"}
    ]

    


    this.outboundColumns = [ 
      {prop : 'orn' , name: "ORN" },
      {prop : 'delivery_status' , name: "Delivery Status"}
    ]

    await this.get_deliveries();
    

  }



  //Getting total number of Inbound/Outbound Deliveries
  public num_inbound_deliveries: number;
  public num_outbound_deliveries: number;


    

     async get_deliveries(){
      await delay(200);
      if(this.InboundUserDeliveryRecords !== null){
       this.num_inbound_deliveries = Object.keys(this.InboundUserDeliveryRecords).length;
      }

      await delay(200);
      if(this.OutboundUserDeliveryRecords !== null){
       this.num_outbound_deliveries = Object.keys(this.OutboundUserDeliveryRecords).length;
      }
     }


     getData(outbounds : Outbound_Delivery){
       console.log(outbounds);
      localStorage.setItem("outbound_delivery", JSON.stringify(outbounds));
      this.presentPopover(outbounds);
    }

      getInboundData(inbounds : Inbound_Delivery){
        console.log(inbounds);
        localStorage.setItem("inbound_delivery" , JSON.stringify(inbounds));
        this.presentInboundPopover(inbounds)
    }

    async presentPopover(outbounds: any){


      const popover = await this.popoverController.create({
        component: MoreInfoPage,
        cssClass: 'my-custom-class',
        event: outbounds,
        translucent: true,
      });
  
      console.log(outbounds);
      return popover.present();
      
      
    }

    async presentInboundPopover(inbounds: any){


      const popover = await this.popoverController.create({
        component: MoreInfoInboundPage,
        cssClass: 'my-custom-class',
        event: inbounds,
        translucent: true,
      });
  
      console.log(inbounds);
      return popover.present();
      
      
    }

    //Logout
    Logout(){
      this.cookieservice.delete( 'session' , '/' );
      this.router.navigateByUrl('/login');
    }

    //refreshing of application 
    async doRefresh(event) {
      await this.get_deliveries();
      await this.ngOnInit();
      event.target.complete();
    }

    //refresh content dynamically 
    async ionViewWillEnter(){
      await this.get_deliveries();
    }

    //Retrieve the Tenant_Name
    async user_list(){
      await this.ds.get_users(this.paramlist).then(res =>{
        this.usersRows = res['result']['list'];
        console.log(this.usersRows);
      })
      let email = JSON.parse(localStorage.getItem("User_Email"));
      console.log(email);
      for (let i = 0; i < this.usersRows.length; i++){
        if (this.usersRows[i].email == email){
          localStorage.setItem("Display_Name", JSON.stringify(this.usersRows[i].displayName));
        }
      }
    }

    GetOutboundUserDelivery(){
      this.OutboundUserDeliveryRecords = [];
      for(let i = 0 ; i < this.outbound.length ; i++){
        if(this.outbound[i].tenant_name === JSON.parse(localStorage.getItem("Display_Name"))){
          this.OutboundUserDeliveryRecords.push(this.outbound[i]);
          console.log(this.OutboundUserDeliveryRecords);
        }
      }
    }

    GetInboundUserDelivery(){
      this.InboundUserDeliveryRecords = [];
      for(let i = 0 ; i < this.inbound.length ; i++){
        if(this.inbound[i].tenant_name === JSON.parse(localStorage.getItem("Display_Name"))){
          this.InboundUserDeliveryRecords.push(this.inbound[i]);
          console.log(this.InboundUserDeliveryRecords);
        }
      }
    }
    

    

}

