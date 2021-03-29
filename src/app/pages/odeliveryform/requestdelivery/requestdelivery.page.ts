import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OdeliveryformService } from '../odeliveryform.service';

@Component({
  selector: 'app-requestdelivery',
  templateUrl: './requestdelivery.page.html',
  styleUrls: ['./requestdelivery.page.scss'],
})
export class RequestdeliveryPage  {

  


  //Right-column items
  option1 = false;

  //Left-column items
  option2 = false;

  //Giving values to checkbox

  cartType : string ; 

  
  getCart(){
    if(this.option1 === true){
      this.cartType = "Double Column";
      localStorage.setItem("outbound", JSON.stringify(this.cartType));
      console.log(this.option1);
      
    }

    if(this.option2 === true){
      this.cartType = "Full Column";
      localStorage.setItem("outbound", JSON.stringify(this.cartType));
      console.log(this.option2);
      
    }
  }


  // }


  //This is optional (to identify the boolean of item/checkbox)
  change1() {
    console.log(this.option1);
  }

  change2(){
    console.log(this.option2)
  }

  //Change of column
  opacity:string="40%";
  

  constructor(public OD : OdeliveryformService) { } 

  //inputing values inside checkboxes
  
  
}
