import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/contact';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-contact-list',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './contact-list.component.html',
    styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
    contacts: Contact[] = [];

    constructor(private contactService: ContactService) { }

    ngOnInit(): void {
        this.contactService.getContacts().subscribe((data: Contact[]) => {
            this.contacts = data;
            console.log('ContactListComponent загружен');
            console.log(data);
        });
    }

    deleteContact(id: string): void {
        this.contactService.deleteContact(id).subscribe(() => {
            this.contacts = this.contacts.filter(contact => contact._id !== id);
        });
    }

    contact: Contact = {
        name: '',
        email: '',
        phone: {
            mobile: '',
            work: ''
        }
    };

    selectedContact: Contact | null = null;

    onSubmit(): void {
        if (this.selectedContact) {
            this.contactService.updateContact(this.contact).subscribe(updatedContact => {
                const index = this.contacts.findIndex(c => c._id === updatedContact._id);
                this.contacts[index] = updatedContact;
                this.clearForm();
            });
        } else {
            this.contactService.createContact(this.contact).subscribe(newContact => {
                this.contacts.push(newContact);
                this.clearForm();
            });
        }
    }

    editContact(contact: Contact): void {
        this.selectedContact = contact;
        this.contact = { ...contact };  // Клонируем данные для редактирования
    }

    clearForm(): void {
        this.selectedContact = null;
        this.contact = { name: '', email: '', phone: { mobile: '', work: '' } };
    }

}
