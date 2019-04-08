import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DespesaService } from '../despesa.service';
import { Despesa } from '../despesa';
import { Tipo } from '../tipo.enum';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  submitType: string = 'Save';
  showNew: boolean = false;
  // linha selecionda na table
  selectedRow: number;
  despesas: Despesa[];
  newDespesa: Despesa;

  tipos: string[] = ['aluguel', 'multa', 'imposto', 'conta', 'salário', 'outros'];
  @ViewChild('ComprovanteImg') ComprovanteImg;

  constructor(private _despesaService: DespesaService) { }

  ngOnInit() {
    this._despesaService.getDespesas().subscribe(res => {
      this.despesas = res;
      console.log(this.despesas);
    }, err => {
      console.log(err);
    });
  }

  onChangeTipo(tipo: string) {
    console.log(this.newDespesa.tipoDespesa);
    this.newDespesa.tipoDespesa = tipo;
  }

  // metodo ligado ao botao delete
  onDelete(despesa: Despesa, index: number) {
    // Delete the corresponding registration entry from the list.   

    this._despesaService.deleteDespesa(despesa.id).subscribe(() => {
      this.despesas.splice(index, 1);
    });

  }

  // metodo ligado ao botao new
  @ViewChild("descricao") descricaoField: ElementRef;
  onNew() {
    this.newDespesa = new Despesa();
    this.submitType = 'Save';
    this.showNew = true;
  }

  //metodo ligado ao botao de save
  onSave() {
    const Image = this.ComprovanteImg.nativeElement;
    if (Image.files && Image.files[0]) {
      this.newDespesa.comprovante = Image.files[0];
      console.log('nome do comprovante');

      console.log(this.newDespesa.comprovante.name);

    }

    if (this.submitType === 'Save') {
      this._despesaService.addDespesa(this.newDespesa).subscribe(despesa => this.despesas.push(despesa));
    } else {
      this._despesaService.updateDespesa(this.newDespesa).subscribe(() => {

        this.despesas[this.selectedRow].descricao = this.newDespesa.descricao;
        this.despesas[this.selectedRow].valor = this.newDespesa.valor;
        this.despesas[this.selectedRow].data = this.newDespesa.data;
        this.despesas[this.selectedRow].tipoDespesa = this.newDespesa.tipoDespesa;
      });
    }
    // esconde seçao de registro.
    this.showNew = false;
  }

  //metodo ligado ao botao de cancelar
  onCancel() {
    // esconde seçao de registro.
    this.showNew = false;
  }


  onEdit(index: number) {
    // Atualizar linha selecionada
    this.selectedRow = index;

    this.newDespesa = new Despesa();
    //clonar
    this.newDespesa = Object.assign({}, this.despesas[this.selectedRow]);

    this.submitType = 'Update';

    this.showNew = true;
  }
}
