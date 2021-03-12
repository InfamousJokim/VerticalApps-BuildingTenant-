import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OdeliveryformPage } from './odeliveryform.page';

const routes: Routes = [
  {
    path: '',
    component: OdeliveryformPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OdeliveryformPageRoutingModule {}
