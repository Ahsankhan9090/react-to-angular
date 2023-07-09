import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api-service.service';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  public user :any = null;

  constructor(public dataService : DataService , public apiService: ApiService, private router: Router){}

  ngOnInit(){
    this.dataService.user$.subscribe((data) => {
      this.user = data;
    })
    this.apiService.get('/auth/me').subscribe((data) => {
      this.dataService.user$.next(data);
      this.user = data;
    });
    
  }

  public handleLogout() {
    this.dataService.user$.next(null);
    localStorage.removeItem('token');
    this.user = null;
    this.router.navigate(['/sign-in']);
    
  }
}
