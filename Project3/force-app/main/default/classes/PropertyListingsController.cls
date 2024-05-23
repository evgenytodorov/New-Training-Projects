public with sharing class PropertyListingsController {
  public PropertyListingsController() {
  }

  @AuraEnabled(cacheable=true)
  public static List<Rental_Property__c> getUnoccupiedRentalProperties() {
    try {
      return [
        SELECT Name, Occupied__c, Address__c, Bathrooms__c, Bedrooms__c
        FROM Rental_Property__c
        WHERE Occupied__c = FALSE
      ];
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}