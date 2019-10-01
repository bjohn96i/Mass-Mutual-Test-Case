import { Selector } from 'testcafe';

const label = Selector('label');

class Feature {
    constructor (text) {
        this.label    = label.withText(text);
    }
}

export default class Page {
    constructor () {
        this.total          = Selector('#txt_ttl_val');
        this.textbox1       = Selector('#txt_val_1');
        this.textbox2       = Selector('#txt_val_2');
        this.textbox3       = Selector('#txt_val_3');
        this.textbox4       = Selector('#txt_val_4');
        this.textbox5       = Selector('#txt_val_5');

        this.featureList = [
            new Feature('Value 1'),
            new Feature('Value 2'),
            new Feature('Value 3'),
            new Feature('Value 4'),
            new Feature('Value 5')
        ];
    }
}
