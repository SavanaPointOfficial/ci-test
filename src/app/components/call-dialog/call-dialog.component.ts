import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DialogData } from '../dialog/dialog.component';


@Component({
  selector: 'app-call-dialog',
  templateUrl: './call-dialog.component.html',
  styleUrls: ['./call-dialog.component.scss']
})
export class CallDialogComponent implements OnInit {
  public uploadCvForm!: FormGroup;
  public selectedFile!: any;
  preloder: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<CallDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private forB: FormBuilder,
    private http: HttpClient,
    private afs: AngularFirestore,
    private toastr: ToastrService
  ) { }

  async onNoClick() {
    await this.onUpload()

   await this.dialogRef.close();
  }



  ngOnInit() {
    this.uploadCvForm = this.forB.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      file: ['', Validators.required]
    })
  }


  onFileChanged(event:any) {
    this.selectedFile = event.target.files[0];
  }


 async onUpload() {
    this.preloder = true;
     
    const uploadData = new FormData();
    uploadData.append('doc_file', this.selectedFile, this.selectedFile.name);
   
   this.http.post('https://sp-upload-docfiles-api-v1.herokuapp.com/api/user/update-user/upload', uploadData)
   .subscribe(async(data:any) => {
     try {
    await  this.afs.collection('masterwinner-iscomming')
      .add({
        cvURL: data.doc_file.secure_url,
        first_name: this.uploadCvForm.value.first_name,
        last_name: this.uploadCvForm.value.last_name,
        email: this.uploadCvForm.value.email,
        phone: this.uploadCvForm.value.phone
      })
       await this.toastr.success("Seu CV foi enviado com sucesso!", "Ola Winner!")
     } catch (error) {
       this.toastr.error("Algo deu errado, por favor tente de novo!", "Ola Winner!")
       
     }
   })
       return  this.preloder = await false;


}

}
