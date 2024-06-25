import { LightningElement, track } from 'lwc';
import searchAccounts from '@salesforce/apex/LWCHelper.searchAccounts';

const COLUMNS = [
    { label: 'Account Name', fieldName: 'Name' },
    { label: 'Industry', fieldName: 'Industry' },
    { label: 'Employees', fieldName: 'NumberOfEmployees' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' }
];

export default class ImperativeApexAccountNameRetrieval extends LightningElement {
    @track searchTerm = '';
    @track accounts;
    @track error;
    columns = COLUMNS;

    handleInputChange(event) {
        this.searchTerm = event.target.value;
    }

    handleSearch() {
        searchAccounts({ searchTerm: this.searchTerm })
            .then(result => {
                this.accounts = result;
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.accounts = undefined;
                console.error('Error:', error);
            });
    }
}