import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OdeliveryformService } from '../odeliveryform.service';

@Component({
  selector: 'app-requestdelivery',
  templateUrl: './requestdelivery.page.html',
  styleUrls: ['./requestdelivery.page.scss'],
})
export class RequestdeliveryPage implements OnInit  {

  


  //Right-column items
  option1 = false;

  //Left-column items
  option2 = false;

  //Giving values to checkbox

  cartType : string ; 

  cartsRows : any ;

  fc_carts : boolean ;
  dc_carts : boolean ; 

  async ngOnInit(){
   await this.CheckAvailableCarts();

  }

  async doRefresh(event) {
    //location.reload();
    await this.CheckAvailableCarts();
    event.target.complete();
  }

  async CheckAvailableCarts(){
    await this.OD.getAvailableCarts().then((res: any) =>{
      this.cartsRows = res['result']['list'];

      if (this.cartsRows.length != 0){
        for (let i = 0; i < this.cartsRows.length; i++){
          if (this.cartsRows[i].cart_name.startsWith("Cart FC") == true){
           this.fc_carts = true;
          }else if (this.cartsRows[i].cart_name.startsWith("Cart DC") == true){
           this.dc_carts = true;
          }
        }
      }else{
        this.fc_carts = false;
        this.dc_carts = false;
      }

      if (this.fc_carts == null){
        this.fc_carts = false;
      }

      if (this.dc_carts == null){
        this.dc_carts = false;
      }

      
     })
  }

  
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
