import {Component} from '@angular/core';

@Component({
    templateUrl: './sign-up.component.html',
})
export class signUpComponent  {
    firstName = '';
    lastName='';
    email ='';
    password =''; 
    phonenumber ='';
    //constructor(private authService:AuthService){}
    constructor(){}
      signUp():void  {
            const newUser ={
            firstName: this.firstName,
            lastName: this.lastName ,
            email: this.email,
            password: this.password,
            phonenumber: this.phonenumber,
            };
    if(newUser.firstName && newUser.lastName && newUser.email && newUser.password && newUser.phonenumber){
       // this.authService.signUp()

        console.log(newUser);     
        document.getElementsByName("labelError")[0].innerText = '';  
    } else {
       console.log('Broken form, not valid YO');
       document.getElementsByName("labelError")[0].innerText = 'First Name, Last Name, Email, and Password are required.';
    }
    } 
} 
