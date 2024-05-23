public with sharing class MonthlyStatementController {
  @AuraEnabled(cacheable=true)
  public static List<Monthly_Statement__c> getMonthlyStatementsForLoggedInContact() {
    // Get the current user's contact ID
    Id contactId = [SELECT ContactId FROM User WHERE Id = :UserInfo.getUserId()].ContactId;
    System.debug(contactId);
    if (contactId == null) {
      return new List<Monthly_Statement__c>();
    }
    // Query Monthly_Statement__c for the current user's contact
    return [
      SELECT Id, Name, Rental_Property__c, Amount_Charged__c
      FROM Monthly_Statement__c
      WHERE Contact__c = :contactId
      LIMIT 10
    ];
  }
}
