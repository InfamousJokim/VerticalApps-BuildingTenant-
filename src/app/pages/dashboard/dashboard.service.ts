import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Outbound_Delivery ,Users, Inbound_Delivery, ParamList ,} from '../../interface'
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
export class DashboardService {

 


  constructor(private http : HttpClient, private cookieService: CookieService) { }

  reqHeader = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + (this.cookieService.get('session'))
  });


  
  //Getting the list of Inbound Delivery Request made 
  async getInboundStatus() {
    return await this.http.get<Inbound_Delivery>("http://52.74.132.238/api/inbound_deliveries", { headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (this.cookieService.get('session'))
    })
   }).toPromise();
     
  }

  //Getting the list of Outbound Delivery Request made 
  async getOutboundStatus() {
    return await this.http.get<Outbound_Delivery>("http://52.74.132.238/api/outbound_deliveries", { headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (this.cookieService.get('session'))
    }) 
  }).toPromise();
     
  }

  

  //Getting the list of users 
  async get_users(ParamList : ParamList) {
;    return await this.http.post<ParamList>("http://52.74.132.238/api/user/list", ParamList, { headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (this.cookieService.get('session'))
    }) }).toPromise()

  }

   //Cancel Delivery from database
   UpdateOutbound(outbound: Outbound_Delivery){
    return this.http.put<Outbound_Delivery>("http://52.74.132.238/api/cancel/outbound_delivery", outbound, { headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (this.cookieService.get('session'))
    }) 
  }).toPromise();
  }

  //update cart status
  UpdateCart(cart_assigned : string ){
    return this.http.put<string>("http://52.74.132.238/api/carts/"+cart_assigned, "available", { headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (this.cookieService.get('session'))
    }) 
  }).toPromise(); 
     
  }

  //Get notification data 
  async GetNotificationData() {
    return await this.http.get("http://52.74.132.238/api/outbound_deliveries/getnotification", { headers: new HttpHeaders({ 
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
