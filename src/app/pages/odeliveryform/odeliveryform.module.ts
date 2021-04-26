import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OdeliveryformPageRoutingModule } from './odeliveryform-routing.module';

import { OdeliveryformPage } from './odeliveryform.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OdeliveryformPageRoutingModule
  ],
  declarations: [OdeliveryformPage]
})
export class OdeliveryformPageModule {}
