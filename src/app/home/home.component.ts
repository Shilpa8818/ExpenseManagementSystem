import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouteConfigLoadStart, Router } from '@angular/router';
import {NgbPagination} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  existingData:any;
  page = 0;
  pageSize = 2;
  collectionSize=0;
  totalBudget:any=0;
  percentageUsages:any;
  total:number=0;
  uniqueItemList:any;
  tmp = [];

  
  constructor(private route: ActivatedRoute, 
              private router: Router) { }

  ngOnInit() {
    //localStorage.setItem('expenseData','')
    
    if(localStorage.getItem('expenseTotalBudget')){
      this.totalBudget=localStorage.getItem('expenseTotalBudget');
    }else{
      this.totalBudget=0;
    }
    if(localStorage.getItem('expenseData')){
      this.existingData=[];
      this.existingData = JSON.parse(localStorage.getItem('expenseData'));
      this.collectionSize=this.existingData.length;
      for(var a=0;a<this.existingData.length;a++){
        this.total+=parseInt(this.existingData[a].amount);
      }
      this.percentageUsages=(this.total/this.totalBudget)*100;
     }
  }
  
  public pieChartLabels:string[] = ['Chrome', 'Safari', 'Firefox','Internet Explorer','Other'];
  public pieChartData:number[] = [40, 20, 20 , 10,10];
  public pieChartType:string = 'pie';
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
  addNewExpense(){
    this.router.navigateByUrl('/addexpense');
  }
  get expenceData(): any{
    return this.existingData
      .map((exp, i) => ({id: i + 1, ...exp}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

}
