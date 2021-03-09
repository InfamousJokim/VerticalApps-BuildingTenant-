import { DatePipe } from '@angular/common';
import { Component, OnInit , OnDestroy} from '@angular/core';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OdeliveryformService } from '../odeliveryform.service';
import * as moment from 'moment';



@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
  providers : [DatePipe]
})
export class FormPage implements OnInit{

  get package(){
    return this.inputForm.get('package')
  }
  

 

  get date(){
    return this.inputForm.get('date');
  }


  
  get time(){
    return this.inputForm.get('time');
  }

  get logistic_partner(){
    return this.inputForm.get('logistic_partner');
  }

  public errorMessages = {
    package: [
      { type: 'required',message: 'package is required'},
      { type: 'min', message: 'Invalid Number'},
      {type: 'max', message: 'max packages is 40'},
      {type: 'pattern', message: 'Invalid Input'},
      
    ],
    logistic_partner: [
      { type: 'required',message: 'Logistic Partner is required'}
      
    ], 
    date:[
      {type: 'required', message : 'date is required' , }
    ],
    time:[
      {type: 'required', message : 'date is required'}
    ]
  };

  inputForm = this.formBuilder.group({
    package: ['', 
    [
      Validators.required,
      Validators.pattern('[0-9]*'),
      Validators.min(0),
      Validators.max(40)
    ]
  ],
   

    logistic_partner : ['',
    [
      Validators.required,
      
      
    ]
  ],
  date:['', 
    [
      Validators.required
    ] 
  ],
  time:['', 
    [
      Validators.required
    ] 
  ],


  });

  //declaring for passing over 
  formData = {}
  parcel : string ; 
  Date : string;
  Time  : string; 
  log_partner : string; 
  Add : string ; 

  //Passing of the data 
    constructor(
      public formBuilder: FormBuilder,
      public OD : OdeliveryformService,
      public route : Router, 
      private datepipe : DatePipe
      ) {}
  
  getDataFromUser(){
    console.log(this.parcel);
    this.formData = {
      parcel : this.parcel, 
      Date : this.Date,  
      Time : this.Time, 
      log_partner : this.log_partner,
      Add : this.Add
    }
    this.OD.SendData(this.formData);
  }
  
  

  ngOnInit(){
    this.inputForm.valueChanges.subscribe(console.log)
    this.Date = new Date().toISOString();
    this.Time = new Date().toISOString();
    
  }

  ngOnDestory(){

  }

  public submit(){
    console.log(this.inputForm.value);
  }
  


}
