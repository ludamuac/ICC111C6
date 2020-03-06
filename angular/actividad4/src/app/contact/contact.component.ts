import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../services/contact.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare let $: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})
export class ContactComponent implements OnInit {
  error: string;
  contact: Contact;
  contactForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private contactService: ContactService) { }

  ngOnInit() {
    $('.modal').modal();
    this.initForm();

    const contactId = this.activatedRoute.snapshot.paramMap.get('contactId');
    this.getContact(contactId);
  }

  getContact(contactId: string): void {
    this.contactService.getContact(contactId).then((contact: Contact) => {
      this.contact = contact;
      this.contactForm.patchValue(this.contact);
    }).catch((error) => {
      this.router.navigate(['']);
    });
  }

  initForm(): void {
    this.contactForm  = new FormGroup({
      name: new FormControl({value: '', disabled: true}, Validators.required),
      cellphone: new FormControl({value: '', disabled: true}, Validators.required),
      email: new FormControl({value: '', disabled: true}, Validators.required),
    });
  }

  toggleEdit(): void {
    if (this.contactForm.enabled)  {
      this.contactForm.disable();
    } else {
      this.contactForm.enable();
    }
  }

  update(): void {
    if (this.contactForm.enabled && this.contactForm.valid) {
      const newContact: Contact = {
        id: this.contact.id,
        name: this.contactForm.controls.name.value,
        cellphone: this.contactForm.controls.cellphone.value,
        email: this.contactForm.controls.email.value
      };

      this.contactService.updateContact(this.contact.id, newContact).then(() => {
        this.contact = newContact;
        this.toggleEdit();
        this.showUpdateConfirmationModal();
      });
    } else {
      this.showErrorModal('Please fill in all the fields of the form.');
    }
  }

  showUpdateConfirmationModal(): void {
    $('#updateConfirmationModal').modal('open');
  }

  showDeleteConfirmationModal(): void {
    $('#deleteConfirmationModal').modal('open');
  }

  deleteContact() {
    this.contactService.deleteContact(this.contact.id).then((result) => {
      this.router.navigate(['']);
    })
    .catch((error) => {
      this.showErrorModal(error.message);
    });
  }

  showErrorModal(error: string) {
    this.error = error;
    $('#errorModal').modal('open');
  }
}
