export class Mantenimiento {

    id_propiedad: number;
    id_usuario: number;
    id: number;
    costo: number;
    tipo_mantenimiento: string;
    periodicidad: string
    estado: boolean;

    public constructor(id: number, costo: number, id_propiedad: number, tipo_mantenimiento: string, estado: boolean, periodicidad: string, id_usuario: number) {
            this.id = id;
            this.costo = costo;
            this.id_propiedad = id_propiedad;
            this.tipo_mantenimiento = tipo_mantenimiento;
            this.estado = estado;
            this.periodicidad = periodicidad;
            this.id_usuario = id_usuario;
        }
}
