export interface Pedidos {
    Pedidos: Pedido[];
}

export interface Pedido {
    IdPedido:  number;
    Fecha:     Date;
    Total:     number;
    Direccion: Direccion;
    Productos: Producto[];
}

export interface Direccion {
    DireccionID:    number;
    Calle:          string;
    Colonia:        string;
    NumeroInterior: string;
    NumeroExterior: string;
    Ciudad:         string;
    Referencias:    string;
}

export interface Producto {
    Id:       number;
    Nombre:   string;
    Cantidad: number;
    Precio:   number;
}
