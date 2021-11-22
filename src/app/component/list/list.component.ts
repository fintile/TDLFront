import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ListService } from 'src/app/services/list.service';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  list: any[] = [];
  id?: number;
  btnStatus: string = "Add"

form: FormGroup;

  constructor(private fb :FormBuilder, private toastr: ToastrService, private _listService: ListService) { 
    this.form = this.fb.group({
      itemName: ['', [Validators.required, Validators.minLength(3)]],
    })
  }


  ngOnInit(): void {
    this.getItems();
  }

  getItems(){
    this._listService.getList().subscribe(data => {
      this.list = data;
    }, error =>{
      console.log(error);
    })
  }

  saveItem(){
    const item: any = {
      item: this.form.get('itemName')?.value,
    }
      this.btnStatus = "Add"
      if(this.id == undefined){
        this._listService.saveItem(item).subscribe(data => {
          this.toastr.success('Item Added');
          this.getItems(); 
          this.form.reset();
        }, error => {
          this.toastr.error('Oops, an error occurred','Error')
          console.log(error);
        })

      } else {
        item.id = this.id;

        this._listService.updateItem(this.id, item).subscribe(data => {
          this.form.reset();
          this.id = undefined;
          this.toastr.info("Item Updated");
          this.getItems();
        }, error => {
          console.log(error)
        })

    }

    
  }

  deleteItem(id: number){
    this._listService.deleteItem(id).subscribe(data => {
      this.toastr.error('Item Deleted');
      this.getItems();
    }, error =>{
      console.log(error);
    })
  }

  editItem(item: any){

    this.btnStatus = "Save"
    this.id = item.id;

    this.form.patchValue({
      itemName: item.item,
    })
  }
}
  
