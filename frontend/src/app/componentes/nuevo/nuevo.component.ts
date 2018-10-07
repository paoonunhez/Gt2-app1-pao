import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'; 

import { Tarea } from '../../clases/tarea.model';
import { TareaService } from '../../tarea.service';
import { AuthService } from '../../auth.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
@Injectable()
export class NuevoComponent implements OnInit {

  nuevoForm: FormGroup;
  sTarea: Subject<Tarea | null>;

  tarea: Tarea;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private route: ActivatedRoute, 
    private tareaService: TareaService,
    private authService: AuthService
  ) {
    this.nuevoForm = this.fb.group({
      descripcion: ['', Validators.required]
    });
    
    this.sTarea = new Subject();
    // this.tarea = new Tarea();
    this.getAuthCookie();
  }

  getAuthCookie(){
    this.authService.sAuthCookie
    .subscribe(() => {
      this.sTarea.next(null);
    });
  }

  nuevo(descripcion) {
    const idUsuario = this.authService.obtenerIdSesion;
    this.tareaService
    .nuevo(descripcion, idUsuario)
    .subscribe( data => {
      if(data){
        // this.sAuthCookie.next(true); // cookie
        // this.authService.establecerAuthCookie(true) //eliminar luego
        this.router.navigate(['/lista'])
        // this.obtenerLista();
      } else {
        window.alert(data)
      }
    });
  }

  ngOnInit() {
  }

}
