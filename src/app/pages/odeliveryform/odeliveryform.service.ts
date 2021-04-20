import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject,  throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { catchError} from 'rxjs/operators';
import { Outbound, Notifications, Carts } from '../../interface'
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
export class OdeliveryformService {

  constructor(private http: HttpClient , private cookieService: CookieService){}


  private subject = new ReplaySubject<any>();
  private subjectt = new Subject<any>();

  

  reqHeader = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + (this.cookieService.get('session'))
  });

  SendData(formData : any){

    console.log(formData);
    this.subject.next(formData);
  }

  //Sending Cart type to Confirmation Page 
  SendCartType(cartType : any){
    console.log(cartType);
    this.subject.next(cartType);
  }

  //Getting the carttype for requestdelivery
  getCartType():Observable<any>{
    return this.subject.asObservable();
  }

  getNotification():Observable<any>{
    return this.subject.asObservable();
  }

  getData():Observable<any> {
    return this.subject.asObservable();
    
  }

  getDatatype():Observable<any> {
    return this.subjectt.asObservable();
  }


  //POST : Create Outbound Delivery Request 
  async addOutbound(outbound: Outbound){
    return await this.http.post<Outbound>("http://52.74.132.238/api/outbound_deliveries", outbound, { headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (this.cookieService.get('session'))
    })
   }).toPromise();
  }

  
  addNotification(notification: Notifications): Observable<Notifications> {
    return this.http.post<Notifications>("http://52.74.132.238/api/outbound_deliveries/notification", notification, { headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (this.cookieService.get('session'))
    })
   })
      .pipe(
        catchError(this.handleError)
      );
  }

  //GET : API to get carts that are available
  async getAvailableCarts(){
    return await this.http.get("http://52.74.132.238/api/available_carts", { headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (this.cookieService.get('session'))
    }) }).toPromise();
  }
  
  
  async GetSelectedJobs(orn : string) {
    return await this.http.get("http://52.74.132.238/api/delivery_with_jobs/"+orn, { headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (this.cookieService.get('session'))
    }) }).toPromise();
     
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
