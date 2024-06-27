import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../interface/post.interface';
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl = environment.serverBasePath;

  constructor(private http: HttpClient) { }

  registerPost(post: Post): Observable<Post> {
    const url = `${this.baseUrl}/post`;
    return this.http.post<Post>(url, post);
  }

  getPosts(): Observable<Post[]> {
    const url = `${this.baseUrl}/post`;
    return this.http.get<Post[]>(url);
  }
  deletePost(id:number): Observable<Post>{
    return this.http.delete<Post>(`${this.baseUrl}/post/${id}`);
  }

  getPostsByUser(id: any): Observable<Post[]> {
    const url = `${this.baseUrl}/post?user_id=${id}`;
    return this.http.get<Post[]>(url);
  }

  getUserByPost(id:any): Observable<any>{
    return this.http.get(`${this.baseUrl}/user/${id}`);
  }

  getPostTypes(): Observable<any>{
    return this.http.get(`${this.baseUrl}/post_type`);
  }
}
