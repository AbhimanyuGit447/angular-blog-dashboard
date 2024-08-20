

import { Injectable } from '@angular/core';
import { AngularFirestore } from  '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';

interface Task {
  id?: string;
  name: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private storage  : AngularFireStorage, public afs : AngularFirestore, private toastr : ToastrService, private router : Router) { }


  addTaskToDB(Task : any){
   return this.afs.collection('tasks').add(Task);
  }

  updateTask(taskId: string, status: string) {
    return this.afs.collection('tasks').doc(taskId).update({ status });
  }

  getallTask() : Observable<any[]>{
    return this.afs.collection('tasks').valueChanges({idField : 'id'})
  }



  deleteTask(taskId: string) {
    return this.afs.collection('tasks').doc(taskId).delete();
  }

  }



