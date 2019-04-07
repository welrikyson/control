import { Component, OnInit } from '@angular/core';
import { DespesaService } from '../despesa.service';
import { Despesa } from '../despesa';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  submitType: string = 'Save';
  showNew : boolean = false;
  // linha selecionda na table
  selectedRow: number;
  despesas: Despesa[];
  newDespesa: Despesa;

  constructor(private _despesaService: DespesaService) { }

  ngOnInit() {
    this._despesaService.getDespesas().subscribe(res => {
      this.despesas = res;
      console.log(this.despesas);           
    }, err => {
      console.log(err);      
    });
  }

  // metodo ligado ao botao delete
  onDelete(despesa: Despesa, index: number) {
    // Delete the corresponding registration entry from the list.   

    this._despesaService.deleteDespesa(despesa.id).subscribe(() => {
      this.despesas.splice(index, 1);
    });

  }

  // metodo ligado ao botao new
  onNew() {    
    this.newDespesa = new Despesa();    
    this.submitType = 'Save';    
    this.showNew = true;
  }

  //metodo ligado ao botao de save
  onSave(){
    if(this.submitType === 'Save'){
      this._despesaService.addDespesa(this.newDespesa).subscribe(despesa => this.despesas.push(despesa));      
    }else{
      this._despesaService.updateDespesa(this.newDespesa).subscribe(()=>{

        this.despesas[this.selectedRow].descricao = this.newDespesa.descricao;
        this.despesas[this.selectedRow].valor = this.newDespesa.valor;
        this.despesas[this.selectedRow].data = this.newDespesa.data;      
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
