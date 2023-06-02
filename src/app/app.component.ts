import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Services } from 'src/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private api: Services) { }
  page = 1;
  pageSize = 5;
  allData: any = []
  listData: any = []
  showModalBox: boolean = false;
  playerId: number | undefined = undefined;
  totalCalculado: number = 0;

  formGroup: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    cups: new FormControl('', Validators.required),
    team: new FormControl('', [Validators.required]),
    position: new FormControl('', Validators.required),
    birthdate: new FormControl('', Validators.required),
  })

  ngOnInit() {
    this.getData();
  }

  nextPage() {
    this.page = this.page + 1;
    this.refreshList()
  }
  previousPage() {
    if (this.page != 1) {
      this.page = this.page - 1;
      this.refreshList()
    }
  }

  calculate() {
    this.api.calculate().subscribe((value: any) => {
      this.totalCalculado = value;
    })
  }

  refreshList() {
    const result = this.allData.map((data: any) => (data)).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize,
    );
    if (result.length == 0) {
      this.page = this.page - 1;
    } else {
      this.listData = result;
    }
  }

  editData(data: any) {
    this.playerId = data.id;
    this.formGroup.setValue({
      name: data.name,
      cups: data.cups,
      team: data.team,
      position: data.position,
      birthdate: data.birthdate
    })
  }

  getData() {
    this.api.get().subscribe((res) => {
      if (res.length > 0) {
        this.allData = res;
        this.refreshList()
      };
    })
  }

  deleteData(id: any) {
    this.api.delete(id).subscribe(() => this.getData())
  }

  submitAdd() {
    if (this.formGroup.valid) {
      this.api.post(this.formGroup.value).subscribe(() => this.getData())
    }
  }

  submitEdit() {
    if (this.formGroup.valid) {
      if (this.playerId) this.api.put(this.formGroup.value, this.playerId).subscribe(() => this.getData())
    }
  }
}
