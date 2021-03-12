/** 
 export class Outbound {
    
     Parcel: string;
     Date: string;
     Time: string;
     Log_partner: string;
     Add: string;
     Cart_type : string ; 
     Cart_Assigned : string ; 
     Tenant_Name : string ; 
  
  }*/

  export class Outbound {
    
    Parcel: string;
    Target_Cart_Arrival_Date : string;
    Target_Cart_Arrival_Time : string;
    Log_partner: string;
    Add: string;
    Cart_type : string ; 
    Cart_Assigned : string ; 
    Tenant_Name : string ; 
  
  }

export class Inbound_Delivery {
  Irn : string ; 
  Tenant_name : string ; 
  Target_delivery_time : string ; 
  Target_delivery_date : string; 
  Cart_id : string ; 
  delivery_status : string ; 
}



//Get the backend to pass status and a new class "Outbound Delivery " -- remove when done
export class Outbound_Delivery { 

  Orn : string ; 
  Parcel : string ; 
  Target_Cart_Arrival_Date : string;
  Target_Cart_Arrival_Time: string; 
  Log_partner : string ; 
  Add : string ; 
  delivery_Status : string ; 
  Cart_type : string ; 
  Cart_assigned : string ; 
  
}

export class Login {
  username: string;
  password: string;
}

export class Users {
  Id: string;
  Password: string;
}

//Get all the user
export class ParamList{
  PageNo: number;
  PageSize: number;
  SearchColumn: string;
  SearchText: string;
  SortColumn: string;
  SortOrder: number;
}


//Notification table 

export class Notifications{
  Status : string ; 
  Delivery_id : string ; 
  Notification_id : string ; 
}

//Pin Number 
export class Pin {
  pin : string ; 
}