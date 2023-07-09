import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared/services/api-service.service';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.scss']
})
export class ListProjectsComponent {
  projects: any[] = [];
  filter: string = '';

  constructor(private apiService: ApiService , private dataService: DataService) {}

  ngOnInit() {
    this.fetchProjects();
    this.dataService.projectAdded$.subscribe((data) => {
      if(data){
        this.fetchProjects()
      }
    })
  }

  handleEditProject(id: number) {
    const project = this.projects.find(p => p.id === id);
    this.dataService.project$.next(project);
  }

  handleRemoveProject(id: number) {
    this.apiService.delete(`/api/projects/${id}`).subscribe(
      () => {
        this.fetchProjects();
      },
      error => {
        console.log(error);
      }
    );
  }

  handleChange(value: any) {
    
    const filterValue = value;
    this.filter = filterValue;
    if (filterValue) {
      this.getByID();
    } else {
      this.fetchProjects();
    }
  }

  getByID() {
    this.apiService.get(`/api/projects/${this.filter}`).subscribe(
      (res) => {
        if (res.data) {
          this.projects = [res.data];
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  fetchProjects() {
    this.apiService.get('/api/projects').subscribe(
      (res) => {
        console.log(res)
        this.projects = res;
      },
      error => {
        console.log(error);
      }
    );
  }
}
