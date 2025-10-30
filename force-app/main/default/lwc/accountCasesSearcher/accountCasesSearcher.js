import { LightningElement, track, api } from 'lwc';
import findCasesBySubject from '@salesforce/apex/AccountCasesController.findCasesBySubject';

const COLUMNS = [
    { label: 'Sujet', fieldName: 'Subject', type: 'text' },
    { label: 'Statut', fieldName: 'Status', type: 'text' },
    { label: 'Priorité', fieldName: 'Priority', type: 'text' },
];

export default class AccountCaseSearchComponent extends LightningElement {
    @api recordId;
    @track cases;
    @track error;
    @track nocase;
    searchTerm = '';
    columns = COLUMNS;

    updateSearchTerm(event) {
        this.searchTerm = event.target.value;
    }

    handleSearch() {
        findCasesBySubject({ accountId: this.recordId, subjectSearchTerm: this.searchTerm })
            .then(result => {
                if(result?.length){
                    this.cases = result;
                    this.error = undefined;
                    this.nocase = false;
                }else{
                    this.cases = null;
                    this.error = undefined;
                    this.nocase = true;
                }
                
            })
            .catch(error => {
                this.error = 'Une erreur est survenue lors de la recherche des cases.';
            });
    }
}