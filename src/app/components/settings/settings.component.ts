import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api-service.service';

interface Settings {
  daily_email_updates: boolean;
}
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  settings: Settings = { daily_email_updates: false };
  isLoaded = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchSettings();
  }

  fetchSettings(): void {
    this.apiService.get('/api/settings').subscribe(
      (response: any[]) => {
        const dailyEmailUpdates = response[0].daily_email_updates;
        this.settings.daily_email_updates = dailyEmailUpdates;
        this.isLoaded = true;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  updateSettings(): void {
    if (this.isLoaded) {
      this.apiService
        .put('/api/settings/daily_email_updates', {
          value: this.settings.daily_email_updates
        })
        .subscribe(
          () => {
          },
          (error: any) => {
            console.log(error);
          }
        );
    }
  }

  setSettings(dailyEmailUpdates: boolean): void {
    this.settings.daily_email_updates = dailyEmailUpdates;
    this.updateSettings();
  }
}
