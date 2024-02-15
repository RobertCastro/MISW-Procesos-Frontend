import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuario-registro',
  templateUrl: './usuario-registro.component.html',
  styleUrls: ['./usuario-registro.component.css']
})
export class UsuarioRegistroComponent implements OnInit {

  usuarioForm: FormGroup;
  tipoUsuarioSeleccionado: string;

  constructor(
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService
  )
  {
    this.usuarioForm = new FormGroup('')
  }

  ngOnInit() {
    this.tipoUsuarioSeleccionado = '';

    this.usuarioForm = this.formBuilder.group({
      tipoUsuario: ['', Validators.required],
      usuario: ["", [Validators.required, Validators.maxLength(50)]],
      password: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
      confirmPassword: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
      nombre: [''],
      apellidos: [''],
      tipoIdentificacion: [''],
      numeroIdentificacion: [''],
      correo: [''],
      celular: ['']
    });
  }

  onChangeTipoUsuario(event): void {
    this.tipoUsuarioSeleccionado = event.target.value;

    if (this.esAdministrador()) {
      this.usuarioForm.get('nombre').clearValidators();
      this.usuarioForm.get('apellidos').clearValidators();
      this.usuarioForm.get('tipoIdentificacion').clearValidators();
      this.usuarioForm.get('numeroIdentificacion').clearValidators();
      this.usuarioForm.get('correo').clearValidators();
      this.usuarioForm.get('celular').clearValidators();
    } 

    if (this.esPropietario()) {
      this.usuarioForm.get('nombre').setValidators([Validators.required, Validators.maxLength(50)]);
      this.usuarioForm.get('apellidos').setValidators([Validators.required, Validators.maxLength(50)]);
      this.usuarioForm.get('tipoIdentificacion').setValidators(Validators.required);
      this.usuarioForm.get('numeroIdentificacion').setValidators([Validators.required, Validators.maxLength(30)]);
      this.usuarioForm.get('correo').setValidators([Validators.required, Validators.email, Validators.maxLength(100)]);
      this.usuarioForm.get('celular').setValidators([Validators.required, Validators.maxLength(10)]);
    }

    this.usuarioForm.updateValueAndValidity();

  }

  esPropietario(): boolean {
    return this.tipoUsuarioSeleccionado === 'PROPIETARIO';
  }

  esAdministrador(): boolean {
    return this.tipoUsuarioSeleccionado === 'ADMINISTRADOR';
  }

  registrarUsuario() {

    if (this.esAdministrador()) {
      this.usuarioService.registro(
        this.tipoUsuarioSeleccionado,
        this.usuarioForm.get('usuario')?.value, 
        this.usuarioForm.get('password')?.value)
      .subscribe(res => {
        this.router.navigate([`/`])
      },
        error => {
          this.toastrService.error("Error en el registro. Verifique que el usuario no se encuentre ya registrado", "Error", {closeButton: true});
        })
    }

    if (this.esPropietario()) {
      this.usuarioService.registroPropietario(
        this.tipoUsuarioSeleccionado,
        this.usuarioForm.get('usuario')?.value, 
        this.usuarioForm.get('password')?.value,
        this.usuarioForm.get('nombre')?.value,
        this.usuarioForm.get('apellidos')?.value,
        this.usuarioForm.get('tipoIdentificacion')?.value,
        this.usuarioForm.get('numeroIdentificacion')?.value,
        this.usuarioForm.get('correo')?.value,
        this.usuarioForm.get('celular')?.value
      )
      .subscribe(res => {
        this.router.navigate([`/`])
      },
        error => {
          this.toastrService.error("Error en el registro. Verifique que el usuario no se encuentre ya registrado", "Error", {closeButton: true});
        })
    }
   
  }


}
