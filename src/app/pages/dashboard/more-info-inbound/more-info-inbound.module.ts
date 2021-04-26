import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoreInfoInboundPageRoutingModule } from './more-info-inbound-routing.module';

import { MoreInfoInboundPage } from './more-info-inbound.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoreInfoInboundPageRoutingModule
  ],
  declarations: [MoreInfoInboundPage]
})
export class MoreInfoInboundPageModule {}
