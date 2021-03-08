import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { DashboardService } from './dashboard.service';
import * as delay from 'delay';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ParamList , Outbound_Delivery , Inbound_Delivery } from '../../interface';
import { AppSettings } from '../../app.settings';
import { Subscription } from 'rxjs';
import { IMqttMessage, MqttService } from 'ngx-mqtt';

export interface Data {
  deliveries: string;

 

}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  providers : [AppSettings] , 
  encapsulation: ViewEncapsulation.None
})
export class DashboardPage  implements OnInit {


  //Getting inbound and outbound status
  public inbounddata : Object;
  public outbounddata : Object;

  public inbounds : Inbound_Delivery; 
  public outbounds : Outbound_Delivery;

  inboundColumns:any = {};
  outboundColumns: any = {};
  public inboundrows : any; 
  public outboundrows : any;  
  
  public UserOutboundDeliveryRecords : any[] = [] ; 
  public UserInboundDeliveryRecords : any[] = [] ; 

  usersRows : any;
  paramlist= new ParamList();


  constructor( private http: HttpClient , private ds : DashboardService , private cookieservice:CookieService  , private router : Router , private appSettings : AppSettings ) {
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
      this.inboundrows = res['result']['list'];
      console.log(this.inboundrows);
      this.GetInboundUserDelivery();
     })

    
    await this.ds.getOutboundStatus().then((res: any) =>{
      this.outboundrows = res['result']['list'];
      console.log(this.outboundrows);
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

  public polling: any;


  //Counting Inbound/Outbound Deliveries
  public num_inbound_deliveries: number;
  public num_outbound_deliveries: number;


    

     async get_deliveries(){
      await delay(200);
      if(this.UserInboundDeliveryRecords !== null){
        
       this.num_inbound_deliveries = Object.keys(this.UserInboundDeliveryRecords).length;
      }

      await delay(200);
      if(this.UserOutboundDeliveryRecords !== null){
       this.num_outbound_deliveries = Object.keys(this.UserOutboundDeliveryRecords).length;
      }

      

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
      
      this.UserOutboundDeliveryRecords = [];
      
      for(let i = 0 ; i < this.outboundrows.length ; i++){
        if(this.outboundrows[i].tenant_name === JSON.parse(localStorage.getItem("Display_Name"))){
          this.UserOutboundDeliveryRecords.push(this.outboundrows[i]);
          console.log(this.UserOutboundDeliveryRecords);
        }
      }
    }

    GetInboundUserDelivery(){
      this.UserInboundDeliveryRecords = [];
      for(let i = 0 ; i < this.inboundrows.length ; i++){
        if(this.inboundrows[i].tenant_name === JSON.parse(localStorage.getItem("Display_Name"))){
          this.UserInboundDeliveryRecords.push(this.inboundrows[i]);
          console.log(this.UserInboundDeliveryRecords);
        }
      }
    }
    

    

}

