import { LightningElement, track, wire } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getRecord } from 'lightning/uiRecordApi';
import USER_ID from '@salesforce/user/Id';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import RENTAL_PROPERTY_FIELD from '@salesforce/schema/Contact.Rental_Property__c';
import isGuest from '@salesforce/user/isGuest';

const FIELDS = ['User.Contact.Rental_Property__c'];

export default class AddFamilyMember extends LightningElement {
    @track firstName = '';
    @track lastName = '';
    @track email = '';
    @track phone = '';
    @track rentalProperty = '';
    @track isFormVisible = true;
    @track isConfirmationVisible = false;
    isSubmitDisabled = false;
    isGuest = isGuest;

    get showForm() {
        return this.isFormVisible && !this.isGuest;
    }

    get showConfirmation() {
        return this.isConfirmationVisible && !this.isGuest;
    }

    @wire(getRecord, { recordId: USER_ID, fields: FIELDS })
    userRecord({ error, data }) {
        if (data) {
            console.log('User data:', data);
            const contact = data.fields.Contact.value;
            if (contact && contact.fields && contact.fields.Rental_Property__c) {
                this.rentalProperty = contact.fields.Rental_Property__c.value || '';
                console.log('Retrieved Rental Property ID:', this.rentalProperty);
            } else {
                console.error('Rental Property ID not found in user data.');
                this.showToast('Error', 'Rental Property ID not found in user data.', 'error');
            }
        } else if (error) {
            console.error('Error retrieving user record:', error);
            this.showToast('Error', error.body.message, 'error');
        }
    }

    handleInputChange(event) {
        const field = event.target.dataset.id;
        if (field === 'firstName') {
            this.firstName = event.target.value;
        } else if (field === 'lastName') {
            this.lastName = event.target.value;
        } else if (field === 'email') {
            this.email = event.target.value;
        } else if (field === 'phone') {
            this.phone = event.target.value;
        }
    }

    handleSubmit() {
        if (this.isSubmitDisabled) {
            return;
        }

        this.isSubmitDisabled = true;
        this.isFormVisible = false;

        const fields = {};
        fields[FIRSTNAME_FIELD.fieldApiName] = this.firstName;
        fields[LASTNAME_FIELD.fieldApiName] = this.lastName;
        fields[EMAIL_FIELD.fieldApiName] = this.email;
        fields[PHONE_FIELD.fieldApiName] = this.phone;
        fields[RENTAL_PROPERTY_FIELD.fieldApiName] = this.rentalProperty;

        console.log('Creating record with fields:', fields);

        const recordInput = { apiName: CONTACT_OBJECT.objectApiName, fields };

        createRecord(recordInput)
            .then((contact) => {
                console.log('Record created successfully:', contact);
                this.showToast('Success', 'Family member added successfully!', 'success');
                this.isConfirmationVisible = true;
                console.log('Created Contact ID:', contact.id);
            })
            .catch(error => {
                console.error('Error creating record:', error);
                console.log('Error details:', JSON.stringify(error));
                this.showToast('Error creating record', error.body.message, 'error');
                this.isSubmitDisabled = false;
                this.isFormVisible = true;
            });
    }

    showToast(title, message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({
                title,
                message,
                variant
            })
        );
    }
}
