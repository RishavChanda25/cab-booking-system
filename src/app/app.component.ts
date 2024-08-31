import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './services/api.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    loginbtn: boolean;
    logoutbtn: boolean;
    // actions
    constructor(private dataService: ApiService, private router: Router) {
        dataService.getLoggedInName.subscribe(name => this.changeName(name));
        // after login
        if (this.dataService.isLoggedIn()) {
            console.log("loggedin");
            this.loginbtn = false;
            this.logoutbtn = true;
        }
        // not logged in
        else {
            this.loginbtn = true;
            this.logoutbtn = false;
        }

    }

    private changeName(name: boolean): void {
        this.logoutbtn = name;
        this.loginbtn = !name;
    }
    
    logout() {
        this.dataService.deleteToken();
        this.router.navigate(['login']);
        this.loginbtn = true;
        this.logoutbtn = false;
        // window.location.href = window.location.href;
    }
    //image='assets/background.jpg';

}