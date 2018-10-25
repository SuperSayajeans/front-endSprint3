import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public tasks: Object;
  public page: number;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    var url = "http://localhost:54380/api/tasks?page=1&size=10";
    var xhr = new XMLHttpRequest();
    var response;
    xhr.open('GET', url, false);
    xhr.send(null);
    response = JSON.parse(xhr.responseText);
    this.tasks = response;
    console.table(this.tasks);
    this.page = 1;
  }

  nextPage() {
    this.page = this.page + 1;
    var url = "http://localhost:54380/api/tasks?page=" + this.page + "&size=10";
    var xhr = new XMLHttpRequest();
    var response;
    xhr.open('GET', url, false);
    xhr.send(null);
    response = JSON.parse(xhr.responseText);
    this.tasks = response;
  }

  previousPage() {
    if (this.page > 1) {
      this.page = this.page - 1;
      var url = "http://localhost:54380/api/tasks?page=" + this.page + "&size=10";
      var xhr = new XMLHttpRequest();
      var response;
      xhr.open('GET', url, false);
      xhr.send(null);
      response = JSON.parse(xhr.responseText);
      this.tasks = response;
    }
  }
}