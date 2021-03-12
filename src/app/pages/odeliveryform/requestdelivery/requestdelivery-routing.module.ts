import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestdeliveryPage } from './requestdelivery.page';

const routes: Routes = [
  {
    path: '',
    component: RequestdeliveryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestdeliveryPageRoutingModule {}
