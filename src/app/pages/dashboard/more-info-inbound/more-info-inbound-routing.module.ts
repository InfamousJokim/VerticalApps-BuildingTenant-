import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoreInfoInboundPage } from './more-info-inbound.page';

const routes: Routes = [
  {
    path: '',
    component: MoreInfoInboundPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoreInfoInboundPageRoutingModule {}
