import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public tasks: Object;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    var url = "http://localhost:54380/api/tasks";
    var xhr = new XMLHttpRequest();
    var response;
    xhr.open('GET', url, false);
    xhr.send(null);
    response = JSON.parse(xhr.responseText);
    this.tasks = response;
    console.table(this.tasks);
  }
}