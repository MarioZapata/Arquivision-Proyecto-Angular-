import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../modulo-materiales/productos-service';
import { min } from 'rxjs';
import { CarritoService } from '../carrito-service';

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
  idUsuario = localStorage.getItem("IdUsuario")
  nombreUsuario = localStorage.getItem("nombreUsuario")
  constructor(private producto_service: ProductosService,  private _carritoService: CarritoService) {}

  ngOnInit(): void {
    console.log(Number(this.idUsuario))
    this.cargarCarrito(Number(this.idUsuario));
    this.cargarProductos();
   
  }
  
  cargarCarrito(IdUsuario: number) {
    this._carritoService.obtenerCarrito(IdUsuario)
      .subscribe(
        data => {
          this.Carrito = data;          
        },
        error => {
          //console.error(error);
        }
      );
  }
  enCarrito(idProducto: number): boolean {
    return this.Carrito.some(producto => producto.idProducto === idProducto);
  }
  cargarProductos() {
    this.producto_service.obtenerTiposConstruccion(Number(sessionStorage.getItem("IdUsuario"))).subscribe(
      data => {

        this.Productos = data.filter(producto => !this.enCarrito(producto.idProducto));
        //console.log(this.Productos)    
     
        this.calculatePages();
        this.updatePaginatedProductos();

        
      },
      error => {
        //console.error(error);
      }
    );
  }
  cambiarCantidad(id:number, cantidad:number, numero: number){
    if(numero==0){

    }else{
      cantidad=cantidad+numero
      console.log("cantidad="+cantidad)
      console.log("numero="+numero)

      this._carritoService.updateCarrito(id,cantidad).subscribe(
        data => {
          location.reload()
          console.log(data)
        },
        error => {
          console.error(error);
        }
      );
    }

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
  agregarMaterial(id: number, costo: number, nom: string){
   
   const Carro={
    eliminado: false,
    idProducto: id,
    nombre:nom ,
    cantidad: 1,
    costoIndividual: costo,
    total: costo,
    usuarioCreo: this.nombreUsuario,
    idUsuario: Number(this.idUsuario)
  
   };
   console.log(Carro)
   this._carritoService.agregarAlCarrito(Carro).subscribe(
    response => {
      location.reload()
      // Puedes agregar aquí lógica adicional como mostrar un mensaje de éxito
    },
    error => {
      console.error('Error al enviar:', error);
    }
  );


  }
}
