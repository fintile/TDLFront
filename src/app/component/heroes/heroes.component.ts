import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  listHeroes: any[] = [];
  action = 'Add';
  id?: number;

form: FormGroup;

  constructor(private fb :FormBuilder, private toastr: ToastrService, private _heroService: HeroService) { 
    this.form = this.fb.group({
      heroName: ['', [Validators.required, Validators.minLength(3)]],
      realName: ['', [Validators.required, Validators.minLength(3)]],
      superPower: ['', [Validators.required, Validators.minLength(3)]]

    })
  }


  ngOnInit(): void {
    this.getHero();
  }

  getHero(){
    this._heroService.getListHeroes().subscribe(data => {
      console.log(data);
      this.listHeroes = data;
    }, error =>{
      console.log(error);
    })
  }

  saveSuperhero(){
    const hero: any = {
      heroName: this.form.get('heroName')?.value,
      realName: this.form.get('realName')?.value,
      power: this.form.get('superPower')?.value
    }

      if(this.id == undefined){
        this._heroService.saveHero(hero).subscribe(data => {
          this.toastr.success('Welcome '+ hero.heroName,'New Hero Arrived!');
          this.getHero(); 
          this.form.reset();
        }, error => {
          this.toastr.error('Oops, an error occurred','Error')
          console.log(error);
        })

      } else {
        hero.id = this.id;

        this._heroService.updateHero(this.id, hero).subscribe(data => {
          this.form.reset();
          this.action = "Add";
          this.id = undefined;
          this.toastr.info("Hero Updated!", "Update");
          this.getHero();
        }, error => {
          console.log(error)
        })
    }

    
  }

  deleteHero(id: number){
    this._heroService.deleteHeroe(id).subscribe(data => {
      this.toastr.error('Thank you for your service','Hero Left!');
      this.getHero();
    }, error =>{
      console.log(error);
    })
  }

  editHero(hero: any){
    this.action = "Edit";
    this.id = hero.id;

    this.form.patchValue({
      heroName: hero.heroName,
      realName: hero.realName,
      superPower: hero.power
    })
  }
 }
