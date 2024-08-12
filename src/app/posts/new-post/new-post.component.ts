import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  permalink = '';
  imgSrc : any = './assets/placeholder-image.jpg';
  selectedImg : any = '';
  categories  : any[] = [];

  postForm!: FormGroup;

  post : any;

  formStatus : string = 'Add New'

  docId : string = '';


  constructor(
    private categoryService : CategoriesService,
     private fb : FormBuilder,
      private postService : PostsService,
    private route : ActivatedRoute){


    this.route.queryParams.subscribe(val => {

      this.docId = val['id'];

      if(this.docId){
        this.postService.loadOneData(val['id']).subscribe(post => {

          this.post = post;

          this.postForm = this.fb.group({
            title : [this.post.title, [Validators.required, Validators.minLength(5)]],
            permalink :  [{value: this.post.permalink, disabled: true}, Validators.required],
            excerpt : [this.post.excerpt, [Validators.required, Validators.minLength(10)]],
            category : [`${this.post.category.categoryId + '|' + this.post.category.category}`, Validators.required],
            postImg : ['', ],
            content : [this.post.content, Validators.required],
          })


          this.imgSrc = this.post.postImgPath;
          this.permalink = this.post.title.replace(/\s/g, '-');
          this.formStatus = 'Edit'
        });
      }else{
        this.postForm = this.fb.group({
          title : ['', [Validators.required, Validators.minLength(5)]],
          permalink :  [{value : '', disabled: true}, Validators.required],
          excerpt : ['', [Validators.required, Validators.minLength(10)]],
          category : ['', Validators.required],
          postImg : ['', ],
          content : ['', Validators.required],
        })
      }



    })




  }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe(val => {
      this.categories = val;


    });
  }




  get fc(){
    return this.postForm.controls;
  }

  onTitleChanged($event : any){
    const title = $event.target.value;
    this.permalink = title.replace(/\s/g, '-');

  }

  showPreview($event : any){
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result;
    }

    reader.readAsDataURL($event.target.files[0]);
    this.selectedImg = $event.target.files[0];
  }

  onSubmit(){
    console.log(this.postForm.value);

   let catgSplit = this.postForm.value.category.split('|');
   let catgId = catgSplit[0];
   let categoryName = catgSplit[1]

    const postData : Post = {
      title : this.postForm.value.title,
      permalink : this.permalink,
      category : {
        categoryId :catgId,
        category :categoryName
      },
      postImgPath : '',
      excerpt : this.postForm.value.excerpt,
      content : this.postForm.value.content,
      isFeatured : false,
      views : 0,
      status : 'new',
      createdAt : new Date()
    }




    this.postService.uploadImage(this.selectedImg, postData, this.formStatus, this.docId);
    this.postForm.reset();
    this.imgSrc = './assets/placeholder-image.jpg';
  }


}
