import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})

export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  totalElements: number = 0; // Total de registros
  totalPages: number = 0;   // Total de páginas
  sortField: string = ''; // Campo de ordenación seleccionado
  sortDirection: string = ''; // Dirección de ordenación ('asc' o 'desc')
  pageSize: number = 0;

  constructor(public clienteService: ClienteService) {}

  ngOnInit(): void {
    this.getClientes();
  }

  // Se recuperan parámetros a enviar al servicio, por default están en '0', 
  // será la api quien defina cuantos registros nos retorna por default 
  getClientes(page: number = 0, size: number = 0): void {
    // Construir el parámetro de ordenación
    const sort = this.sortField ? `${this.sortField},${this.sortDirection}` : '';
  
    // Usamos el tamaño de página actual
    size = this.pageSize;
  
    this.clienteService.getClientes(page, size, sort).subscribe(
      (response: any) => {
        this.clientes = response.clientes;
        this.totalElements = response.totalElements;
        this.totalPages = response.totalPages;
  
        console.log(this.clientes);
        console.log("Total Registros: "+this.totalElements);
        console.log("Total de páginas: " + this.totalPages);
      },
      (error) => {
        // Manejo de errores
        console.error(error);
      }
    );
  }
  

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize; // Guarda el tamaño de página seleccionado
    const page = event.pageIndex; // Número de página seleccionada
    const size = event.pageSize; // Tamaño de página seleccionado
  
    this.getClientes(page, size);
  }
  

  onSortChange(field: string): void {
    // Cambiar la dirección de ordenación si se selecciona el mismo campo
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc'; // Establecer la dirección de ordenación inicial
    }

    this.getClientes(); // Volver a obtener los clientes con la nueva ordenación
  }
}
