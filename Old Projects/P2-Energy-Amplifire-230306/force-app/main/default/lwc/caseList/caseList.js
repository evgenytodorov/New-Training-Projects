import { LightningElement, wire, track } from 'lwc';
import getHighPriorityCases from '@salesforce/apex/LWCHelper.getHighPriorityCases';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

export default class CaseList extends LightningElement {
    @track columns = [
        {label: 'Case Number', fieldName: 'CaseNumber'},
        {label: 'Status', fieldName: 'Status', sortable: true},
        {label: 'Priority', fieldName: 'Priority'},
        {label: 'Type', fieldName: 'Type'},
        {label: 'Account', fieldName: 'AccountId'},
        {label: 'Contact', fieldName: 'ContactId'},
        {label: 'Contact Email', fieldName: 'ContactEmail'},
        {label: 'Owner', fieldName: 'OwnerId'}
    ];
    @track casesList;

    @wire(getHighPriorityCases) wiredCases(result){
        
        if (result.data) {
            this.casesList = result.data;
            this.dataToRefresh = result;
            console.log(result.data);
        }
        else if (result.error){
            console.log(result.error);
        }
    }

    handleSuccess(event){
        const evt = new ShowToastEvent({
            title: 'Case created',
            message: 'Record ID: ' + event.detail.id,
            variant: 'success',
        });
        this.dispatchEvent(evt);
        refreshApex(this.dataToRefresh);
    }
}