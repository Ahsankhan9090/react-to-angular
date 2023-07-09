import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './components/projects/projects.component';
import { AuditsComponent } from './components/audits/audits.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AuthGuard } from './guard/auth-guard.guard';

const routes: Routes = [
  { path: '', component: ProjectsComponent  , canActivate: [AuthGuard] },
  { path: 'audits', component: AuditsComponent  , canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent , canActivate: [AuthGuard] },
  { path: 'sign-in', component: SigninComponent },
  { path: 'sign-up', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
