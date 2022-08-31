import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobModel } from '../job.model';
import { JobService } from '../job.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2'
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { SkillService } from '../skill.service';

@Component({
  selector: 'app-job-post',
  templateUrl: './job-post.component.html',
  styleUrls: ['./job-post.component.css']
})
export class JobPostComponent implements OnInit {
  i: number = 0;
  selItems: Array<object> = [];
  addJob = new JobModel('','','','','',this.selItems,'',null!,null!);
  constructor(private jobService: JobService, private skillService: SkillService, private router: Router) { }
  dropdownList: Array<Object> = [];
  selectedItems: Array<object> = [];
  
  dropdownSettings:IDropdownSettings={};
 
  ngOnInit(): void {
    // Getting skills for the dropdown from the skills collection
    this.skillService.getSkill()
        .subscribe(
          (res:any) =>{
            this.dropdownList =JSON.parse(JSON.stringify(res));
          });
          

    console.log("dropdown is",this.dropdownList);
    
    this.dropdownSettings  = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      // limitSelection: 5,
      allowSearchFilter: true
    };
    
  }
  // onItemSelect(item: any) {
  //   console.log("onselect",item);
  //   // this.selItems.push(item); 

  //   // this.addJob.skills = item;
  //   // this.addJob.skills.push(item)
  // }
  // onSelectAll(items: any) {
  //   console.log("onselectall",items);
  //   this.addJob.skills = items;
  // }
  
AddJob(){
    // for ( let i=0; i< this.selectedItems.length; i++){
    //   this.selItems = this.selectedItems;
    // }

    this.addJob.skills = this.selectedItems;
    console.log ("To insert in job",this.addJob)
    console.log("selitems",this.selItems)
    this.jobService.newJobs(this.addJob)
    // .subscribe(
    //   (res:any) => {  
    //     alert("res.message")
    //   })
    this.router.navigate(['employer/dashboard']);
    alert ("success")
}
}
