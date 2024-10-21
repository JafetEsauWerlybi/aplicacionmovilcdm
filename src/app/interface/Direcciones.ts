export interface Direcciones {
    DireccionID:    number;
    Calle:          string;
    Colonia:        string;
    NumeroInterior: null | string;
    NumeroExterior: string;
    CP:             string;
    Estado:         Estado;
    Ciudad:         Ciudad;
    Referencias:    string;
    Lat:            null;
    Long:           null;
    UsuarioID:      null;
}

export enum Ciudad {
    Huejutla = "Huejutla",
    HuejutlaDeReyes = "Huejutla de Reyes",
    PlatónSánchez = "Platón Sánchez",
}

export enum Estado {
    Hgo = "Hgo.",
    Hidalgo = "Hidalgo",
    Ver = "Ver.",
}
