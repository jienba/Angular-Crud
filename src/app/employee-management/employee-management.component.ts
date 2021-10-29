import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import {EmployeeModel} from './employee.model';
import {ApiService} from '../shared/api.service';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.css']
})
export class EmployeeManagementComponent implements OnInit {

  formValue !: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: [''],
    });
    this.getAllEmployees();
  }


  clickOnEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postEmployeeDetails(){
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;
    this.employeeModelObj.firstName = this.formValue.value.firstName;

    this.api.postEmployee(this.employeeModelObj)
      .subscribe(value => {
        console.log(value);
        alert('Employé(e) ajouté(e) avec succés!');
        this.formValue.reset();
        const ref = document.getElementById('cancel');
        ref?.click();
        this.getAllEmployees();
      },
        error => {
        alert('Echec lors de l ajout');
        });
  }

  getAllEmployees(){
    this.api.getEmployee()
      .subscribe(res => {
        this.employeeData = res;
      });
  }

  deleteEmployee(row: any){
    this.api.deleteEmployee(row.id)
      .subscribe(res => {
        alert('Employé(e) supprimé(e)');
        this.getAllEmployees();
      });

  }

  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.id = row.id;
    this.formValue.controls.firstName.setValue(row.firstName);
    this.formValue.controls.lastName.setValue(row.lastName);
    this.formValue.controls.email.setValue(row.email);
    this.formValue.controls.mobile.setValue(row.mobile);
    this.formValue.controls.salary.setValue(row.salary);
  }

  updateEmployeeDetails() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.api.updateEmployee(this.employeeModelObj, this.employeeModelObj.id)
      .subscribe(res =>{
        alert('Mise à jour effectuée!');
        this.formValue.reset();
        const ref = document.getElementById('cancel');
        ref?.click();
        this.getAllEmployees();
      });
  }

}
