import { Component, OnInit } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';
import { DeliveryrecordService } from '../../deliveryrecord/deliveryrecord.service';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-more-info-inbound',
  templateUrl: './more-info-inbound.page.html',
  styleUrls: ['./more-info-inbound.page.scss'],
})
export class MoreInfoInboundPage implements OnInit {

  inboundData : any = {};

  constructor(public ds : DashboardService , public alertCtrl : AlertController , public popover : PopoverController) { }

  ngOnInit() {
    this.inboundData = JSON.parse(localStorage.getItem("inbound_delivery"));
  }

}
