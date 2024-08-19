import { Component, OnInit } from '@angular/core';
import { PedidoService } from './pedido-service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modulo-materiales',
  templateUrl: './modulo-materiales.component.html',
  styleUrl: './modulo-materiales.component.css'
})
export class ModuloMaterialesComponent implements OnInit {
  filaExpandida: boolean = false;
  nombreEmpresa = localStorage.getItem("empresaPertenece")
  Pedidos: any[] = []
  empresa = localStorage.getItem('empresaPertenece');
  currentPage = 1;
  itemsPerPage = 5;
  pages: number[] = [];
  paginatedPedidos: any[] = [];
 
  constructor(private _pedidoService : PedidoService,
    private router: Router,
  ){}
  ngOnInit() {
    this.cargarPedidos();
    
  }
  eliminarPedidoConfirmacion(id: number){
   this._pedidoService.deletePedido(id).subscribe(
    data => {
      console.log(data)
      Swal.fire({
        icon: 'success',
        text: 'Pedido eliminado exitosamente!',
        confirmButtonText: 'Cerrar'
      }).then(() => {
        location.reload()
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
  eliminarPedido(id: number){
    this._pedidoService.validarDelete(id).subscribe(
      data => {
        console.log(data)
        if(data.length==0){
          Swal.fire({
            title: '¿Estás seguro de eliminar?',
            text: "¡Esta acción no se puede deshacer!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
              // Aquí puedes agregar la lógica para eliminar el pedido
              //console.log("Pedido eliminado");
              this.eliminarPedidoConfirmacion(id);
            }
          });
        }else{
          Swal.fire({
            title: '¿Estás seguro de eliminar?',
            text: "Este pedido tiene actividades relacionadas. ¿Seguro de eliminar?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
              // Aquí puedes agregar la lógica para eliminar el pedido con actividades relacionadas
              this.eliminarPedidoConfirmacion(id);


            }
          });
        }
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
  verPedido(idPedido: number){
    this.router.navigate(['/ver-pedido', idPedido]);
    
  }
  
  cargarPedidos(){
    this._pedidoService.obtenerTiposConstruccion(this.nombreEmpresa!).subscribe(
      data => {
        console.log(data)
        this.Pedidos=data
 
        this.Pedidos.sort((a, b) => a.idPedido - b.idPedido);
    
        this.calculatePages();
        this.updatePaginatedProyectos()
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
  alternarExpansion() {
    this.filaExpandida = !this.filaExpandida;
  }
  
  calculatePages() {
    const totalItems = this.Pedidos.length;
    const totalPages = Math.ceil(totalItems / this.itemsPerPage);
    this.pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  updatePaginatedProyectos() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedPedidos = this.Pedidos.slice(start, end);
  }

  changePage(event: Event, page: number) {
    event.preventDefault();
    if (page > 0 && page <= this.pages.length) {
      this.currentPage = page;
      this.updatePaginatedProyectos();
    }
  }

}
