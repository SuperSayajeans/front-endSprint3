import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: Object;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    var url = "http://localhost:54380/api/tasks";
    var xhr = new XMLHttpRequest()
    var tasks;
    xhr.open('GET', url, true);
    console.log(xhr.responseText);
    xhr.onload = function () {
      tasks = JSON.parse(xhr.responseText);
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.table(tasks);
      } else {
        console.error(tasks);
      }
    }
    xhr.send(null);
  }
}

interface WeatherForecast {
  dateFormatted: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
