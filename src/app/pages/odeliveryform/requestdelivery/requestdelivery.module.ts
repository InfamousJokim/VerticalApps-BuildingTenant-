import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestdeliveryPageRoutingModule } from './requestdelivery-routing.module';

import { RequestdeliveryPage } from './requestdelivery.page';
import { SharedModule } from 'src/app/share/share.modules';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestdeliveryPageRoutingModule,
    SharedModule
  ],
  declarations: [RequestdeliveryPage]
})
export class RequestdeliveryPageModule {}
