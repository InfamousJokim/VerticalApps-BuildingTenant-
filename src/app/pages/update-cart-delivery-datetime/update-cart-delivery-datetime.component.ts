import { Component, OnInit } from '@angular/core';
import { UpdateDeliveryDatetimeService } from '../update-cart-delivery-datetime/update-cart-delivery-datetime.service'
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-cart-delivery-datetime',
  templateUrl: './update-cart-delivery-datetime.component.html',
  styleUrls: ['./update-cart-delivery-datetime.component.scss'],
})
export class UpdateCartDeliveryDatetimeComponent implements OnInit {

  constructor(public UpdateDeliveryDatetimeService:UpdateDeliveryDatetimeService, public AlertController: AlertController, private router: Router) { }

  UpdateObject : any;
  current_datetime : string = "";
  orn : string = "";
  jobRows : any;
  unassigned_jobs: any = [];
  new_date: string = "";
  new_time: string = "";
  new_datetime : string = "";
  message : string;

  async ngOnInit() {
    await this.retrieve_update_object();
    this.current_datetime = JSON.parse(this.UpdateObject)['time']
    this.orn = JSON.parse(this.UpdateObject)['orn']
    await this.retrieve_unassign_jobs();
    console.log(this.orn)

  }

  async retrieve_update_object(){
    this.UpdateObject = localStorage.getItem('Update_Delivery_Datetime');
   
  }

  async retrieve_unassign_jobs(){
    await this.UpdateDeliveryDatetimeService.GetSelectedJobs(this.orn).then(res => {
      this.jobRows = res["result"]["list"];
    })
    if (this.jobRows[0].robot_name == ""){
      this.unassigned_jobs.push(this.jobRows[0])
    }

    console.log("TEST"+this.unassigned_jobs)
    
   
  }

  async get_new_datetime(){
    var new_date_splitted = this.new_date.split("T", 2)
    var new_time_splitted = this.new_time.split("T", 2)
    this.new_datetime = new_date_splitted[0]+"T"+new_time_splitted[1]
  }

  async check_robot_availability(){
    await this.get_new_datetime();
    await this.UpdateDeliveryDatetimeService
      .CheckRobotsAvailability(1, this.new_datetime)
      .then(res => {
        this.message = res["result"];
        console.log(this.message)
      });
    if (this.message == "available"){
      this.presentSuccess();
    }else{
      this.presentAlert();
    }
  }

  async assign_to_unassigned_jobs(){
    await this.UpdateDeliveryDatetimeService.AssignRobotToUnassignJobs(this.orn, this.new_datetime)
    this.router.navigateByUrl('/tabs/dashboard');
  }

  async presentSuccess() {
    const alert = await this.AlertController.create({
      cssClass: 'my-custom-class',
      header: 'Robot(s) are available',
      message: ' Please proceed and update the new delivery datetime.',
      buttons: [
        {
          text: 'Update',
          handler: () => {
            this.assign_to_unassigned_jobs();

          }
        }
      ],
      backdropDismiss: false
      
    });

    await alert.present();
  }

  async presentAlert() {
    const alert = await this.AlertController.create({
      cssClass: 'my-custom-class',
      header: 'Not all robots are available',
      message: ' Please choose another delivery datetime.',
      buttons: [
        {
          text: 'Back',
          handler: () => {
            alert.dismiss();
          }
        }
      ],
      backdropDismiss: false
      
    });

    await alert.present();
  }

}
