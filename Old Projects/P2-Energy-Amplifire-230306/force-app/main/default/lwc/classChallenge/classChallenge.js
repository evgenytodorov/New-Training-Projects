import getHotRatedAccounts from '@salesforce/apex/LWCHelper.getHotRatedAccounts';
import getFilteredHotAccounts from '@salesforce/apex/LWCHelper.getFilteredHotAccounts';
import { LightningElement, track, wire} from 'lwc';
 
export default class HotRatedAccounts extends LightningElement {
    @track accounts;
    @track columns = [
        {label: 'Name', fieldName: 'Name', sortable: true},
        {label: 'Rating', fieldName: 'Rating'}
    ];
 
    @wire(getHotRatedAccounts)
    wiredAccounts(result){
        if (result.data){
            this.accounts = result.data;
            console.log(result.data);
        }
        else if (result.error){
            console.log(result.error);
        }
    }

    @wire(getFilteredHotAccounts, {query : '$myQuery'})
    filteredAccounts;

    handleQuery(){
        let q = this.template.querySelector('.input').value;
        getFilteredHotAccounts({query : q})
        .then(result => {
            this.accounts = result;
        })
    }
}