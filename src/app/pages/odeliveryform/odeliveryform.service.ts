import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject,  throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { catchError} from 'rxjs/operators';
import { Outbound, Notifications } from '../../interface'
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



  //Robot Manager
    public skillsetID = "49b75968-30f3-463f-8063-566d3650099b";
    public locationID = "6fd21a59-4bd9-4d5b-bfed-76e4bfd573d8";
    public markerTypeID = "b0000000-b000-b000-b000-b00000000001";
    public priorityID = "b0000000-b000-b000-b000-b00000000004";
    public robotID = "251a4343-67cb-4987-a970-1cdca94580de";
    public scheduleTypeID = "b0000000-b000-b000-b000-b00000000012";
    public layoutMarkerID = "b79de834-d32e-44c9-9089-83fc596f5dd2"; //1 China
    //public layoutMarkerID = "f4569c0d-8a9a-47aa-8227-e51da19e7cb5"; 2 Singapore
    //public layoutMarkerID = "ec261ca9-dc17-4c03-b74f-5240f02680b0"; 3 China
    //public layoutMarkerID = "b79de834-d32e-44c9-9089-83fc596f5dd2"; 4 Start A
    public executionTime = "2021-02-03T07:22:00.000Z";
    public description = "testing add API";
    public routineID = "00000000-0000-0000-0000-000000000000";
    public startDate = "2021-02-03T07:22:25.247Z";
    public endDate = "2021-02-03T03:07:24.247Z";
    public recurDays = 1;
    public timeList = "[1590026100]";
    public parameters = [];
    
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

  //Sending Cart type to confirmation & database
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



  
  Post_Job(job_start_time : string, robot_id : string, layoutid: string) {
    var executionTime_converted = new Date(job_start_time).valueOf();
    //var startDate_converted = new Date(this.startDate).valueOf();
    //var endDate_converted = new Date(this.endDate).valueOf();

    const body = {
        "skillsetID": this.skillsetID,
        "locationID": this.locationID,
        "markerTypeID": this.markerTypeID,
        "priorityID": this.priorityID,
        "robotID": robot_id,
        "scheduleTypeID": this.scheduleTypeID,
        "layoutMarkerID": layoutid,
        "executionTime": this.executionTime,
        "description": this.description,
        "routineID": this.routineID,
        "startDate": job_start_time,
        "endDate": job_start_time,
        "recurDays": this.recurDays,
        "timeList": "["+(executionTime_converted/1000)+"]",
        "parameters": this.parameters
    }
    //return this.http.post<Inbound>("http://52.221.34.95/api/add_inbound_delivery", inbound, { headers: this.reqHeader })
    return this.http.post("http://52.74.132.238/api/job/add", body, { headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (this.cookieService.get('robotmanager_token'))
    }) })
    //return this.http.post<Users>("/api/add_user", user, httpOptions)
    .toPromise()
  }

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
