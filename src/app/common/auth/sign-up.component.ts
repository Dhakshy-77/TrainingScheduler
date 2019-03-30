import { Component} from '@angular/core';


@Component({
    templateUrl: './sign-up.component.html',
})
export class signUpComponent  {
    firstName = '';
    lastName='';
    email ='';
    password =''; 
    phonenumber ='';
    constructor() {}
      signUp():void  {
            const newUser ={
            firstName: this.firstName,
            lastName: this.lastName ,
            email: this.email,
            password: this.password,
            phonenumber: this.phonenumber,
            };
    if(newUser.firstName && newUser.lastName && newUser.email && newUser.password && newUser.phonenumber){
        console.log(newUser);       
    } else {
       console.log('broken form, not valid');
      
    }
    } 
} 
  