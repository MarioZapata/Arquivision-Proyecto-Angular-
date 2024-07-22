// usuario.model.ts
export interface NuevaActividad {
    eliminado: boolean,
    idEstadoProyecto: number,
    idTipoActividad: number,
    idEstadoActividad: number,
    nombre: string,
    encargado: string,
    asignado: string,
    idPrioridad: number,
    fechaInicio: Date,
    fechaFin: Date,
    esCompraDeMateriales: boolean,
    idPedido:  null | number,
    compañia: string,
    fechaDeEntrega: Date,
    idProyecto: number,
    idDocumento: null | number,
    usuarioCreo: string;
    

  }