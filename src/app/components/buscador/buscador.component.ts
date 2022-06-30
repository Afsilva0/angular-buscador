import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { BANKS } from '../../data/banks';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css'],
})
export class BuscadorComponent implements OnInit {
  banks = BANKS.banks;

  form: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.builder();
  }

  builder() {
    this.form = this.formBuilder.group({
      banco: ['', []],
      buscador: ['', []],
    });

    this.cambiarBuscador();
  }

  get buscador(): AbstractControl {
    return this.form.get('buscador');
  }
  get banco(): AbstractControl {
    return this.form.get('banco');
  }

  cambiarBuscador() {
    this.buscador.valueChanges.subscribe((value) => {
      // get the search keyword
      let search = value;
      if (!search) {
        this.banks = BANKS.banks;
        return;
      } else {
        search = search.toLowerCase();
      }
      // filter the banks

      this.banks = this.banks.filter(
        (bank) => bank.name.toLowerCase().indexOf(search) > -1
      );
    });
  }

  siguiente() {
    console.log(this.form.value);
  }
}
