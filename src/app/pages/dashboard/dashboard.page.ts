import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { DashboardService } from './dashboard.service';
import * as delay from 'delay';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ParamList , Outbound_Delivery , Inbound_Delivery, Jobs } from '../../interface';
import { AppSettings } from '../../app.settings';
import { DatePipe } from '@angular/common';
import { AlertController, PopoverController } from '@ionic/angular';
import { MoreInfoPage } from '../deliveryrecord/more-info/more-info.page';
import { MoreInfoInboundPage } from './more-info-inbound/more-info-inbound.page';
import { SidepopoverPage } from './sidepopover/sidepopover.page';
import { AppService } from 'src/app/app.service';


export interface Data {
  deliveries: string;

 

}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  providers : [AppSettings , AlertController , DashboardService , DatePipe] , 
  encapsulation: ViewEncapsulation.None,

})



export class DashboardPage  implements OnInit {



  public inbounds : Inbound_Delivery; 
  public outbounds : Outbound_Delivery;
  public outbound : any;
  public inbound : any ; 

  public inboundsjobs : Inbound_Delivery; 
  public outboundsjobs : Outbound_Delivery; 
  public inboundjobs : any ; 
  public outboundjobs : any ; 

  //Jobs Variable 
  public job : any ; 
  public jobs : any[] = [] ; 
  public OutboundJobs : any[] = [] ; 
  public InboundJobs : any[] = [] ; 


  
  public OutboundUserDeliveryRecords : any[] = [] ; 
  public InboundUserDeliveryRecords : any[] = [] ; 

  usersRows : any;
  paramlist= new ParamList();


  constructor( private http: HttpClient ,  private datepipe: DatePipe , private ds : DashboardService , private cookieservice:CookieService  , private router : Router , private appSettings : AppSettings , public popoverController : PopoverController , public AS : AppService ) {}


  async ngOnInit(){

    //Get list of Users in Database
    await this.user_list();
    
    //Get Inbound Deliveries from Outbound_Delivery Table 
    await this.ds.getInboundStatus().then((res: any) =>{
      this.inbound = res['result']['list'];
      this.GetInboundUserDelivery();
     })

    //Get Outbound Deliveries from Outbound_Delivery Table 
    await this.ds.getOutboundStatus().then((res: any) =>{
      this.outbound = res['result']['list'];
      this.GetOutboundUserDelivery();
    })  
    
    //Function to Get Jobs Objects to the frontend
    await this.AS.getJobStatus().then((res: any) =>{
      this.jobs = res['result']['list'];
      console.log(this.jobs);
      
    })  

    //Get Total number inbound and outbound deliveries
    await this.get_deliveries();

    //Display the respective Delivery_id
    await this.getDeliveryId();
    
  }



  public num_inbound_deliveries: number;
  public num_outbound_deliveries: number;


    
    //Total number of inbound deliveries made 
     async get_deliveries(){
      await delay(200);
      if(this.InboundUserDeliveryRecords !== null){
       this.num_inbound_deliveries = Object.keys(this.InboundUserDeliveryRecords).length;
      }

    //Total number of outbound deliveries made 
      await delay(200);
      if(this.OutboundUserDeliveryRecords !== null){
       this.num_outbound_deliveries = Object.keys(this.OutboundUserDeliveryRecords).length;
      }
     }

     //Store Outbound Delivery Object in LocalStorage as  "outbound_delivery"
     getOutboundData(outbounds : Outbound_Delivery ){
      console.log(outbounds);
      localStorage.setItem("outbound_delivery", JSON.stringify(outbounds));
      this.presentOutboundPopover(outbounds);
    }

    //Store Jobs object in the LocalStorage as "jobs"
      getJobsData(jobs : Jobs){
        localStorage.removeItem("jobs");
        localStorage.setItem("jobs" , JSON.stringify(jobs));
        console.log(this.jobs);
      }

      //Store Inbound Delivery Object in Localstorage as  "inbound_delivery"
      getInboundData(inbounds : Inbound_Delivery){
        console.log(inbounds);
        localStorage.setItem("inbound_delivery" , JSON.stringify(inbounds));
        this.presentInboundPopover(inbounds)
    }


    //Filtering Job_status from Inbound & Outbound Deliveries in the Jobs Table
    getDeliveryId(){
      this.OutboundJobs = []; 
      this.InboundJobs = [];
      
      //This is to get the Outbound Job Status which will be shown in the frontend
      for(let i = 0 ; i < this.jobs.length ; i++ ){
        if(this.jobs[i].delivery_id.startsWith('ORN')){
          this.OutboundJobs.push(this.jobs[i]);
          console.log(this.OutboundJobs)
        }
      }
      
      //This is to get the Inbound Job Status which will be shown in the frontend
      for(let i = 0 ; i < this.jobs.length ; i++ ){
        if(this.jobs[i].delivery_id.startsWith('IRN')){
          this.InboundJobs.push(this.jobs[i]);
          console.log(this.InboundJobs)
        }
      }

    }
    //Outbound popover for outbound Delivery Request made 
    async presentOutboundPopover(outbounds: any){


      const popover = await this.popoverController.create({
        component: MoreInfoPage,
        cssClass: 'my-custom-class',
        event: outbounds,
        translucent: true,
      });
  
      console.log(outbounds);
      return popover.present();
      
      
    }

    //Inbound popover for outbound Delivery Request made 
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

    //SideMenu Popover for menu for application ** This can be changed to side menu instead of a popover 
    async SidePopover(ev: any) {
      const popover = await this.popoverController.create({
        component: SidepopoverPage,
        cssClass: 'my-custom-class',
        event: ev,
        translucent: true
      });
      await popover.present();
  
      const { role } = await popover.onDidDismiss();
      console.log('onDidDismiss resolved with role', role);
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

    //Retrieve the User's name 
    async user_list(){
      await this.ds.get_users(this.paramlist).then(res =>{
        this.usersRows = res['result']['list'];
        console.log(this.usersRows);
      })
      let email = JSON.parse(localStorage.getItem("User_Email"));
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

