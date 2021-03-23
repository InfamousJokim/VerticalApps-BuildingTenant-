import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { SharedModule } from 'src/app/share/share.modules';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    SharedModule,
    HttpClientModule,
    NgxDatatableModule,
  ],
  declarations: [DashboardPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardPageModule {}
