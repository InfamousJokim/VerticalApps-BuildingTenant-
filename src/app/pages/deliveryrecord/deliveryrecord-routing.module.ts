import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliveryrecordPage } from './deliveryrecord.page';

const routes: Routes = [
  {
    path: '',
    component: DeliveryrecordPage
  },
  {
    path: 'more-info',
    loadChildren: () => import('./more-info/more-info.module').then( m => m.MoreInfoPageModule)
  },

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryrecordPageRoutingModule {}
