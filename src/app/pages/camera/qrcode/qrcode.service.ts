import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import {Inbound_Delivery} from '../../../interface'
import * as CryptoJS from 'crypto-js';
import { CookieService } from 'ngx-cookie-service'


@Injectable({
  providedIn: 'root'
})

export class EncrDecrService {
  constructor(private http: HttpClient , private cookieService : CookieService) { }
 Vertical_App_Header = new HttpHeaders({ 
    
    'Authorization': 'Bearer ' + (this.cookieService.get('session'))
  });

  //The set method is use for encrypt the value.
  set(keys, value){
    var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse(keys);
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
    {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
  }

  //The get method is use for decrypt the value.
  get(keys, value){
    var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse(keys);
    var decrypted = CryptoJS.AES.decrypt(value, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }
  

  async UpdateInboundDelivery(irn) {
    const body ={status: "Collecting Delivery"}
    return await this.http.put("http://52.74.132.238/api/update_status/inbound_delivery/"+irn,body, { headers: this.Vertical_App_Header }).toPromise();
  }

  async UpdateOutboundDelivery(orn) {
    const body ={status: "Loading Parcel"}
    return await this.http.put("http://52.74.132.238/api/update_status/outbound_delivery/"+orn, body, { headers: this.Vertical_App_Header }).toPromise();
  }
}