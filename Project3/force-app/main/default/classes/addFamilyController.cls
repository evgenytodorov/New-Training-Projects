public with sharing class addFamilyController {
    @AuraEnabled
    public static void addFamilyRequest(String firstName, String lastName, String emailId, String phoneVal){
        System.debug('Received parameters:');
        System.debug('First Name: ' + firstName);
        System.debug('Last Name: ' + lastName);
        System.debug('Email: ' + emailId);
        System.debug('Phone: ' + phoneVal);

        Contact newContact = new Contact(
            firstName = firstName,
            lastName = lastName,
            emailId = emailId,
            PhoneVal = phoneVal
        );
        insert newContact;
    }
}
