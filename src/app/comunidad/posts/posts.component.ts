import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {Post} from "../interface/post.interface";
import {PostService} from "../services/post.service";
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {SharedDataService} from "../services/sharedata.service";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader, MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {UsersService} from "../../loginAndRegistration/services/users.service";

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    MatCardHeader,
    MatCard,
    MatCardContent,
    MatCardActions,
    NgForOf,
    MatCardSubtitle,
    MatCardTitle,
    MatIcon,
    MatButton,
    NgIf,
    MatCardImage
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit{
  username: string = "";
  //posts: Post[] = [];'
  posts: any = [];
  users: any = {};
  post_types: any = {};

  constructor(private authService: AuthService,
              private postService: PostService,
              private shared:SharedDataService,
              private usersService: UsersService,
              public dialog:MatDialog
  ) {}

  ngOnInit() {
    this.loadPosts();
    this.loadUsers();
    this.loadPostTypes();
    this.authService.username$.subscribe(username => {
      this.username = username;
    });
  }

  loadPosts(){
    this.postService.getPosts().subscribe(posts => {
      console.log(posts);
      this.posts = posts;
    });
  }

  loadUsers(){
    this.usersService.getUsers().subscribe(users => {
      console.log(users);
      this.users = users;
    });
  }

  loadPostTypes(){
    this.postService.getPostTypes().subscribe(post_types => {
      console.log(post_types);
      this.post_types = post_types;
    });
  }

  getUserByPost(user_id:any) :any{
    return this.users.find((user:any) => user.id === user_id);
  }

  getPostTypeByPost(post_type_id:any):any{
    return this.post_types.find((post_type:any) => post_type.id === post_type_id);
  }

  confirmDelete(idborrar:number):void{
    this.shared.sharedVariable=idborrar;
    this.dialog.open(confirmacion);
  }
}



@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialo-component2.html',
  styleUrl: 'posts.component.css',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions,MatDialogClose, MatButtonModule,HttpClientModule,CommonModule]
})
export class confirmacion{
  importedVariable = -1;
  constructor(private shared:SharedDataService,private postService:PostService,private router:Router){
    this.importedVariable=this.shared.sharedVariable;
  }
  deletePost(){
    this.postService.deletePost(this.importedVariable).subscribe(() => {
      this.loadPosts();
      console.log("Post borrado");
      window.location.reload();
    });

  }

  posts: Post[] = [];
  loadPosts() {
    this.postService.getPosts().subscribe(posts => {
      console.log(posts);
      this.posts = posts;
    });
  }
}

