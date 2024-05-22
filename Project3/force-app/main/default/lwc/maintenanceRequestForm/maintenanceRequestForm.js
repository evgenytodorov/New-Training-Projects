import { LightningElement, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import submitMaintenanceRequest from '@salesforce/apex/MaintenanceRequestController.submitMaintenanceRequest';
import { getRecord } from 'lightning/uiRecordApi';
import USER_ID from '@salesforce/user/Id';
import isGuest from '@salesforce/user/isGuest';

const FIELDS = ['User.ContactId'];

export default class MaintenanceRequestForm extends LightningElement {
    @track subject = '';
    @track description = '';
    @track priority = '';
    @track contactId;
    @track isFormVisible = true;
    @track isConfirmationVisible = false;
    isGuest = isGuest;

    priorityOptions = [
        { label: 'Low', value: 'Low' },
        { label: 'Medium', value: 'Medium' },
        { label: 'High', value: 'High' },
    ];

    get showForm() {
        return this.isFormVisible && !this.isGuest;
    }

    get showConfirmation() {
        return this.isConfirmationVisible && !this.isGuest;
    }

    @wire(getRecord, { recordId: USER_ID, fields: FIELDS })
    user({ error, data }) {
        if (data) {
            this.contactId = data.fields.ContactId.value;
        } else if (error) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error loading user data',
                    message: error.body.message,
                    variant: 'error',
                }),
            );
        }
    }

    handleInputChange(event) {
        const field = event.target.dataset.id;
        if (field === 'subject') {
            this.subject = event.target.value;
        } else if (field === 'description') {
            this.description = event.target.value;
        } else if (field === 'priority') {
            this.priority = event.target.value;
        } 
    }

    handleSubmit() {
        const requestPayload = {
            subject: this.subject,
            description: this.description,
            priority: this.priority,
            contactId: this.contactId
        };
        console.log('Submitting Maintenance Request:', requestPayload);

        submitMaintenanceRequest(requestPayload)
        .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Maintenance request submitted successfully!',
                    variant: 'success',
                }),
            );
            // Hide form and show confirmation
            this.isFormVisible = false;
            this.isConfirmationVisible = true;
        })
        .catch(error => {
            console.error('Error submitting maintenance request:', error);
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'An error occurred while submitting the request.',
                    variant: 'error',
                }),
            );
        });
    }
}