public with sharing class LWCHelper {
    public LWCHelper() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Account> searchAccounts(String searchTerm) {
        searchTerm = '%' + searchTerm + '%';
        return [
            SELECT Name, Industry, NumberOfEmployees, Phone
            FROM Account
            WHERE Name LIKE :searchTerm ORDER BY Name ASC LIMIT 20
        ];
    }
}