import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { Router } from '@angular/router';

declare let $: any;

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.sass']
})
export class AddContactComponent implements OnInit {
  error: string;
  form = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    cellphone: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required)
  });

  constructor(private contactService: ContactService,
              private router: Router) { }

  ngOnInit() {
    $('.modal').modal();
  }

  addContact() {
    if (this.form.valid) {
      const newContact = {
        id: this.form.controls.id.value,
        name: this.form.controls.name.value,
        cellphone: this.form.controls.cellphone.value,
        email: this.form.controls.email.value
      };

      this.contactService.addContact(newContact).then((result) => {
        this.showAddModal();
      }).catch((error) => {
        this.showErrorModal(error.message);
      });
    } else {
      this.showErrorModal('Please fill in all the fields of the form.');
    }
  }

  showErrorModal(error: string) {
    this.error = error;
    $('#errorModal').modal('open');
  }

  showAddModal() {
    $('#addConfirmationModal').modal('open');
  }

  goToHome(): void {
    $('#addConfirmationModal').modal('close');
    this.router.navigate(['']);
  }
}
