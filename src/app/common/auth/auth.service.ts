import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
//import 'rxjs/add/operator/do';
import { tap } from 'rxjs/operators';

export interface ILoginResponse {
    success: boolean;
    token?: string;
    user: IUser;
}

export interface IUser {
    id: number,
    first: string,
    last: string,
    email: string,
    phone: string,
    userRoleId: number,
    aboutMe: string,
    isTrainer: boolean,
}

export enum UserRoles {
    Admin = 1,
    User = 2,
}

@Injectable()
export class AuthService {

    //BehaviorSubject is a value container.It is also a Bearer token.
    //Property/Name on this service called isAdmin. set to new intial value false/null.

    token: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    isAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isTrainer: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    
    constructor(
        private http: HttpClient,
    ) {}

    isAuthenticated(): boolean {
        return this.token ? true : false;
    }
    /*  pseudo code of login()
        return an observable hitting the login endpoint
        when that observable is subscribed to (aka fired)
        grab the value coming back from the login and set the token
        grab the value coming back from the login and set an isAdmin value
        grab the value coming back from the login and set an isTrainer value */
    
    login(email: string, password: string): Observable<ILoginResponse> {
        const data = {
            email: email,
            password: password,
        };
        return this.http.post<ILoginResponse>('http://localhost:3000/login', data)
            //.do((response) => 
    // pipe(tap()) means if something else subscribes to this function it gives response.       
    //add token or value
          .pipe(
                tap((response)=>{
                this.token.next(response && response.success && response.token || null);
                this.isAdmin.next(response && response.success && response.user.userRoleId === UserRoles.Admin || false);
                this.isTrainer.next(response && response.success && response.user.isTrainer || false);
                }
                ) 
            );
    }

    logout(): void {
        this.token.next(null);
        this.isAdmin.next(false);
        this.isTrainer.next(false);
    }
    signUp(firstName: string, lastName: string, phoneNumber: string, email: string, password: string, isTrainer: boolean): Observable<any> {
        const data = {
            first: firstName,
            last: lastName,
            phone: phoneNumber,
            email: email,
            password: password,
            userRoleId: UserRoles.User,
            aboutMe: null,
            isTrainer: isTrainer,
        };
        
        //data.userRoleId = UserRoles.User;
        //data.aboutMe = null;
        if (!data.phone) data.phone = null;
        return this.http.post('http://localhost:3000/users', data);
    }

    updateUserInfo(userId: Number, userInfo: any): Observable<any> {
        return this.http.put('http://localhost:3000/users?id=' + userId, userInfo);
    }

    getCurrentUser(): Observable<IUser> {
        return this.http.get<IUser>('http://localhost:3000/getUser');
    }
    getTrainers(): Observable<IUser[]> {
        return this.http.get<IUser[]>('http://localhost:3000/users?isTrainer=1');
    }
}