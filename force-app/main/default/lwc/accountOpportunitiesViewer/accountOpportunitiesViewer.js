import { LightningElement, api, wire, track } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getOpportunities from '@salesforce/apex/AccountOpportunitiesController.getOpportunities';

export default class AccountOpportunitiesViewer extends LightningElement {
    @api recordId;
    @track opportunities;
    @track error;
    @track nodata;
    @track wiredOpportunitiesResult;
    columns = [
        { label: 'Nom Opportunité', fieldName: 'Name', type: 'text' },
        { label: 'Montant', fieldName: 'Amount', type: 'currency' },
        { label: 'Date de Clôture', fieldName: 'CloseDate', type: 'date' },
        { label: 'Phase', fieldName: 'StageName', type: 'text' }
    ];

    @wire(getOpportunities, { accountId: '$recordId' }) 
    wiredOpportunities(result) {
        this.wiredOpportunitiesResult = result;
        const { error , data } = result;
        this.nodata = false;
         if (data?.length){
            this.opportunities = data;
        } else if (error) {
            this.error = error;
            this.opportunities = undefined;
        } else {
            this.nodata = true;
        }
    }

    async handleRafraichir() {
        try{
            await refreshApex(this.wiredOpportunitiesResult);
            this.displayToast('Succès', 'Les données ont été actualisées !', 'success');
        }
        catch (error){
            this.displayToast('Erreur', 'Impossible de rafraîchir les données.', 'error');
        }
    }

    displayToast(title, message, variant){
        const eventToast = new ShowToastEvent({title, message, variant});
        this.dispatchEvent(eventToast);
    }
}