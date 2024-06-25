import { LightningElement } from 'lwc';
import heroImage from '@salesforce/resourceUrl/heroImage';

export default class Hero extends LightningElement {
    heroUrl = heroImage;
}