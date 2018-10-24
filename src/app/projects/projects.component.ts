import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InjectionsService } from '../injections.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {

  public projects: Object;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private injection: InjectionsService) {
    var url = "http://localhost:54380/api/projects";
    var xhr = new XMLHttpRequest();
    var response;
    xhr.open('GET', url, false);
    xhr.send(null);
    response = JSON.parse(xhr.responseText);
    this.projects = response;
    console.table(this.projects);
  }

  changeActiveProject(index) {
    this.injection.activeProject = this.projects[index].projectId;
    console.log(this.injection.activeProject);
  }
}
