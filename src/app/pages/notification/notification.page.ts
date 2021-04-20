import { Component, OnInit, Renderer2 } from '@angular/core';
import { ELocalNotificationTriggerUnit, LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { AlertController, Platform, PopoverController } from '@ionic/angular';
import { AppSettings } from '../../app.settings';
import { Inbound_Delivery, Outbound_Delivery , Notifications, Outbound} from 'src/app/interface'; 
import { NotificationService } from './notification.service';
import { DeliveryrecordService } from '../deliveryrecord/deliveryrecord.service';
import { SettingPage } from '../setting/setting.page';
import { PinComponent } from './pin/pin.component';
import { InboundPinComponent } from './inbound-pin/inbound-pin.component';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
  providers : [LocalNotifications ,NotificationService ,  Platform , AlertController , AppSettings , DeliveryrecordService , SettingPage , NotificationService] 
})
export class NotificationPage implements OnInit{

  //Declare the variables from the interface
  public notification : Notifications; 
  public notifications : any ; 

  //Notification Alert Status
  public status1 : "Delivery Arrived at Building Tenant" ; 
  public status2 : "Delivery Arrived at Depot Admin" ; 
  public status3 : "Handled over to Logistic Partner" ; 

  //Outbound Data 
  public outbound : Outbound_Delivery ; 
  public outbounds : any ; 
  public outboundPin : any ; //Outbound Pin number 

  //Inbound Data 
  public inbound : Inbound_Delivery ; 
  public inbounds : any ; 
  public inboundPin : any ; //Inbound Pin Number 
  


  public notification_status : any ; 
  public blingFlag : any ; 
  public socketSubscribe : any ; 
  public notificationData : any ;

  public UserOutboundDeliveryObjects : any[] = [] ;
  public UserOutboundDeliveryStatus : any[] = [] ;

  public UserInboundDeliveryObjects : any[] = [] ;
  public UserInboundDeliveryStatus : any[] = [] ;

  //Both the inbound and outbound array 
  public CombinedDeliveryRequest : any ;

  constructor(private SettingComponent : SettingPage ,private render : Renderer2 , private localNotifications : LocalNotifications , private plt : Platform , private alertCtrl : AlertController , private NS : NotificationService , private appSettings : AppSettings , private ds : DeliveryrecordService  , public popoverController : PopoverController){
    
    //Subscribing Data from MQTT 
    
    /*this.socketSubscribe = this.appSettings.SocketData$.subscribe(data => {
      if (data != undefined && data != " ") {
          this.blingFlag = false;
          this.notificationData = JSON.parse(data);
          console.log(data);
          console.log("hello");
          
          
      }
    });*/



    //Alert Users on the device as well as on application
    this.plt.ready().then(() => {
      this.localNotifications.on('click').subscribe(res => {
        console.log('click : ' , res);
        let msg = res.data ? res.data.mydata : ''; 
        this.showAlert(res.title , res.text , msg);
      });
      this.localNotifications.on('trigger').subscribe(res => {
        console.log('trigger : ' , res);
        let msg = res.data ? res.data.mydata : ''; 
        this.showAlert(res.title , res.text , msg);
      });
    });
  }

  ngOnInit(){

    //Call API to get objects in Outbound Delivery Table
    this.ds.getOutboundStatus().then((res: any) =>{
      this.outbounds = res['result']['list'];
      console.log(this.outbounds);
      this.GetOutboundUserObjects();
      this.GetOutboundNeededStatus();
    })  

    //Calling API to get objects in Inbound Delivery Table
    this.ds.getInboundStatus().then((res : any) => {
      this.inbounds = res['result']['list'];
      console.log(this.inbounds);
      this.GetInboundUserObjects();
      this.GetInboundNeededStatus();
      
    })


    


  }

  //refresh content dynamically 
  async ionViewWillEnter(){
    await this.ngOnInit();
  }

  //Selecting Outbound Data for Pin 
  GetOutboundData(outbound : Outbound_Delivery ){
      console.log(outbound);
      localStorage.setItem("SelectedORN" , JSON.stringify(outbound));
      this.presentOutboundPopover(outbound);
   
  }

  //Selecting Inbound Data for Pin 
  GetInboundData(inbound: Inbound_Delivery){
    console.log(inbound);
    localStorage.setItem("SelectedIRN" , JSON.stringify(inbound));
    this.presentInboundPopover(inbound)
  }

  //generating a Outbound Popover to get the pin number

  currentPopover = null ; 
  async presentOutboundPopover(outbound: any ) {


    const Outboundpopover = await this.popoverController.create({
      component: PinComponent,
      cssClass: 'my-custom-class',
      event: outbound,
      translucent: true,
      
      
    });

    this.currentPopover = Outboundpopover ; 
    return await Outboundpopover.present();
    
  }

  
  //Generating a Inbound Popover to get Pin number 
  async presentInboundPopover(inbound : any){
    
    const Inboundpopover = await this.popoverController.create({
      component : InboundPinComponent , 
      cssClass : 'my-custom-class' , 
      event : inbound , 
      translucent : true , 
      
      
    }); 

    return await Inboundpopover.present();

  }
  
    


  //Get Inbound Notification items from current user only 
  async GetInboundUserObjects(){
    this.UserInboundDeliveryObjects = [];
    for(let i = 0 ; i < this.inbounds.length ; i ++){
      if(this.inbounds[i].tenant_name === JSON.parse(localStorage.getItem("Display_Name"))){
        this.UserInboundDeliveryObjects.push(this.inbounds[i]);
      }
    }
    console.log(this.inbounds);
  }

  //Get Inbound Notification items only when the status = "Delivery Arrived"
  GetInboundNeededStatus(){
    this.UserInboundDeliveryStatus = [];
    for(let i = 0 ; i < this.UserInboundDeliveryObjects.length ; i ++){
      if(this.UserInboundDeliveryObjects[i].delivery_status === "Delivery Arrived" ){
        this.UserInboundDeliveryStatus.push(this.UserInboundDeliveryObjects[i]);

        
      }
    }
    console.log(this.UserInboundDeliveryStatus);
  }


  //Get Outbound Notification items from current user only 
  async GetOutboundUserObjects(){
    this.UserOutboundDeliveryObjects = [];
    for(let i = 0 ; i < this.outbounds.length ; i ++){
      if(this.outbounds[i].tenant_name === JSON.parse(localStorage.getItem("Display_Name"))){
        this.UserOutboundDeliveryObjects.push(this.outbounds[i]);
        
      }
    }
    console.log(this.inbounds);
  }

  //Get 4 Status to be displayed to user 
  // "Cart Arrived at Building Tenant" || "Cart Arrived at Depot Admin" 
  // * Might need to split the content up by inbound and outbound 
  GetOutboundNeededStatus(){
    this.UserOutboundDeliveryStatus = [];
    for(let i = 0 ; i < this.UserOutboundDeliveryObjects.length ; i ++){
      if(this.UserOutboundDeliveryObjects[i].delivery_status === "Cart Arrived at Building Tenant" 
      || this.UserOutboundDeliveryObjects[i].delivery_status === "Cart Arrived at Depot Admin"){
        this.UserOutboundDeliveryStatus.push(this.UserOutboundDeliveryObjects[i]);

        
      }
    }
    console.log(this.UserOutboundDeliveryStatus);
  }

  

  //Alert : When there is a notification received from the frontend
  showAlert(header , sub , msg){
    console.log("show");
    this.alertCtrl.create({
      header : header , 
      subHeader : sub , 
      message : msg , 
      buttons : ['Ok']
    }).then(alert => alert.present());
  }

  //Refreshing the current page
  async doRefresh(event) {
    await this.ngOnInit();
    event.target.complete();
  }
}
