import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  },
  {
    path: 'more-info-inbound',
    loadChildren: () => import('./more-info-inbound/more-info-inbound.module').then( m => m.MoreInfoInboundPageModule)
  },
  {
    path: 'sidepopover',
    loadChildren: () => import('./sidepopover/sidepopover.module').then( m => m.SidepopoverPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
