import { LightningElement, track, wire } from 'lwc';
import searchAccounts from '@salesforce/apex/LWCHelper.searchAccounts';

const COLUMNS = [
    { label: 'Account Name', fieldName: 'Name' },
    { label: 'Industry', fieldName: 'Industry' },
    { label: 'Employees', fieldName: 'NumberOfEmployees' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' }
];

export default class wiredAccountNameRetrieval extends LightningElement {
    @track searchTerm = '';
    @track accounts;
    columns = COLUMNS;

    @wire(searchAccounts, { searchTerm: '$searchTerm' })
    wiredAccounts({ error, data }) {
        if (data) {
            this.accounts = data;
        } else if (error) {
            this.accounts = undefined;
            console.error('Error:', error);
        }
    }

    handleInputChange(event) {
        this.searchTerm = event.target.value;
    }
}
