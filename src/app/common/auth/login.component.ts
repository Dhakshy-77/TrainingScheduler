import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

    email = 'geetha@miles.com';
    password = 'g';

    constructor(
        private router: Router,
        private authService: AuthService,
    ) { }

    ngOnInit() {
    }
//Is current user an Admin?

login(): void{
//This point doing admin process and calling login() in authService.

        this.authService.login(this.email, this.password)
            .subscribe(
                (response) => {
                    if(response.success){
                        console.log('Login success');
                        this.router.navigateByUrl('/home');
                    }
                },
            (error) => {
                console.log('please check email/password ')
            }
        );
    }
}