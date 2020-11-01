import AppsterController from '../appster/AppsterController.js'
import { GoLogoLoGUIId } from './GoLogoLoConstants.js';

export default class GoLogoLoController
 extends AppsterController {
    constructor() {
        super();
    }

    processEditText() {
        this.model.updateText();
    }

}