import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {BtnCrearComponent} from "./btn-crear/btn-crear.component";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatDialogActions} from "@angular/material/dialog";
import {MatDivider} from "@angular/material/divider";
import {PostsComponent} from "./posts/posts.component";


@Component({
  selector: 'app-comunidad',
  standalone: true,
  imports: [
    CommonModule,
    BtnCrearComponent,
    MatCardModule,
    MatButtonModule,
    MatIcon,
    MatDialogActions,
    MatDivider,
    PostsComponent
  ],
  templateUrl: './comunidad.component.html',
  styleUrl: './comunidad.component.css'
})
export class ComunidadComponent {

}
