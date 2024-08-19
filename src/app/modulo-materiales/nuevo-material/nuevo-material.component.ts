import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../modulo-materiales/productos-service';
import { min } from 'rxjs';
import { CarritoService } from '../carrito-service';
import { PedidoService } from '../pedido-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
declare const bootstrap: any;

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
  nombreEmpresa = localStorage.getItem("empresaPertenece")
  textoMensaje = ""
  total=0
  costoEn=0
  subtotal=0
  miFormulario: FormGroup;

  constructor(private fb: FormBuilder, 
    private producto_service: ProductosService,  
    private _carritoService: CarritoService, 
    private _pedidoService: PedidoService) {
      this.miFormulario = this.fb.group({
        nombrePedido: ['', Validators.required],
        metodoEnvio: ['', Validators.required],
        metodoCompra: ['', Validators.required],
        numTicket: ['', Validators.required],
  
      });

    }

  ngOnInit(): void {
    
    console.log(Number(this.idUsuario))
    this.cargarCarrito(Number(this.idUsuario));
    this.cargarProductos();
    
   
  }
  onRadioChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const selectedValue = parseFloat(input.value);
    this.costoEn=this.subtotal/100 * selectedValue;
    this.total=this.subtotal+this.costoEn
  }
  enviarProducto(id: number){
    let vto={
      idUsuario: this.idUsuario,
      idPedido: id
    }
    this.producto_service.hacerVenta(vto).subscribe(
      data => {
        Swal.fire({
          icon: 'success',
          text: '¡Se envió de manera correcta!',
          confirmButtonText: 'Cerrar'
        }).then((result) => {
          if (result.isConfirmed) {
            // Recargar la página
            location.reload();
          
          }
        });
      },
      error => {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: error.error,
          confirmButtonText: 'Cerrar'
        });
      }
    );
  }

  confirmarAccion(): void {
    if (this.miFormulario.valid) {
      console.log("Bien")
      let Pedido = {
        eliminado: false,
        nombreDelPedido: this.miFormulario.value.nombrePedido,
        empresaEncargada: this.nombreEmpresa,
        costoDeEnvio: this.costoEn,
        total: this.total,
        metodoDeEnvio: this.miFormulario.value.metodoEnvio,
        metodoDeCompra: this.miFormulario.value.metodoCompra,
        seRegresaMaterial: false,
        costoRegreso: 0,
        num_Ticket: this.miFormulario.value.numTicket,
        usuarioCreo: this.nombreUsuario,
        fechaCreacion: "1990-01-01",
      }
      console.log(Pedido)
      this._pedidoService.agregarPedido(Pedido).subscribe(
        data => {
          console.log(data)
          this.enviarProducto(data.idPedido)


        },
        error => {
          console.log(error)
          Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: error.error,
            confirmButtonText: 'Cerrar'
          });
        }
      );

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: "Favor de llenar todos los campos obligaotrios",
        confirmButtonText: 'Cerrar'
      });
      this.miFormulario.markAllAsTouched();

    }
  }
  cargarCarrito(IdUsuario: number) {
    this._carritoService.obtenerCarrito(IdUsuario)
      .subscribe(
        data => {
          this.Carrito = data;
          this.subtotal = this.Carrito.reduce((accumulator, item) => accumulator + (item.total || 0), 0);
          this.costoEn=this.subtotal/100 * 15
          this.total=this.subtotal+this.costoEn
        },
        error => {
          console.error(error);
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
        this.calculatePages();
        this.updatePaginatedProductos()
        
      },
      error => {
  
      }
    );
  }
  openModal(){
    console.log("abrir")
    const modalElement = document.getElementById('confirmationModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    } else {
      console.error("No se encontró el elemento del modal.");
    }
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
  limpiar(){
    console.log("agregar funcionalidad")
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
