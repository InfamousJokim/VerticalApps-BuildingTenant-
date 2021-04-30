import { Component } from '@angular/core';

import { AlertController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MqttService, IMqttMessage, IMqttServiceOptions, MqttConnectionState } from 'ngx-mqtt';
import { Subscription } from 'rxjs';
import { AppSettings } from '../app/app.settings'
import { ELocalNotificationTriggerUnit, LocalNotifications } from '@ionic-native/local-notifications/ngx';

import { Outbound_Delivery } from './interface';
import { style } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers : [AppSettings]
})
export class AppComponent {


  config: IMqttServiceOptions;
  status: string;
  subscriptionLive: any;
  currentModuleUrl: any;
  subscription: Subscription;
  mqttTopic: any;
  

  

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _mqtt: MqttService,
    private appsettings : AppSettings , 
    private localNotifications : LocalNotifications , 
    private plt : Platform , 
    private alertCtrl : AlertController , 



  ) {
    this.initializeApp();
    this.connectMqtt();


    //Setting the connection state of MQTT to application 
    this._mqtt.state.subscribe((s: MqttConnectionState) => {
      this.status = s === MqttConnectionState.CONNECTED ? 'CONNECTED' : 'DISCONNECTED';
      console.log(this.status);
      if (this.status == 'CONNECTED') {
         if (this.subscriptionLive != undefined) {
           this.subscriptionLive.unsubscribe();
           this.subscriptionLive = undefined;
         }
        this.subscribeTopic();

      }
    }); 

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


  //Setting connection to MQTT Broker 
  connectMqtt() {
     
      this.appsettings.SubsFlag$.subscribe(data => {
        let path: string, protocols: any;
        window.location.href.includes("https") ? path = "/wss" : path = "/ws";
        window.location.href.includes("https") ? protocols = "wss" : protocols = "ws";
        
        console.log(data);
        if (data) {
        const host = '52.74.132.238';
        const port = 9001;

          this.config = { hostname: host,port: port, path: path, protocol: 'ws', username: "", password: "" }
          if (this._mqtt.clientId != '') {
            this.connect(this.config);
            console.log(this._mqtt.clientId);
          }
        }
      }
    ); 
  }


  
  //Connection to MQTT
  connect(config: IMqttServiceOptions ): void {
      this._mqtt.connect(config);

  }



  subscribeTopic() {
    if (this.currentModuleUrl != '') {
      console.log("status", this.status);
      if (this.status === 'CONNECTED') {
        this.SubscribeNotification();
      }
    } 

  }

  //Subscribing to the MQTT topic 
  SubscribeNotification() {

      this.subscriptionLive = this._mqtt.observe("NotificationMQTTTopic").subscribe((message: IMqttMessage) => {
        let status = message.payload.toString();
        this.appsettings.setSocketData(status);
        console.log(status);

        if(status != undefined && status != " " ){
          this.single_notification();
        }
      });

    
  }

  //Scheduling a single notification
  single_notification() {
    console.log("Notification is Activated");
    console.log(localStorage.getItem('mqttMessage'))
    
    if(localStorage.getItem('mqttMessage') == "Cart Arrived at Building Tenant"){
      
      this.localNotifications.schedule({
        id: 1,
        text: 'Delivery Record : '+ JSON.parse(localStorage.getItem('UpdateDataBT')).orn ,
        sound: 'file://sound.mp3',
        data: { mydata : 'Hello! The Delivery Cart has arrived at your doorstep ! Please load the necessary Parcels '} , 
        trigger : { in : 5 , unit : ELocalNotificationTriggerUnit.SECOND}, 
        foreground : true 
        
        
      });
    }

    if(localStorage.getItem('mqttMessage') == "Cart Arrived at Depot Admin"){
      this.localNotifications.schedule({
        id: 1,
        text: 'Delivery Record : '+ JSON.parse(localStorage.getItem('UpdateDataDA')).orn  ,
        sound: 'file://sound.mp3',
        data: { mydata : 'Parcels has arrived at Depot Admin Location '} , 
        trigger : { in : 5 , unit : ELocalNotificationTriggerUnit.SECOND}, 
        foreground : true 
        
        
      });
    }

    //Notification when 
    if(localStorage.getItem('mqttMessage') == "Handled Over to Logistic Partner"){
      this.localNotifications.schedule({
        id: 1,
        text: 'Delivery Record : '+ JSON.parse(localStorage.getItem('UpdateDataLog')).orn  ,
        sound: 'file://sound.mp3',
        data: { mydata : 'Delivery Status : ' + localStorage.getItem('mqttMessage')} , 
        trigger : { in : 5 , unit : ELocalNotificationTriggerUnit.SECOND}, 
        foreground : true 
        
        
      });
    }

    //Notification when "Loaded" Cart has arrived at the Building Tennat (Inbound Flow)
    if(localStorage.getItem('mqttMessage') == "Delivery Arrived"){
      this.localNotifications.schedule({
        id: 1,
        text: 'Delivery Record : '+ JSON.parse(localStorage.getItem('UpdateDataInbound')).irn  ,
        sound: 'file://sound.mp3',
        data: { mydata : 'Hello! Your Parcels have arrived at your doorstep! Please retrieve the Parcels '} , 
        trigger : { in : 5 , unit : ELocalNotificationTriggerUnit.SECOND}, 
        foreground : true 
        
        
        
      });
    }


    
  }

  //Alert in the UIUX when there is a notification being sent
  showAlert(header , sub , msg){
    console.log("show");
    this.alertCtrl.create({
      header : header , 
      subHeader : sub , 
      message : msg , 
      buttons : ['Ok'],
       
      
    }).then(alert => alert.present());
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

}