import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { ActivatedRoute, RouteConfigLoadStart, Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settingForm: FormGroup;
  settingForm2: FormGroup;
  submitted = false;
  loading=false;
  loadingAdd=false;
  existingCategory:any;
  expendCategoryArray:any=[];
  tmpTotalBudget:any=0;
  constructor(private route: ActivatedRoute, 
    private router: Router,
    private formBuilder: FormBuilder,) { }

  ngOnInit() {
    //localStorage.setItem('expenseCategory','');
    if(localStorage.getItem('expenseTotalBudget')){
      this.tmpTotalBudget=localStorage.getItem('expenseTotalBudget');
    }
    this.settingForm = this.formBuilder.group({
      totalBudgetVal: [this.tmpTotalBudget]
    })
    this.settingForm2 = this.formBuilder.group({
      categoryName: ['']
    })
  }
  get f() { return this.settingForm.controls; }
  get f1() { return this.settingForm2.controls; }

  updateTotalBudget(){
    const totalBudgetVal=this.settingForm.value.totalBudgetVal;
    if(totalBudgetVal!='' && typeof totalBudgetVal!="undefined"){
      localStorage.setItem('expenseTotalBudget',totalBudgetVal);
      alert('Total budget updated successfully!');
    }
  }

  addCategory(){
    const categoryN=this.settingForm2.value.categoryName;
    if(typeof categoryN==="undefined" || categoryN==''){
      alert("Kindly update total budget value");
    }else{
      if(localStorage.getItem('expenseCategory')){
        this.existingCategory = JSON.parse(localStorage.getItem('expenseCategory'));
        
        for(var i=0;i<this.existingCategory.length;i++){
          if(this.expendCategoryArray.indexOf(this.existingCategory[i])<0){
            this.expendCategoryArray.push(this.existingCategory[i]);
          }
        }
      }
      if(this.expendCategoryArray.indexOf(categoryN)<0){
        this.expendCategoryArray.push(categoryN);
      }
    localStorage.setItem('expenseCategory',JSON.stringify(this.expendCategoryArray));
    alert("Category added successfully!");
    }
  }

}
