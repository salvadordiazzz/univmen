import {Component, OnInit, signal} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCard} from "@angular/material/card";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {NgIf} from "@angular/common";
import { UsersService } from '../../services/users.service';
import { registerResponse } from '../../model/user.entity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-content',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatError,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatRadioButton,
    MatRadioGroup,
    MatSuffix,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './login-content.component.html',
  styleUrl: './login-content.component.css'
})
export class LoginContentComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  errorMessage = '';
  hide = signal(true);

  signupForm!: FormGroup;
  constructor(private fb:FormBuilder,private userService:UsersService,private router:Router){
    this.signupForm = this.fb.group({
      name:['',[Validators.required]],
      surname:['',[Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone:['', [Validators.required, Validators.minLength(9)]],
      user_type_id: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadAccounts();
  }
  accounts:registerResponse[] = [];
  loadAccounts(){
    this.userService.getUsers().subscribe(data=>{
      console.log(data); this.accounts=data;
    })
  }
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

  onSubmit(){
    if (this.signupForm.valid) {
      const newUser ={
        ...this.signupForm.value,
        registerDate: "2024-06-26 00:00:00",
        image: "https://img.freepik.com/vector-gratis/cute-honey-bee-flying-cartoon-vector-icono-ilustracion-naturaleza-animal-icono-concepto-aislado-premium_138676-6560.jpg?w=740&t=st=1717112161~exp=1717112761~hmac=faa3a19714297a56a3966aaeaabb33c536623dbc650cd275b25ffcae1f8c01e4",
        biography: "Mi biografia"
      };
      this.userService.createUser(newUser).subscribe(
        (data: any) => {
          this.router.navigate(['/login']);
        },
        (error: any) => {
          console.log(error);
        }
      );
      /*const oldUser=this.accounts.find(account => account.email === newUser.email)
      if(!oldUser){
        this.userService.postUser(newUser).subscribe({next:(newAccount:registerResponse) => {this.router.navigate(['login'])}, error:error=>{console.error("eror",error);},complete:()=>{}});
      }*/
    }
  }
}
