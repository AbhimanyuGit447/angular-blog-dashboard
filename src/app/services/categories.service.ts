import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(public angularFS : AngularFirestore, private toastr : ToastrService) { }

  saveData(categoryData : any){

    this.angularFS.collection('categories').add(categoryData).then(docRef => {

      this.toastr.success('Data Insert Successfully');

    })
    .catch(err => {
      console.log(err);

    })
  }

  loadData(){
   return this.angularFS.collection('categories').snapshotChanges().pipe(
      map(actions => {
       return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return {id, data}
        })
      })
    )
  }

  updateData(id :any , editData : any){
    this.angularFS.doc(`categories/${id}`).update(editData).then(docRef => {
      this.toastr.success('Data Updated Successfully ..!');
    })
  }

  deleteData(id : any){
    this.angularFS.doc(`categories/${id}`).delete().then(docRef => {
      this.toastr.success('Data Deleted Successfully');
    })
  }

}
