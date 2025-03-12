export interface Turno {
    inicio: Date;
    fin: Date;
    tipo: 'inicio' | 'cambio' | 'fin' | 'normal';
}