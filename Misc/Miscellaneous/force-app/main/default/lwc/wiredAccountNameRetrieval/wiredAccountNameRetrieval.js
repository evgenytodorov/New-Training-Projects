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
    delayTimeout;

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
        window.clearTimeout(this.delayTimeout);
        const searchKey = event.target.value;
        // Debounce input by 2000ms
        this.delayTimeout = setTimeout(() => {
            this.searchTerm = searchKey;
        }, 2000);
    }
}
