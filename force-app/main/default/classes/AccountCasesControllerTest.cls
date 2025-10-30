@IsTest
private class AccountCasesControllerTest {
    @TestSetup
    static void setup() {
        Account testAccount = TestDataFactory.createTestAccount();
        TestDataFactory.createTestCase(testAccount.Id);
    }

    @IsTest
    static void testFindCasesBySubject() {
        Account testAccount = [SELECT Id FROM Account LIMIT 1];
        String searchPattern = 'Customer cannot log in';
        Test.startTest();
        List<Case> results = AccountCasesController.findCasesBySubject(testAccount.Id,searchPattern);
        Test.stopTest();
        Assert.areEqual(1, results.size(), 'Should return one Case');
    }

     @IsTest
    static void testFindCasesBySubjectEmptyInput() {
        Account testAccount = [SELECT Id FROM Account LIMIT 1];
        String searchPattern = '';
        Test.startTest();
        List<Case> results = AccountCasesController.findCasesBySubject(testAccount.Id,searchPattern);
        Test.stopTest();
        Assert.areEqual(null, results, 'Should return nothing');
    }
}