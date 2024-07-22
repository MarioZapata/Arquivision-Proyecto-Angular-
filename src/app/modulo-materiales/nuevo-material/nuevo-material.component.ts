import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../modulo-materiales/productos-service';
import { AgregarCarritoService } from '../../modulo-materiales/agregar-carrito';
import { CarritoGetService } from '../../modulo-materiales/carrito-get-service';
import { min } from 'rxjs';

@Component({
  selector: 'app-nuevo-material',
  templateUrl: './nuevo-material.component.html',
  styleUrls: ['./nuevo-material.component.css']
})
export class NuevoMaterialComponent implements OnInit {
  Productos: any[] = [];
  ProductosFinal: any[] =[];
  Carrito: any[]=[];
  paginatedProductos: any[] = [];
  selectedMaterial: any;
  currentPage = 1;
  itemsPerPage = 5;
  pages: number[] = [];


  constructor(private producto_service: ProductosService, private carritoget_service: CarritoGetService, private carritoAgregar_service: AgregarCarritoService) {}

  ngOnInit(): void {
    console.log(Number(sessionStorage.getItem("IdUsuario")))
    this.cargarCarrito(Number(sessionStorage.getItem("IdUsuario")));
    this.cargarProductos();
   
  }

  cargarCarrito(IdUsuario: number) {
    this.carritoget_service.obtenerCarrito(IdUsuario)
      .subscribe(
        data => {
          this.Carrito = data;
          
        },
        error => {
          console.error(error);
        }
      );
  }

  cargarProductos() {
    this.producto_service.obtenerTiposConstruccion(Number(sessionStorage.getItem("IdUsuario"))).subscribe(
      data => {
        this.Productos = data;
        console.log(this.Productos)
        console.log(this.Carrito)
     
        this.calculatePages();
        this.updatePaginatedProductos();
        
      },
      error => {
        console.error(error);
      }
    );
  }

  calculatePages() {
    const totalItems = this.Productos.length;
    const totalPages = Math.ceil(totalItems / this.itemsPerPage);
    this.pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  updatePaginatedProductos() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedProductos = this.Productos.slice(start, end);
  }

  changePage(event: Event, page: number) {
    event.preventDefault();
    if (page > 0 && page <= this.pages.length) {
      this.currentPage = page;
      this.updatePaginatedProductos();
    }
  }
  agregarMaterial(i: number, costo: number, nom: string){
   
   const Carro={
    eliminado: false,
    idProducto: i,
    nombre:nom ,
    cantidad: 1,
    costoIndividual: costo,
    total: costo,
    usuarioCreo: sessionStorage.getItem("nombreUsuario"),
    idUsuario: Number(sessionStorage.getItem("IdUsuario"))
  
   };
   console.log(Carro)
   this.carritoAgregar_service.agregarAlCarrito(Carro).subscribe(
    response => {
      console.log('Carenviado exitosamente:', response);
      // Puedes agregar aquí lógica adicional como mostrar un mensaje de éxito
    },
    error => {
      console.error('Error al enviar:', error);
    }
  );


  }
}
