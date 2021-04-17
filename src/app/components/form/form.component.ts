import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  public newsLetter!: FormGroup;
  constructor(
    private forB: FormBuilder,
    private afs: AngularFirestore,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.newsLetter = this.forB.group({

      email: ['', Validators.required],

    })
  }
  async sendNewsletter() {
    const email = this.newsLetter.value.email;
   try {
    await this.afs.collection('masterwinner-newsletter')
    .add({
    email
    })
    await this.toastr.success("Seu email foi enviado com sucesso!", "Ola Winner!")
     } catch (error) {
       this.toastr.error("Algo deu errado, por favor tente de novo!", "Ola Winner!")

   }
  }

}
