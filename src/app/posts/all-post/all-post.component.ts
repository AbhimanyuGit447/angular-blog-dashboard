import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent implements OnInit {

  postArray : any[] = [];

  constructor(public postService : PostsService){}



  ngOnInit(){
    this.postService.loadData().subscribe(val => {
      console.log(val);
      this.postArray = val;

    })
  }

  onDelete(postImgPath : any, id:  any){
    this.postService.deleteImage(postImgPath, id);
  }

  onFeatured(id: any, value : boolean ){
    const featuredData = {
      isFeatured : value,
    }

    this.postService.markFeatured(id, featuredData);
  }

}
