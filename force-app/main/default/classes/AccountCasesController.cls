public with sharing class AccountCasesController {

    @AuraEnabled
    public static List<Case> findCasesBySubject(Id accountId, String subjectSearchTerm){
        if (subjectSearchTerm == ''){
            return null;
        } else {
            String searchPattern = '%' + subjectSearchTerm + '%';
            return CaseSelector.getCasesByAccountId(accountId, searchPattern);
        }  
    }
}