import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidepopoverPage } from './sidepopover.page';

const routes: Routes = [
  {
    path: '',
    component: SidepopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SidepopoverPageRoutingModule {}
