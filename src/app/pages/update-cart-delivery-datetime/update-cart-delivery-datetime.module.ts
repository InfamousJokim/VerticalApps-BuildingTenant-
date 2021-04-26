import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../share/share.modules';
import { RouterModule } from '@angular/router';
import { UpdateCartDeliveryDatetimeComponent } from './update-cart-delivery-datetime.component';


let routes =  [
  { path: '', component: UpdateCartDeliveryDatetimeComponent},
];

@NgModule({
  declarations: [UpdateCartDeliveryDatetimeComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class UpdateCartDeliveryDatetimeModule { }
