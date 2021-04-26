import { DatePipe } from '@angular/common';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { OdeliveryformService } from '../odeliveryform.service';
import { Outbound, Notifications } from '../../../interface';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Notification } from 'rxjs';
import { LoadingController, AlertController} from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.page.html',
  styleUrls: ['./confirmation.page.scss'],
  providers : [DatePipe]
  
})
export class ConfirmationPage implements OnInit{

  
  pack = {
    parcel: '',
    Date : '', 
    Time : '', 
    log_partner : '', 
    Add : '',
   
  };

  

  cartType : '';

  constructor(public OD : OdeliveryformService , private toastctrl : ToastController, private router:Router , private datepipe: DatePipe, public loadingController: LoadingController, public AlertController: AlertController) { 
    
  }

  outbounds: Outbound[];
  outbound = new Outbound();

  //Notification 
  notifications : Notifications[]
  notification = new Notifications();

  layoutMakerID :string[] = ["f4569c0d-8a9a-47aa-8227-e51da19e7cb5", "ec261ca9-dc17-4c03-b74f-5240f02680b0", "f4569c0d-8a9a-47aa-8227-e51da19e7cb5", "b79de834-d32e-44c9-9089-83fc596f5dd2"];

  orn : string;
  current_datetime: string ="";
  datetime: string ="";
  checker : boolean;
  jobRows : any;
  loading_spinner: any;
  alert_message: any;


  ngOnInit(){
    let cartType = JSON.parse(localStorage.getItem("outbound"));
    let name = JSON.parse(localStorage.getItem("Display_Name"));
   
    this.OD.getData().subscribe(msg => { 
      
      
      this.pack = msg;
      console.warn("Pack:"+this.pack)
      
      var new_date_splitted = this.pack.Date.split("T", 2)
      var new_time_splitted = this.pack.Time.split("T", 2)
      this.datetime = new_date_splitted[0]+"T"+new_time_splitted[1]
      
      this.outbound.Parcel = this.pack.parcel;
      this.outbound.Target_Cart_Arrival_Date = this.datetime;
      this.outbound.Target_Cart_Arrival_Time = this.datetime;
      this.outbound.Log_partner = this.pack.log_partner;
      this.outbound.Add = this.pack.Add;
      this.outbound.Cart_type = cartType;
      this.outbound.Tenant_Name = name ; 

      console.log(this.outbound);
      
      
    });

    
    //notification getting the data 
    
  }


  async add_outbound() {
    this.loading_spinner = await this.loading();
    console.log("Outbound:"+this.outbound.Parcel)
    await this.post_data();
    let checker = true;
    await this.OD.GetSelectedJobs(this.orn).then(res => {
      this.jobRows = res["result"]["list"];
      this.current_datetime = this.jobRows[0].job_start_time
      console.log("TEST: "+this.current_datetime)
    })
    for (let i = 0; i < this.jobRows.length; i++) {
      if (this.jobRows[i].robot_name == ""){
        checker = false;
        break;
      }
    }
    if (checker == false){
      await this.loading_spinner.dismiss();
      this.alert_message = this.presentAlert();
      console.log("Cart has not been assigned to robot")
      //do the ui warning message
    }else{
      
      // for (let i = 0; i < this.jobRows.length; i++) {
      //    //call the postjob api and pass in the robot_id, execution time
      // }
    //   for (let i = 0; i < this.jobRows.length; i++) {
    //     call the postjob api and pass in the robot_id, execution time
    //     let job_time = (moment.utc(this.jobRows[i].job_start_time).set('second', 0));
    //     await this.OD.Post_Job(job_time.toISOString(), this.jobRows[i].robot_id, this.layoutMakerID[0]).then(data=>{
    //       console.log(data)
    //     })
    //     let job_time_2 = moment.utc(job_time).local()
    //     for (let a = 1; a < 4; a++){
    //      await this.OD.Post_Job(job_time_2.add(1, 'm').toISOString(), this.jobRows[i].robot_id, this.layoutMakerID[a]).then(data=>{
    //        console.log(data)
    //      })

    //     }
     
    // }
  } this.showToast();
      this.loading_spinner.dismiss();
      this.router.navigateByUrl('/tabs/dashboard');
  }

  

  async post_data(){
    await this.OD
      .addOutbound(this.outbound).then(res => {
        this.orn = res["result"];
      }); 
     
  }


  async add_notification() {
    console.log("Notification : " + this.notification)
  }
  


  //Robot Manager
  
  
  
  //toast notification 
  async showToast() {
    await this.toastctrl.create({
      message : "Delivery Request Made" ,
      duration : 3000 , 
      position : 'middle' , 
      color : "primary",
      cssClass : "toast-style",
      buttons : [{

        handler : () => {
          console.log("Request has been made");

        }
      }]
    }).then(res => res.present());
  }

  async loading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    loading.present();
    return loading;
  }

  async presentAlert() {
    const alert = await this.AlertController.create({
      cssClass: 'my-custom-class',
      header: 'Cart is not assigned to robot',
      message: ' Please assign another delivery datetime for this cart.',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            var update_object ={orn:this.orn, time:this.current_datetime};
            localStorage.setItem("Update_Delivery_Datetime", JSON.stringify(update_object));
            this.router.navigateByUrl("unassign_cart/change_datetime")
          }
        }
      ],
      backdropDismiss: false
      
    });

    await alert.present();
  }
  

}



  


