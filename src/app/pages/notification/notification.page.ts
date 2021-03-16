import { Component, OnInit, Renderer2 } from '@angular/core';
import { ELocalNotificationTriggerUnit, LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { AlertController, Platform, PopoverController } from '@ionic/angular';
import { AppSettings } from '../../app.settings';
import { Inbound_Delivery, Outbound_Delivery , Notifications, Outbound} from 'src/app/interface'; 
import { NotificationService } from './notification.service';
import { DeliveryrecordService } from '../deliveryrecord/deliveryrecord.service';
import { SettingPage } from '../setting/setting.page';
import { PinComponent } from './pin/pin.component';


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

  public UserDeliveryObjects : any[] = [] ;
  public UserDeliveryStatus : any[] = [] ;

  //Both the inbound and outbound array 
  public CombinedArray : any[] = [];

  constructor(private SettingComponent : SettingPage ,private render : Renderer2 , private localNotifications : LocalNotifications , private plt : Platform , private alertCtrl : AlertController , private NS : NotificationService , private appSettings : AppSettings , private ds : DeliveryrecordService , private ns : NotificationService , public popoverController : PopoverController){
    
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
    
    //Call API to get objects in Notification Table
    /*this.NS.GetStatusNotificationData().then((res : any ) => {
      this.notification = res['result']['list'];
      console.log(this.notification);
    })*/

    //Call API to get objects in Outbound Delivery Table
    this.ds.getOutboundStatus().then((res: any) =>{
      this.outbounds = res['result']['list'];
      console.log(this.outbounds);
      this.GetUserObjects();
      this.GetNeededStatus();
    })  

    //Calling API to get objects in Inbound Delivery Table
    this.ds.getInboundStatus().then((res : any) => {
      this.inbounds = res['result']['list'];
      console.log(this.inbounds);
      this.GetUserObjects();
      this.GetNeededStatus();
      
    })


    


  }

  //refresh content dynamically 
  async ionViewWillEnter(){
    await this.ngOnInit();
  }

  //Function to show the pin on the frontend 
  GetData(outbound : Outbound_Delivery){
    localStorage.setItem("SelectedORN" , JSON.stringify(outbound));
    this.presentPopover(outbound);
  }

  //generating a Popover
  async presentPopover(outbound: any) {


    const popover = await this.popoverController.create({
      component: PinComponent,
      cssClass: 'my-custom-class',
      event: outbound,
      translucent: true,
      
    });

    return await popover.present();
    
    
  }

  

  //Get Notification items that user has created 
  async GetUserObjects(){
    this.UserDeliveryObjects = [];
    for(let i = 0 ; i < this.outbounds.length ; i ++){
      if(this.outbounds[i].tenant_name === JSON.parse(localStorage.getItem("Display_Name"))){
        this.UserDeliveryObjects.push(this.outbounds[i]);
        
      }
    }
  }

  //Get only 3 Status to be displayed to user 
  // "Cart Arrived at Building Tenant" || "Cart Arrived at Depot Admin" || "Handled Over to Logistic Partner" || "Delivery Arrived"(Inbound Flow)
  // * Might need to split the content up by inbound and outbound 
  GetNeededStatus(){
    this.UserDeliveryStatus = [];
    for(let i = 0 ; i < this.UserDeliveryObjects.length ; i ++){
      if(this.UserDeliveryObjects[i].delivery_status === "Cart Arrived at Building Tenant" 
      || this.UserDeliveryObjects[i].delivery_status === "Cart Arrived at Depot Admin"  
      || this.UserDeliveryObjects[i].delivery_status === "Handled Over to Logistic Partner" 
      || this.UserDeliveryObjects[i].delivery_status === "Delivery Arrived"){
        this.UserDeliveryStatus.push(this.UserDeliveryObjects[i]);

        
      }
    }
    console.log(this.UserDeliveryStatus);
  }

  

  //Alert : Shown on application
  showAlert(header , sub , msg){
    console.log("show");
    this.alertCtrl.create({
      header : header , 
      subHeader : sub , 
      message : msg , 
      buttons : ['Ok']
    }).then(alert => alert.present());
  }

  async doRefresh(event) {
    await this.ngOnInit();
    event.target.complete();
  }
}
