import { Injectable } from '@angular/core';
import { Contact } from '../../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [
    {
      id: '1234',
      name: 'Jorge Gutierrez',
      cellphone: '(664) 987 65 43',
      email: 'jgutierrez@gmail.com'
    },
    {
      id: '1236',
      name: 'Pedro Perez',
      cellphone: '(664) 123 34 56',
      email: 'pedroperez@gmail.com'
    },
  ];

  constructor() { }

  getContacts(): Promise<Contact[]> {
    return new Promise((resolve, reject) => {
      const contacts = this.contacts.sort((a, b) => {
        if (a.name < b.name ) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });

      resolve(contacts);
    });
  }

  getContact(contactId: string): Promise<Contact> {
    return new Promise((resolve, reject) => {
      const foundContact = this.contacts.find((contact: Contact) => {
        return contact.id === contactId;
      });

      if (foundContact) {
        resolve(foundContact);
      } else {
        reject(null);
      }
    });
  }

  addContact(contact: Contact): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.getContact(contact.id).then((contact: Contact) => {
        reject(new Error('Contact ID is already in use.'));
      }).catch((error) => {
        this.contacts.push(contact);
        resolve(true);
      });
    });
  }

  updateContact(contactId: string, updateContact: Contact): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const updatedContacts: Contact[] = this.contacts.map((contact: Contact) => {
        if (contact.id === contactId) {
          const newContact = {
            ...contact,
            ...updateContact
          };
          return newContact;
        }

        return contact;
      });

      this.contacts = updatedContacts;

      resolve(true);
    });
  }

  deleteContact(contactId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const remainingContacts = this.contacts.filter((contact: Contact) => {
        return contact.id !== contactId;
      });

      if (JSON.stringify(remainingContacts) !== JSON.stringify(this.contacts)) {
        this.contacts = remainingContacts;
        resolve(true);
      } else {
        reject(false);
      }
    });
  }

}
