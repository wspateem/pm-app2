

import {Route} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {OnLoginComponent} from "./on-login/on-login.component";
import {RegisterComponent} from "./register/register.component";
import {AuthGuard} from "./security/auth.guard";

export const routerConfig : Route[] = [
    {
        path:'home',
        component: HomeComponent
    },
    {
        path:'on-login',
        component: OnLoginComponent,
        canActivate: [AuthGuard]
    },
    {
        'path': 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];





