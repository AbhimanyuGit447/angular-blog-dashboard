import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { TasksService } from '../services/tasks.service';

interface Task {
  id?: string;
  name?: string;
  status?: string;
  url?: string;
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  usersArray : any[] = [];

  isOpened : boolean = false;

  isTaskOpened : boolean = false;

  newTaskName: string = '';

  readyTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  finishedTasks: Task[] = [];

  newTaskUrl: string = '';


  constructor(private service : PostsService, private taskService : TasksService){

  }


  ngOnInit(): void {
  this.fetchTasks();
  }

  fetchTasks() {
    this.taskService.getallTask().subscribe(tasks => {
      this.readyTasks = tasks.filter(task => task.status === 'Ready');
      this.inProgressTasks = tasks.filter(task => task.status === 'InProgress');
      this.finishedTasks = tasks.filter(task => task.status === 'Finished');
    });
  }


  expandSubList(){
    this.isTaskOpened = false;
    this.isOpened = !this.isOpened
    this.usersArray = [];

    this.service.loadUsers().subscribe(users => {
      console.log(users);
      users.forEach(user => {
        this.usersArray.push(user.data)
      })

      console.log(this.usersArray);

    })
  }

  close(){
    this.isOpened = false;
    this.usersArray = [];
  }

  onTasks(){
    this.isOpened = false;
    this.isTaskOpened = !this.isTaskOpened;
  }

  ////


  moveTask(task: Task, targetStatus: string) {
   if(task.id){
    this.taskService.updateTask(task.id, targetStatus)
   }
  }
  addTask() {
    if (this.newTaskName.trim().length > 0) {
      const newTask: Task = { name: this.newTaskName.trim(), status: 'Ready', url: this.newTaskUrl.trim() };
      this.taskService.addTaskToDB(newTask).then(() => {
        this.newTaskName = '';
        this.newTaskUrl = '';
      })

    }
  }

  deleteTask(task: Task) {
    if(task.id){
      this.taskService.deleteTask(task.id)
    }

    }

}
