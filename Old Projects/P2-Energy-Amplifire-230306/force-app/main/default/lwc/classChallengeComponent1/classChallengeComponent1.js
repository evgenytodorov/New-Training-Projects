import { LightningElement, wire } from 'lwc';
import classChallenges from '@salesforce/messageChannel/c/classChallenge__c';
import { MessageContext, publish } from 'lightning/messageService';

export default class ClassChallengeComponent1 extends LightningElement {

    @wire(MessageContext)
    messageContext;



}