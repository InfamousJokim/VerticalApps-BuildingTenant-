import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as delay from 'delay';
import { LoginService } from './login.service';
import { Login} from '../../interface';
import { LoadingController, ToastController} from '@ionic/angular';
import { AppSettings } from '../../app.settings'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [ LoginService , HttpClient ],
})
export class LoginPage implements OnInit {

  //Testing 
  //Get Registered user's email 
  get email(){
    return this.loginForm.get('email');
  }

  //Get registered user's password 
  get password(){
    return this.loginForm.get('email');
  }



  //Frontend Form validations
  public errorMessages = {
    email:[
      {type: 'required', message: 'Email Address is required'},
      {type: 'email' , message: 'Please input a valid Email Address'}
    ],
    password:[
      {type: 'required', message: 'Password is required'},
    ]
  }

  loginForm = this.formBuilder.group({
    email:['',
  [
    Validators.required,
    Validators.email
  ]
],
  password:['',
  [
    Validators.required
  ]
]
  })
  

  constructor(private formBuilder: FormBuilder , private loginService : LoginService , private router : Router, public loadingController: LoadingController , private toasterror : ToastController , private Appsettings : AppSettings) { }

  




  //Creating authenticated login
  login : Login[];
  log = new Login();
  
  
  authenticated : string;
  error: number;
  token : string;
  status : string;
  robotmanager_token : string ;  


  ngOnInit() {}
  
  
  async Login(){
    //wait for POST operation to complete then return response
    this.token = "";
    this.authenticated = "";
    this.status = "";
    const loading = await this.loading();
    await this.loginService.login(this.log).then(res =>{
      this.token = res['token'];
      //this.registerNotificationTopic(); 
      
    })
      .catch(err =>{
        this.status = err['error']
        console.log(err)
      }
    );
    
    //this.token = token_retrieve['token'];
    if (this.status ==="" && this.token !== ""){
      await this.setCookie('session', this.token, 1, '/');
     
      localStorage.setItem("User_Email", JSON.stringify(this.log.username));
      loading.dismiss();
      this.go_next_page();
      
    }else{
      loading.dismiss();
      this.authenticated="false";
    }
    
    
  }


  
  


  //To register the MQTT Topic
  registerNotificationTopic(){
    this.loginService.mqttRegister().then((data : any) =>{
      
      localStorage.setItem('mqttTopic',JSON.stringify(data.result));
      console.log(data);
        const connection = {
          'host': '52.74.132.238',
          'port': '9001'
        };
        this.Appsettings.setSubsFlag(connection);
        localStorage.setItem('NotificaionMQTTTopic', JSON.stringify(connection));

    })
  }

  //Direct authenticated user = "true" to navigate to next page
  async go_next_page(){
      await delay(200);
      this.router.navigateByUrl('/tabs/dashboard');
    
  }

  //storing hash value into cookies
  async setCookie(name: string, value: string, expireDays: number, path: string = '') { 
    
    let d:Date = new Date();
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    let expires:string = `expires=${d.toUTCString()}`;
    let cpath:string = path ? `; path=${path}` : '';
    document.cookie = `${name}=${value}; ${expires}${cpath}`;
  }

  async loading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    loading.present();
    return loading;
  }

  //toast for incorrect login
  async logintoast(){
      if(this.authenticated = "false"){
        await this.toasterror.create({
          message : "Login is failed , please try again",
          duration : 3000 , 
          position : 'top' , 
          color : "warning",
          cssClass : "toast_error",
          buttons : [{
  
            handler : () => {
              console.log("Invalid Login");
    
            }
          }]
  
        }).then(res => res.present());
      }
    
  }
  



}
