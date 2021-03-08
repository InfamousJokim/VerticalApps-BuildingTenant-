import { Injectable , Component } from '@angular/core';
import { Console } from 'console';
import { BehaviorSubject } from 'rxjs'; 

@Component({
    selector: 'app-appsettings',
    providers : [AppSettings]
  })

  @Injectable()
export class AppSettings {

    public socketData: any;
    
    
    
    private socketData1 = new BehaviorSubject(this.socketData?this.socketData:' ');
    public SocketData$ = this.socketData1.asObservable();
    private subsFlag:HostInterface = {
        host:'52.74.132.238',
        port:'9001',
        
        
    };
    private subsFlag1 = new BehaviorSubject(this.subsFlag );
    public SubsFlag$ = this.subsFlag1.asObservable();

    
    setSocketData(data) {
        this.socketData1.next(data);
        localStorage.setItem('mqttMessage' , data);
        console.log("Message from MQTT : " + data);
    }
    setSubsFlag(data) {
        this.subsFlag1.next(data);
        
    }

    
}


export interface HostInterface {
  host: string;
  port: string;
}