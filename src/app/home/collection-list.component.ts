import { Component, OnInit } from '@angular/core';
import {Task} from "./task";

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.css']
})
export class CollectionListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  backlog = [];
  inProgress = [];
  blocked = [];
  done = [];
  item:Task = {
    name: "",
    time: 0,
    id: 0,
    owner: ""
  };

  add(){
    if(this.backlog.length < 20) {
      let task = Object.assign({}, this.item);
      this.backlog.push(task);
      this.item.name = "";
      this.item.time = 0;
      this.item.id = 0;
    }
  }
  remove(){
    this.backlog.pop();
  }

  shiftToInProgress(index: number){
    let t: Task[] = this.backlog.splice(index, 1);
    this.inProgress.push(t[0]);
  }

  shiftToBlocked(index: number){
    let t: Task[] = this.inProgress.splice(index, 1);
    this.blocked.push(t[0]);
  }

  shiftToDone(index: number){
    let t: Task[] = this.blocked.splice(index, 1);
    this.done.push(t[0]);
  }

}
