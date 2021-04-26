import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sidepopover',
  templateUrl: './sidepopover.page.html',
  styleUrls: ['./sidepopover.page.scss'],
})
export class SidepopoverPage implements OnInit {

  constructor( public cookieservice : CookieService , public router : Router , public popover : PopoverController) { }

  ngOnInit() {
  }


  Logout(){
    this.cookieservice.delete( 'session' , '/' );
    this.router.navigateByUrl('/login');
    this.popover.dismiss();
  }

  

}
