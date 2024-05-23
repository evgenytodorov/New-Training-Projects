public with sharing class MaintenanceRequestController {
    @AuraEnabled
    public static void submitMaintenanceRequest(String subject, String description, String priority, Id contactId, Id rentalPropertyId) {
        Case maintenanceRequest = new Case(
            Subject = subject,
            Description = description,
            Priority = priority,
            ContactId = contactId,
            Rental_Property__c = rentalPropertyId // Assuming you have a Rental_Property__c lookup field on Case
        );
        insert maintenanceRequest;
    }

    @AuraEnabled(cacheable=true)
    public static Id getRentalProperty(Id contactId) {
        Rental_Property__c rentalProperty = [
            SELECT Id 
            FROM Rental_Property__c 
            WHERE Id IN (SELECT Rental_Property__c FROM Contact WHERE Id = :contactId)
            LIMIT 1
        ];
        return rentalProperty.Id;
    }
}
