import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../shared/services/api-service.service';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent {
  projectForm: FormGroup;
  editMode: boolean = false;
  project = null;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService , private dataService: DataService) {
    this.projectForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['']
    });
    this.dataService.project$.subscribe((project) => {
        if(project){
          this.project = project;          
          this.updateAction(project)
        }
    })
  }

  handleAddProject() {
    if (this.projectForm.invalid) return;

    const project = this.projectForm.value;
    if (this.editMode) {
      this.apiService.put(`/api/projects/${this.project.id}`, project)
        .subscribe(
          () => {
            this.dataService.projectAdded$.next(true)
            console.log('Project updated successfully');
          },
          error => {
            console.log('Error updating project:', error);
          }
        );
    } else {
      this.apiService.post('/api/projects', project)
        .subscribe(
          () => {
            this.dataService.projectAdded$.next(true)
            console.log('Project added successfully');
          },
          error => {
            console.log('Error adding project:', error);
          }
        );
    }
  }

  updateAction(project?: any) {
    if (project) {
      this.projectForm.patchValue(project);
      this.editMode = true;
    } else {
      this.projectForm.reset();
      this.editMode = false;
    }
  }
}
