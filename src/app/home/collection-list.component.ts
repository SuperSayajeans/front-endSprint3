import { Component, OnInit, Inject } from '@angular/core';
import { Task } from "./task";
import { HttpClient } from '@angular/common/http';
import { InjectionsService } from '../injections.service';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.css']
})
export class CollectionListComponent implements OnInit {

  public tasks: Object;
  backlog = [];
  inProgress = [];
  blocked = [];
  done = [];
  item: Task = {
    description: "",
    hours: 0,
    id: 0,
    owner: "",
    tracking: 0
  };

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private injection: InjectionsService) {
    var url = "http://localhost:54380/api/SprintManager?projectId=" + this.injection.activeProject;
    var xhr = new XMLHttpRequest();
    var response;
    xhr.open('GET', url, false);
    xhr.send(null);
    response = JSON.parse(xhr.responseText);

    for (let task of response) {
      if (task.status == 1)
        this.backlog.push(task);
      if (task.status == 2)
        this.inProgress.push(task);
      if (task.status == 3)
        this.blocked.push(task);
      if (task.status == 4)
        this.done.push(task);
    }

  }

  ngOnInit() {
  }

  add() {
    if (this.backlog.length < 20 && confirm("Are you sure you want to add the task?")) {
      var taskToSend = { description: this.item.description, status: 1, tracking: this.item.tracking, hours: this.item.hours, projectId: this.injection.activeProject, sprintId: 1, userId: 1 };
      var url = "http://localhost:54380/api/tasks";
      var xhr = new XMLHttpRequest();
      xhr.open('POST', url, false);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify(taskToSend));
      url = "http://localhost:54380/api/SprintManager?projectId=" + this.injection.activeProject;
      xhr = new XMLHttpRequest();
      var response;
      xhr.open('GET', url, false);
      xhr.send(null);
      response = JSON.parse(xhr.responseText);

      this.backlog = [];
      this.inProgress = [];
      this.blocked = [];
      this.done = [];
      
      for (let task of response) {
        if (task.status == 1)
          this.backlog.push(task);
        if (task.status == 2)
          this.inProgress.push(task);
        if (task.status == 3)
          this.blocked.push(task);
        if (task.status == 4)
          this.done.push(task);
      }
    }
  }
  remove() {
    var txt;
    var target = prompt("Please enter the ID of the Task you want to delete:");
    if (target == null || target == "") {
    } else {
      var url = "http://localhost:54380/api/tasks/" + target;
      var xhr = new XMLHttpRequest();
      xhr.open('DELETE', url, false);
      xhr.send(null);

      var url = "http://localhost:54380/api/SprintManager?projectId=" + this.injection.activeProject;
      var xhr = new XMLHttpRequest();
      var response;
      xhr.open('GET', url, false);
      xhr.send(null);
      response = JSON.parse(xhr.responseText);

      this.backlog = [];
      this.inProgress = [];
      this.blocked = [];
      this.done = [];

      for (let task of response) {
        if (task.status == 1)
          this.backlog.push(task);
        if (task.status == 2)
          this.inProgress.push(task);
        if (task.status == 3)
          this.blocked.push(task);
        if (task.status == 4)
          this.done.push(task);
      }
    }
  }

  shiftToInProgress(index: number) {
    if (confirm("Are you sure you want to put this task in progress?")) {
      var url = "http://localhost:54380/api/tasks/" + this.backlog[index].taskId + "?status=2";
      console.log(url);
      let t: Task[] = this.backlog.splice(index, 1);
      this.inProgress.push(t[0]);
      var xhr = new XMLHttpRequest();
      xhr.open('PUT', url, false);
      xhr.send(null);
    }
  }

  shiftToBlocked(index: number) {
    if (confirm("Do you want to block this task?")) {
      var url = "http://localhost:54380/api/tasks/" + this.inProgress[index].taskId + "?status=3";
      console.log(url);
      let t: Task[] = this.inProgress.splice(index, 1);
      this.blocked.push(t[0]);
      var xhr = new XMLHttpRequest();
      xhr.open('PUT', url, false);
      xhr.send(null);
    }
  }

  shiftToBacklog(index: number) {
    if (confirm("Do you want to put this task back into the backlog?")) {
      var url = "http://localhost:54380/api/tasks/" + this.blocked[index].taskId + "?status=1";
      console.log(url);
      let t: Task[] = this.blocked.splice(index, 1);
      this.backlog.push(t[0]);
      var xhr = new XMLHttpRequest();
      xhr.open('PUT', url, false);
      xhr.send(null);
    }
  }

  shiftToDone(index: number) {
    if (confirm("Is this task done?")) {
      var url = "http://localhost:54380/api/tasks/" + this.inProgress[index].taskId + "?status=4";
      console.log(url);
      let t: Task[] = this.inProgress.splice(index, 1);
      this.done.push(t[0]);
      var xhr = new XMLHttpRequest();
      xhr.open('PUT', url, false);
      xhr.send(null);
    }
    else this.shiftToBlocked(index);
  }
}
