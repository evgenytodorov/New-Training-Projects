import { LightningElement, api, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecord } from 'lightning/uiRecordApi';
import { reduceErrors } from 'c/ldsUtils';
import isGuest from '@salesforce/user/isGuest';
import { CurrentPageReference } from 'lightning/navigation';
import LEAD_OBJECT from '@salesforce/schema/Lead';
import LASTNAME_FIELD from '@salesforce/schema/Lead.LastName';
import FIRSTNAME_FIELD from '@salesforce/schema/Lead.FirstName';
import PHONE_FIELD from '@salesforce/schema/Lead.Phone';
import EMAIL_FIELD from '@salesforce/schema/Lead.Email';
import TOUR_INFORMATION_FIELD from '@salesforce/schema/Lead.Tour_Information__c';
import PROPERTY_TO_TOUR_FIELD from '@salesforce/schema/Lead.Property_to_Tour__c';
import COMPANY_FIELD from '@salesforce/schema/Lead.Company';
import STATUS_FIELD from '@salesforce/schema/Lead.Status';

export default class Modal extends LightningElement {
    @api showModal = false;
    @api modalHeader = 'Modal Header';
    @track isConfirmationVisible = false;
    isGuest = isGuest;
    @track propertyToTour = "";
    recordId;

    lastName = "";
    firstName = "";
    phone = "";
    email = "";
    tourInformation = "";

    @wire(CurrentPageReference)
    setCurrentPageReference(currentPageReference) {
        this.recordId = currentPageReference?.state?.c__recordId;
        if (this.recordId) {
            this.propertyToTour = this.recordId; // Automatically set the property to tour field
        }
    }

    closeModal() {
        console.log('Closing modal');
        this.showModal = false;
        this.dispatchEvent(new CustomEvent('close'));
    }

    handleSave() {
        console.log('Save button clicked');
        this.createLead()
            .then(() => {
                setTimeout(() => {
                    this.closeModal();
                }, 7000); // Delay for 2000 milliseconds (2 seconds)
            })
            .catch(error => {
                console.error('Error creating lead:', error);
            });
    }

    handleLastNameChange(event) {
        this.lastName = event.target.value;
    }

    handleFirstNameChange(event) {
        this.firstName = event.target.value;
    }

    handlePhoneChange(event) {
        this.phone = event.target.value;
    }

    handleEmailChange(event) {
        this.email = event.target.value;
    }

    handleTourInformationChange(event) {
        this.tourInformation = event.target.value;
    }

    get showConfirmation() {
        return this.isConfirmationVisible && !this.isGuest;
    }

    createLead() {
        return new Promise((resolve, reject) => {
            const fields = {};
            fields[LASTNAME_FIELD.fieldApiName] = this.lastName;
            fields[FIRSTNAME_FIELD.fieldApiName] = this.firstName;
            fields[PHONE_FIELD.fieldApiName] = this.phone;
            fields[EMAIL_FIELD.fieldApiName] = this.email;
            fields[TOUR_INFORMATION_FIELD.fieldApiName] = this.tourInformation;
            fields[PROPERTY_TO_TOUR_FIELD.fieldApiName] = this.propertyToTour;
            fields[COMPANY_FIELD.fieldApiName] = 'na';
            fields[STATUS_FIELD.fieldApiName] = 'Open - Not Contacted';


            const recordInput = { apiName: LEAD_OBJECT.objectApiName, fields };
            createRecord(recordInput)
                .then(lead => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: "Success!",
                            message: "Tour created!",
                            variant: "success"
                        })
                    );
                    this.isConfirmationVisible = true;
                    resolve(lead);
                })
                .catch(error => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: "Error creating record",
                            message: reduceErrors(error).join(", "),
                            variant: "error"
                        })
                    );
                    reject(error);
                });
        });
    }
}