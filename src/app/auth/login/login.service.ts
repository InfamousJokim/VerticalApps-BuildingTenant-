
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable, throwError, ReplaySubject , } from 'rxjs';
import { catchError, retry  , map} from 'rxjs/operators';
import { Users, Login} from '../../interface'
import { CookieService } from 'ngx-cookie-service';
// import { AuthService } from 'angularx-social-login';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
  

@Injectable()
export class LoginService {

  token : string; 
    constructor(private http : HttpClient , private cookieService : CookieService){ }


    async login(login: Login) {
      return await this.http.post<Login>("http://52.74.132.238/api/token-auth", login, httpOptions).toPromise();
       
    }
    /*login(login: Login): Observable<Login> {
        //return this.http.post<Login>("/api/token-auth", login, httpOptions)
        return this.http.post<Login>("http://52.74.132.238/api/token-auth", login, httpOptions)
        //return this.http.post<Users>("/api/add_user", user, httpOptions)
          .pipe(
            catchError(this.handleError),
          );
         
      }*/

      
      //Getting token for authentication
      get_token(){
        return this.http.get("http://52.74.132.238/api/token-auth", httpOptions)
        //return this.http.get("http://52.221.34.95/api/token-auth", httpOptions)
          .pipe(
            catchError(this.handleError),
          );
         
      }

      //GetMqttMessage 
      /*mqttRegister() {
        return this.http.get('' + '/mqtt/register/notification', this.token())
            .pipe(map(this.extractData), catchError(this.handleError));
      }*/

      async mqttRegister() {
        return await this.http.get("http://52.74.132.238/api/outbound_deliveries/getnotification", { headers: new HttpHeaders({ 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + (this.cookieService.get('session'))
        }) 
      }).toPromise();
         
      }

      /*private extractData(res){
        const body = res.json();
        return body|| {};
      }*/
  
      //Getting Robot Manager Token
      async robot_manager_token(login: Login) {
        return await this.http.post<Login>("http://52.74.132.238/api/robotmanager_token_auth", login, httpOptions).toPromise()
    
      }


      //errormessages from console 
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
        console.log(error.status)
        // Return an observable with a user-facing error message.
        return throwError(
          error.status);
        
          
      }
}
