import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public user$: BehaviorSubject<any>;
  public projectAdded$: BehaviorSubject<any>;
  public project$: BehaviorSubject<any>;
  constructor() { 
    this.user$ = new BehaviorSubject<any>(null);
    this.projectAdded$ = new BehaviorSubject<any>(false);
    this.project$ = new BehaviorSubject<any>(null);
  }
}
