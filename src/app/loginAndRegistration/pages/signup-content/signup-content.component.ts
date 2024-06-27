import {ChangeDetectionStrategy, Component, ElementRef, OnInit, signal, ViewChild} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatCard} from "@angular/material/card";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import { UsersService } from '../../services/users.service';
import { loginResponse } from '../../model/login.entity';
import { AuthService } from '../../../auth/auth.service';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup-content',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatCard, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, NgIf, MatIconButton, MatRadioGroup, MatRadioButton, MatButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './signup-content.component.html',
  styleUrl: './signup-content.component.css'
})
export class SignupContentComponent implements OnInit {
  email=new FormControl('',[Validators.required, Validators.email]);
  pass=new FormControl('',[Validators.required]);
  type=new FormControl('',[Validators.required]);
  loginForm!: FormGroup;
  constructor(private fb:FormBuilder,private userService:UsersService,private auth:AuthService,private router: Router,private cookie:CookieService){
    this.loginForm = fb.group({
      email:['',[Validators.required, Validators.email]],
      pass:['',[Validators.required]],
      type:['',[Validators.required]]
    })
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadAccounts();
  }
  users:loginResponse[]=[];
  loadAccounts(){
    this.userService.getUsers().subscribe(data=>{
      this.users=data;
    })
  }
  errorMessage = '';
  hide = signal(true);

  ngOnChanges() {
    this.updateErrorMessage();
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    } else if (this.email.hasError('email')) {
      this.errorMessage = 'Not a valid email';
    } else {
      this.errorMessage = '';
    }
  }
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide);
    event.stopPropagation();
  }

  onSubmit() {
    if (this.loginForm.valid) {
        const formValue=this.loginForm.value;
        const user:loginResponse={
          email:formValue.email,
          password:formValue.pass,
          user_type_id:formValue.type
          };
        const oldUser=this.users.find(oldUser =>oldUser.email === user.email && oldUser.password ===user.password && oldUser.user_type_id == user.user_type_id);
        if(oldUser){
          console.log("este nuevo usuario",user);
          this.cookie.set('email', user.email, 1);
          this.auth.login(user.email);
          this.router.navigate(['community']);
        }
      }
    }





  }

