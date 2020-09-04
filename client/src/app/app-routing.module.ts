import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreateComponent } from './components/create/create.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './components/guards/auth.guard';
import { NotAuthGuard } from './components/guards/notauth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'create', component: CreateComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [NotAuthGuard]},
  { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard]},
  { path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  bootstrap: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }