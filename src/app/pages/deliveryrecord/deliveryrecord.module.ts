import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliveryrecordPageRoutingModule } from './deliveryrecord-routing.module';

import { DeliveryrecordPage } from './deliveryrecord.page';

import { SharedModule } from 'src/app/share/share.modules';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliveryrecordPageRoutingModule,
    SharedModule,
    NgxDatatableModule
  ],
  declarations: [DeliveryrecordPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DeliveryrecordPageModule {}
