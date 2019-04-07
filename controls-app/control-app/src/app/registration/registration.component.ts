import { Component, OnInit } from '@angular/core';
import { DespesaService } from '../despesa.service';
import { Despesa } from '../despesa';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  isLoadingResults = true;
  despesas: Despesa[];

  constructor(private _despesaService: DespesaService) { }

  ngOnInit() {
    this._despesaService.getDespesas().subscribe(res => {
      this.despesas = res;
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  // metodo ligado ao botao delete
  onDelete(despesa: Despesa,index: number) {
    // Delete the corresponding registration entry from the list.   
    
    this._despesaService.deleteDespesa(despesa.id).subscribe(() =>
    {         
      this.despesas.splice(index,1);
    });
    
  }


}
