 export interface Personal {
    id_personal: number;
    nombre_personal: string;
    apellido1_personal: string;
    apellido2_personal: string | null;
    alias_personal: string;
    ocupacion_personal: string;
    tfno1_personal: string | null;
    tfno2_personal: string | null;
    ext_personal: string | null;
    departamento_personal: string;
    dfa_personal: boolean | null;
    activo: boolean;
    id_campania_personal: number;
  }
  