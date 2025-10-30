public with sharing class CaseSelector {
    public static List<Case> getCasesByAccountId(Id accountId, String subjectSearchTerm) {
        return [SELECT Id, Subject, Status, Priority 
        FROM Case 
        WHERE AccountId = :accountId AND Subject like :subjectSearchTerm 
        WITH SECURITY_ENFORCED];
    }
}