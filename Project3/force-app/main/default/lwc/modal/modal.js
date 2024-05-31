import { LightningElement, api } from 'lwc';

export default class Modal extends LightningElement {
    @api showModal = false;
    @api modalHeader = 'Modal Header';

    closeModal() {
        this.showModal = false;
        this.dispatchEvent(new CustomEvent('close'));
    }

    handleSave() {
        // Find the dataform component and call its createLead method
        const dataform = this.template.querySelector('c-dataform');
        if (dataform) {
            dataform.createLead()
                .then(() => {
                    this.closeModal();
                })
                .catch(error => {
                    console.error('Error creating lead:', error);
                });
        }
    }
}

