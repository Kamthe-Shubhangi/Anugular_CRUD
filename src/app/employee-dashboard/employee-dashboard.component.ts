import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeModel } from './employee-dashboard.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent implements OnInit {
  formvalue: FormGroup;

  employeeModelobj: EmployeeModel = new EmployeeModel();
  empdata: any;

  constructor(private FormBuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formvalue = this.FormBuilder.group({
      firstname: [''],
      lastname: [''],
      email: [''],
    });
    this.getAllEmployee();
  }

  postEmployeeDetails() {
   
    this.employeeModelobj.firstname = this.formvalue.value.firstname;
    this.employeeModelobj.lastname = this.formvalue.value.lastname;
    this.employeeModelobj.email = this.formvalue.value.email;

    this.api.postEmployee(this.employeeModelobj)
    .subscribe({
      next: (res) => {
        let ref=document.getElementById('cancel');
        ref?.click();
        this.formvalue.reset();
        this.getAllEmployee();
      },
      error: () => {
        alert('wrong');
      },
    });
  }

  getAllEmployee() {
    this.api.getEmployee().subscribe({
      next: (res) => {
        this.empdata = res;
      },
      error: () => {
        alert('wrong');
      },
    });
  }

  deleteEmployee(row: any) {
    this.api.deleteEmployee(row.id)
    .subscribe({
      next: (res) => {
        
        this.getAllEmployee();
      },
      error: () => {
        alert('wrong');
      },
    });
  }

  onEdit(row:any)
  {
    this.employeeModelobj.id=row.id;
    this.formvalue.controls['firstname'].setValue(row.firstname);
    this.formvalue.controls['lastname'].setValue(row.lastname);
    this.formvalue.controls['email'].setValue(row.email);

   
  }

  update()
  {
    this.employeeModelobj.firstname = this.formvalue.value.firstname;
    this.employeeModelobj.lastname = this.formvalue.value.lastname;
    this.employeeModelobj.email = this.formvalue.value.email;

    this.api.updateEmployee(this.employeeModelobj,this.employeeModelobj.id)

    .subscribe({
      next: (res) => {

        let ref=document.getElementById('cancel');
        ref?.click();
        this.formvalue.reset();
        this.getAllEmployee();
      },
      error: () => {
        alert('wrong');
      },
    });
  }
}
