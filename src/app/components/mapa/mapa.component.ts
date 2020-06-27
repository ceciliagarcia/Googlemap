import { Component, OnInit } from '@angular/core';
import { Marcador } from 'src/app/classes/marcador.class';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MapaEditarComponent } from './mapa-editar.component';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  marcadores: Marcador [] = [];

  lat = 40.4165001;
  lng = -3.7025599;

  constructor(public snackBar: MatSnackBar, public dialog: MatDialog ) {
   if ( localStorage.getItem('marcadores')) {
     this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
   }
  }

  ngOnInit() {
  }

  agregarMarcador( evento ) {

    const coords: {lat: number, lng: number} = evento.coords;
    console.log(evento.coords.lat);
    const nuevoMarcador = new Marcador ( coords.lat, coords.lng);
    this.marcadores.push(nuevoMarcador);

    this.guardarStorage();
    this.snackBar.open('Marcador agregado', 'Cerrar');
  }

  guardarStorage() {
    localStorage.setItem('marcadores', JSON.stringify(this.marcadores));
  }

  borrarMarcador(i: number) {
    this.marcadores.splice(i, 1);
    this.guardarStorage();
    this.snackBar.open('Marcador Borrado', 'Cerrar');
    console.log(i);

  }
  editarMarcador( marcador: Marcador) {

      const dialogRef = this.dialog.open(MapaEditarComponent, {
        width: '250px',
        data: {titulo: marcador.titulo, desc: marcador.desc}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        
        if ( !result){
          return;
        }
        marcador.titulo = result.titulo;
        marcador.desc = result.desc;

        this.guardarStorage();
        this.snackBar.open('Marcador actualizado', 'Cerrar');
      });

  }


  }


