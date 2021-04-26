import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { throwError } from 'rxjs';
import { Outbound_Delivery } from './interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http : HttpClient , private cookieService : CookieService , ) { }

  reqHeader = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + (this.cookieService.get('session'))
  });


  async getJobStatus() {
    return await this.http.get("http://52.74.132.238/api/jobs", { headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (this.cookieService.get('session'))
    }) 
  }).toPromise();
     
  }

  async getSpecificJobStatus() {
    return await this.http.get("http://52.74.132.238/api/jobs", { headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (this.cookieService.get('session'))
    }) 
  }).toPromise();
     
  }

  async GetJobCartBased(){
    var job_id = JSON.parse(localStorage.getItem("job_id"))
    
    return await this.http.get("http://52.74.132.238/api/single_job/"+job_id,{headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (this.cookieService.get('vertical_app_token'))
    })}).toPromise()
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
