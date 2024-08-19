import { Component } from '@angular/core';
import { ProductosService } from '../productos-service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ver-pedido',
  templateUrl: './ver-pedido.component.html',
  styleUrl: './ver-pedido.component.css'
})
export class VerPedidoComponent {
  ProductosVentas: any[]=[]

  nombreEmpresa = localStorage.getItem("empresaPertenece")
  Pedidos: any[] = []
  currentPage = 1;
  itemsPerPage = 5;
  pages: number[] = [];
  paginatedProductos: any[] = [];
  idPedido: any;
  tengoProducto: boolean = false
  txtTitulo: string = "Productos Comprados"
  constructor(private _productoService: ProductosService, private route: ActivatedRoute,){
    this.idPedido = this.route.snapshot.paramMap.get('id') ? +this.route.snapshot.paramMap.get('id')! : null;
    console.log(this.idPedido)
    this.cargarProductosVentas(this.idPedido);
  }
  cargarProductosVentas(id: number){
    this._productoService.obtenerPedidoByPedido(id).subscribe(
      data => {
        console.log(data)
        this.ProductosVentas=data
        if(data==null){
          this.tengoProducto = true
          this.txtTitulo = "No se tiene ningun producto en este pedido"
        }
        this.ProductosVentas.sort((a, b) => a.idProductoVenta - b.idProductoVenta);
    
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
  calculatePages() {
    const totalItems = this.ProductosVentas.length;
    const totalPages = Math.ceil(totalItems / this.itemsPerPage);
    this.pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  updatePaginatedProyectos() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedProductos = this.ProductosVentas.slice(start, end);
  }

  changePage(event: Event, page: number) {
    event.preventDefault();
    if (page > 0 && page <= this.pages.length) {
      this.currentPage = page;
      this.updatePaginatedProyectos();
    }
  }
}
