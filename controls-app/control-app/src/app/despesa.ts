import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { Tipo } from './tipo.enum';
export class Despesa {
    constructor(
        public id?: number,
        public descricao: string = '',
        public valor: number = 0,
        public data: Date = new Date(),
        public comprovante?: File,
        public tipoDespesa?: Tipo
    ) { }
}
