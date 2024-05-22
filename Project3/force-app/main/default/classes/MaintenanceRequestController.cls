public with sharing class MaintenanceRequestController {
    @AuraEnabled
    public static void submitMaintenanceRequest(String subject, String description, String priority, String preferredDateTime, String contactId) {
        System.debug('Received parameters:');
        System.debug('Subject: ' + subject);
        System.debug('Description: ' + description);
        System.debug('Priority: ' + priority);
        System.debug('Preferred Date and Time: ' + preferredDateTime);
        System.debug('ContactId: ' + contactId);

        Case newCase = new Case(
            Subject = subject,
            Description = description,
            Priority = priority,
            ContactId = contactId,
            Status = 'New',
            Origin = 'Web'
        );
        insert newCase;
    }
}
