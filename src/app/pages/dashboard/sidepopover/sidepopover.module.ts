import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SidepopoverPageRoutingModule } from './sidepopover-routing.module';

import { SidepopoverPage } from './sidepopover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SidepopoverPageRoutingModule
  ],
  declarations: [SidepopoverPage]
})
export class SidepopoverPageModule {}
