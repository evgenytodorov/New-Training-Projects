import { LightningElement, wire, track } from "lwc";
import getMonthlyStatementsForLoggedInContact from "@salesforce/apex/MonthlyStatementController.getMonthlyStatementsForLoggedInContact";
import isGuest from "@salesforce/user/isGuest";

const COLUMNS = [
  { label: "Statement ID", fieldName: "Name" },
  { label: "Rental Property", fieldName: "RentalPropertyName", type: "text" },
  { label: "Amount Charged", fieldName: "MonthlyRent", type: "currency" }
];

export default class MonthlyStatementDataTableComponent extends LightningElement {
  isGuest = isGuest;

  @track statements;
  @track columns = COLUMNS;

  @wire(getMonthlyStatementsForLoggedInContact)
  wiredStatements({ error, data }) {
    if (data) {
      // Transforming data to include Rental Property Name and Monthly Rent as separate fields
      this.statements = data.map((statement) => {
        return {
          ...statement,
          RentalPropertyName: statement.Rental_Property__r
            ? statement.Rental_Property__r.Name
            : "N/A",
          MonthlyRent: statement.Rental_Property__r
            ? statement.Rental_Property__r.Monthly_Rent__c
            : "N/A"
        };
      });
    } else if (error) {
      // Handle error
      console.error(error);
    }
  }
}
