import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpResponse , HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Inbound_Delivery, Outbound_Delivery} from '../../interface'
import { CookieService } from 'ngx-cookie-service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private http : HttpClient , private cookieService : CookieService) { }
 
  reqHeader = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + (this.cookieService.get('session'))
  });

  //Updating the Outbound Delivery Status with the buttons
  UpdateOutboundDeliveryStatus(orn : string , status : string){
    const body =  {
      "status" : status
    }
    return this.http.put<Outbound_Delivery>("http://52.74.132.238/api/update_status/outbound_delivery/" + orn ,body, { headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (this.cookieService.get('session'))
    })
   }).toPromise();
  }

  //Getting the list of objects in the Outbound Delivery 

  GetOutboundDelivery(){
    return this.http.get<Outbound_Delivery>("http://52.74.132.238/api/outbound_deliveries", { headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (this.cookieService.get('session'))
    })
   }).toPromise();
  }

  //Update the Inbound Delivery Status with the buttons 
  UpdateInboundDeliveryStatus(irn : string , status : string){
    const body = {
      "status" : status
    }
    return this.http.put<Inbound_Delivery>("http://52.74.132.238/api/update_status/inbound_delivery/" + irn , body , { headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (this.cookieService.get('session'))
    })
  }).toPromise();
  }

  //Getting the list of objects in Inbound Delivery 
  GetInboundDelivery(){
    return this.http.get<Inbound_Delivery>("http://52.74.132.238/api/inbound_deliveries", { headers : new HttpHeaders({
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
