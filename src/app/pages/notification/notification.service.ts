import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { Notifications} from '../../interface'
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient , private cookieService : CookieService) { }

  reqHeader = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + (this.cookieService.get('session'))
  });

  //Get notification data 
 /*async GetNotificationData() {
    return await this.http.get("http://52.74.132.238/api/outbound_deliveries/getnotification", { headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (this.cookieService.get('session'))
    }) 
  }).toPromise();
     
  }*/


  //GET objects from Notification Table
  async GetStatusNotificationData(){
    return await this.http.get("http://52.74.132.238/api/outbound_deliveries/getnotification/", { headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (this.cookieService.get('session'))
    }) 
  }).toPromise();
  }




  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }


  
}
