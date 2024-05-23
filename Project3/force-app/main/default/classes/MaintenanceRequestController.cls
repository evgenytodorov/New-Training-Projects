public with sharing class MaintenanceRequestController {
    @AuraEnabled
    public static void submitMaintenanceRequest(String subject, String description, String priority, String contactId) {
        System.debug('Entering submitMaintenanceRequest');
        System.debug('subject: ' + subject);
        System.debug('description: ' + description);
        System.debug('priority: ' + priority);
        System.debug('contactId: ' + contactId);
        
        // Create a new Case record
        Case newCase = new Case(
            Subject = subject,
            Description = description,
            Priority = priority,
            ContactId = contactId
        );

        // Insert the new Case record
        try {
            insert newCase;
            System.debug('Case created successfully');
        } catch (Exception e) {
            System.debug('Error creating case: ' + e.getMessage());
            throw new AuraHandledException('Error creating case: ' + e.getMessage());
        }
    }
}
