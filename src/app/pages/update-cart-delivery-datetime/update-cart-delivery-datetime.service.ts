import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Outbound} from '../../interface'
import { CookieService } from 'ngx-cookie-service';
import { Observable ,throwError } from 'rxjs';
import { HttpErrorResponse} from '@angular/common/http';
import { catchError} from 'rxjs/operators';
@Injectable({
   providedIn: 'root'
})

export class UpdateDeliveryDatetimeService {
   public assigned_carts: string[] = [];

   public Outbound_Form = new Outbound();

   public skillsetID = "49b75968-30f3-463f-8063-566d3650099b";
    public locationID = "6fd21a59-4bd9-4d5b-bfed-76e4bfd573d8";
    public markerTypeID = "b0000000-b000-b000-b000-b00000000001";
    public priorityID = "b0000000-b000-b000-b000-b00000000004";
    public robotID = "251a4343-67cb-4987-a970-1cdca94580de";
    public scheduleTypeID = "b0000000-b000-b000-b000-b00000000012";
    public layoutMarkerID = "6af461e2-25bc-46bf-b496-7a15227fadb0";
    public executionTime = "2021-02-03T07:22:00.000Z";
    public description = "testing add API";
    public routineID = "00000000-0000-0000-0000-000000000000";
    public startDate = "2021-02-03T07:22:25.247Z";
    public endDate = "2021-02-03T03:07:24.247Z";
    public recurDays = 1;
    public timeList = "[1590026100]";
    public parameters = [];
   
   constructor(private http : HttpClient, private cookieService: CookieService ) { }
   
   Vertical_App_Header = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (this.cookieService.get('vertical_app_token'))
    });

    Post_Job() {
      //var executionTime_converted = new Date(this.executionTime).valueOf();
      //var startDate_converted = new Date(this.startDate).valueOf();
      //var endDate_converted = new Date(this.endDate).valueOf();

      const body = {
          "skillsetID": this.skillsetID,
          "locationID": this.locationID,
          "markerTypeID": this.markerTypeID,
          "priorityID": this.priorityID,
          "robotID": this.robotID,
          "scheduleTypeID": this.scheduleTypeID,
          "layoutMarkerID": this.layoutMarkerID,
          "executionTime": this.executionTime,
          "description": this.description,
          "routineID": this.routineID,
          "startDate": this.startDate,
          "endDate": this.endDate,
          "recurDays": this.recurDays,
          "timeList": this.timeList,
          "parameters": this.parameters
      }
      //return this.http.post<Inbound>("http://52.221.34.95/api/add_inbound_delivery", inbound, { headers: this.reqHeader })
      return this.http.post("http://app.robotmanager.io/api/job/add", body, { headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (this.cookieService.get('robotmanager_token'))
      }) })
      //return this.http.post<Users>("/api/add_user", user, httpOptions)
      .toPromise()
    }

    async GetSelectedJobs(orn : string) {
      return await this.http.get("http://52.74.132.238/api/delivery_with_jobs/"+orn, { headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (this.cookieService.get('session'))
      }) }).toPromise();
       
    }


    async CheckRobotsAvailability(count: number, new_datetime: string) {
      const body = {
        "num_of_jobs" : count,
        "new_datetime" : new_datetime
      }
      return this.http.post("http://52.74.132.238/api/check_robots_availability", body, { headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (this.cookieService.get('session'))
      }) })
      //return this.http.post<Users>("/api/add_user", user, httpOptions)
        .toPromise()
    }

    async AssignRobotToUnassignJobs(delivery_id: string, new_datetime: string) {
      const body = {
        "delivery_id" : delivery_id,
        "new_datetime" : new_datetime
      }
      return this.http.post("http://52.74.132.238/api/assign_robot_to_unassignedjobs", body, { headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (this.cookieService.get('session'))
      }) })
      //return this.http.post<Users>("/api/add_user", user, httpOptions)
        .toPromise()
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