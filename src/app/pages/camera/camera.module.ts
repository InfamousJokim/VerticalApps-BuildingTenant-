import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, ToastController } from '@ionic/angular';

import { CameraPageRoutingModule } from './camera-routing.module';

import { CameraPage } from './camera.page';
import { RouterModule } from '@angular/router';
import { DeliveryrecordPage } from '../deliveryrecord/deliveryrecord.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CameraPageRoutingModule,


    
  ],
  declarations: [CameraPage]
})
export class CameraPageModule {}
