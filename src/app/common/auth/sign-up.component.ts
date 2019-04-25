import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './sign-up.component.html',
})
export class signUpComponent  {
    firstName = '';
    lastName='';
    email ='';
    password =''; 
    phonenumber ='';
    isTrainer = false;
    //constructor(private authService:AuthService){}
    constructor(
        private authService: AuthService,
        private router: Router,
    ){ }
      signUp():void {
        const newUser ={
            firstName: this.firstName,
            lastName: this.lastName ,
            email: this.email,
            password: this.password,
            phonenumber: this.phonenumber,
            isTrainer: this.isTrainer,
            };
            //&& newUser.isTrainer
    if(newUser.firstName && newUser.lastName && newUser.email && newUser.password){
        this.authService.signUp(newUser.firstName, newUser.lastName, newUser.email, newUser.password, newUser.phonenumber,newUser.isTrainer).subscribe(
            (response) => this.router.navigateByUrl('/login')
        );
        document.getElementsByName("labelError")[0].innerText = '';  
    } else {
       console.log('Broken form, not valid YO');
       document.getElementsByName("labelError")[0].innerText = 'First Name, Last Name, Email, and Password are required.';
    }
    } 
} 
