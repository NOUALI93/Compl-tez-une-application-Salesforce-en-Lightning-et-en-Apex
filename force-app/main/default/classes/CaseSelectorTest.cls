@IsTest
private class CaseSelectorTest {
    @TestSetup
    static void setup() {
        Account testAccount = TestDataFactory.createTestAccount();
        TestDataFactory.createTestCase(testAccount.Id);
    }

    @IsTest
    static void testGetCasesByAccountId() {
        Account testAccount = [SELECT Id FROM Account LIMIT 1];
        String searchPattern = '%' + 'Customer cannot' + '%';
        Test.startTest();
        List<Case> results = CaseSelector.getCasesByAccountId(testAccount.Id,searchPattern);
        Test.stopTest();
        Assert.areNotEqual(0, results.size(), 'Should return at least one Case');
    }
}
