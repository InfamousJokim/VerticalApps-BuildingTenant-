import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ToastController, LoadingController, Platform } from '@ionic/angular';
import jsQR from 'jsqr';
import {EncrDecrService} from '../qrcode/qrcode.service'

import { CookieService } from 'ngx-cookie-service'


@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
  providers: [EncrDecrService]
})
export class QrcodePage implements OnInit {

  @ViewChild('video', { static: false }) video: ElementRef;
  @ViewChild('canvas', { static: false }) canvas: ElementRef;
  @ViewChild('fileinput', { static: false }) fileinput: ElementRef;
 
  canvasElement: any;
  videoElement: any;
  canvasContext: any;
  scanActive = true;
  scanResult = null;
  loading: HTMLIonLoadingElement = null;
  inboundData : any = {};
 
  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private plt: Platform,
    private EncrDecr: EncrDecrService,
    private cookieService : CookieService
  ) {
    const isInStandaloneMode = () =>
      'standalone' in window.navigator && window.navigator['standalone'];
    if (this.plt.is('ios') && isInStandaloneMode()) {
      console.log('I am a an iOS PWA!');
      // E.g. hide the scan functionality!
    }
  }
 
  ngAfterViewInit() {
    this.canvasElement = this.canvas.nativeElement;
    this.canvasContext = this.canvasElement.getContext('2d');
    this.videoElement = this.video.nativeElement;
  }
  async compareIRN(name, irn){
    console.log("IRN")
    let email = JSON.parse(localStorage.getItem("Display_Name"));
     
     if(email===name){
       
      await this.EncrDecr.UpdateInboundDelivery(irn);
      console.log(this.cookieService.get('session'))
      
       return true;
     }
     else{
       return false;
     }

  }
  async compareORN(name, orn){
    console.log("ORN")
    console.log(orn)
    console.log(name)
    let email = JSON.parse(localStorage.getItem("Display_Name"));
     
     if(email===name){
      await this.EncrDecr.UpdateOutboundDelivery(orn);
      console.log(this.cookieService.get('session'))
      
       return true;
     }
     else{
       return false;
     }

  }
  // Helper functions
  async showQrToast() {
    var splitted = this.scanResult.split(",", 2);
    if(splitted[0].startsWith("IRN")){
      var correct = await this.compareIRN(splitted[1], splitted[0])
    }
    else if(splitted[0].startsWith("ORN")){
      var correct = await this.compareORN(splitted[1], splitted[0])
    }
    console.log(correct)
    if(correct===true){
      
      const toast = await this.toastCtrl.create({
      message: `Open ${splitted[1]}?`,
      position: 'middle',
      duration: 20,
      buttons: [
        {
          text: 'Open',
          handler: () => {
            window.open(splitted[1], '_system', 'location=yes');
          }
        }
      ]
    });
    toast.present();
    }
    
    
  }
 
  async startScan() {
    // Not working on iOS standalone mode!
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    });
   
    this.videoElement.srcObject = stream;
    // Required for Safari
    this.videoElement.setAttribute('playsinline', true);
   
    this.loading = await this.loadingCtrl.create({});
    await this.loading.present();
   
    this.videoElement.play();
    requestAnimationFrame(this.scan.bind(this));
  }
   
  async scan() {
    if (this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA) {
      if (this.loading) {
        await this.loading.dismiss();
        this.loading = null;
        this.scanActive = true;
      }
   
      this.canvasElement.height = this.videoElement.videoHeight;
      this.canvasElement.width = this.videoElement.videoWidth;
   
      this.canvasContext.drawImage(
        this.videoElement,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      const imageData = this.canvasContext.getImageData(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert'
      });
   
      if (code) {
        this.scanActive = false;
        this.scanResult = this.EncrDecr.get('123456$#@$^@1ERF', code.data);
        
        this.showQrToast();
      } else {
        if (this.scanActive) {
          requestAnimationFrame(this.scan.bind(this));
        }
      }
    } else {
      requestAnimationFrame(this.scan.bind(this));
    }
  }

  ngOnInit(){
    this.scanActive = true;
    this.startScan()
  }

  reset() {
    this.scanResult = null;
    this.startScan();
  }

  stopScan() {
    this.scanResult = null;
    this.scanActive = false;
    this.videoElement.srcObject.getTracks()[0].stop();
  }
}
