import {AppsterCallback, AppsterGUIId, AppsterHTML, AppsterGUIClass} from './AppsterConstants.js'
import { GoLogoLoGUIId } from '../gologolo/GoLogoLoConstants.js';
import Appster from './Appster.js';

export default class AppsterController {
    constructor() {
        this.model = null;

        this.view = null;
    }

    setModel(initModel) {
        this.model = initModel;
    }

    setView(initView){
        this.view = initView;
    }

    /**
     * This function helps the constructor setup the event handlers for all controls.
     * 
     * @param {AppsterGUIId} id Unique identifier for the HTML control on which to
     * listen for events.
     * @param {AppsterHTML} eventName The type of control for which to respond.
     * @param {AppsterCallback} callback The callback function to be executed when
     * the event occurs.
     */
    registerEventHandler(id, eventName, callback) {
        // GET THE CONTROL IN THE GUI WITH THE CORRESPONDING id
        let control = document.getElementById(id);

        // AND SETUP THE CALLBACK FOR THE SPECIFIED EVENT TYPE
        if (control)
            control.addEventListener(eventName, callback);
    }

    registerAppsterEventHandlers() {
        // FIRST THE NEW WORK BUTTON ON THE HOME SCREEN
        this.registerEventHandler(AppsterGUIId.APPSTER_HOME_NEW_WORK_BUTTON, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_CREATE_NEW_WORK]);

        // THEN THE CONTROLS ON THE EDIT SCREEN
        this.registerEventHandler(AppsterGUIId.APPSTER_EDIT_HOME_LINK, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_GO_HOME]);
        this.registerEventHandler(AppsterGUIId.APPSTER_EDIT_TRASH, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_DELETE_WORK]);

        // AND THE MODAL BUTTONS
        this.registerEventHandler(AppsterGUIId.APPSTER_YES_NO_MODAL_YES_BUTTON, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_CONFIRM_DELETE_WORK]);
        this.registerEventHandler(AppsterGUIId.APPSTER_YES_NO_MODAL_NO_BUTTON, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_CANCEL_DELETE_WORK]);
    
        this.registerEventHandler(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_CANCEL_BUTTON, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_CANCEL_CREATE_WORK]);
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_EDIT_TEXT_BUTTON, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_EDIT_TEXT]);
        this.registerEventHandler(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_ENTER_BUTTON, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_ENTER_CREATE_WORK]);
        this.registerEventHandler(AppsterGUIId.APPSTER_CONFIRM_MODAL_OK_BUTTON, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_CONFIRM_OK]);
        this.registerEventHandler(AppsterGUIId.APPSTER_EDIT_TEXT_INPUT_MODAL_CANCEL_BUTTON, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_CANCEL_EDIT_TEXT]);
        this.registerEventHandler(AppsterGUIId.APPSTER_EDIT_TEXT_INPUT_MODAL_ENTER_BUTTON, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_ENTER_EDIT_TEXT]);

        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_TEXT_COLOR_PICKER, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_CHANGE_COLOR]);
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_BACKGROUND_COLOR_PICKER, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_CHANGE_BACK_COLOR]);
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_FONT_SIZE_SLIDER, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_CAHNGE_FONT_SIZE]);
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_BORDER_COLOR_PICKER, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_CHANGE_BORDER_COLOR]);
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_BORDER_RADIUS_SLIDER, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_CHANGE_BORDER_RADIOUS]);
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_BORDER_THICKNESS_SLIDER, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_CHANGE_BORDER_THICKNESS]);
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_PADDING_SLIDER, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_CHANGE_PADDING]);
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_MARGIN_SLIDER, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_CHANGE_MARGIN]);
    }

    /**
    * This method sets up a callback method for an element, registering the
    * elementCallbackName (e.g. click) function for the element control in the DOM, specifying
    * callbackFunctionName as the method to be called when that event occurs. The
    * args array is used to pass needed data to the callback.
    * 
    * @param {Element} element 
    * @param {String} elementCallbackName 
    * @param {String} callbackFunctionName 
    * @param {String[]} args 
    */
    setupCallback(element, elementCallbackName, callbackFunctionName, args) {
        let functionCallText = "this." + callbackFunctionName + "(";
        for (let i = 0; i < args.length; i++) {
            functionCallText += "'" + args[i] + "'";
            if (i < (args.length - 1)) {
                functionCallText += ", ";
            }
        }
        functionCallText += ")";
        element.setAttribute(elementCallbackName, functionCallText);
        return functionCallText;
    }

    registerRecentWorkEventHandler(element) {
        element.addEventListener(AppsterHTML.CLICK, this.processEditWork);
    }

    /**
     * This function responds to when the user clicks on the
     * todo logo to go back to the home screen.
     */
    processGoHome = () => {
        console.log("processGoHome");
        this.model.goHome();
    }

    processGoEdit(workToEdit) {
        console.log("processGoEdit");
        this.model.goEdit(workToEdit);
    }

    /**
     * This function is called when the user requests to create
     * new work.
     */
    processCreateNewWork = (event) => {
        console.log("processCreateNewWork");
        // PROMPT FOR THE NAME OF THE NEW LIST
        //this.view.buildAppsterTextInputModal();
        this.model.logoTextInput();
        // MAKE A BRAND NEW LIST
        this.model.goList();
    }

    processCancelCreate = (event) => {
        this.model.view.createScreenClose();
    }

    processCreateEditText = (event) => {
        console.log("processCreateNewWork");
        // PROMPT FOR THE NAME OF THE NEW LIST
        //this.view.buildAppsterTextInputModal();
        this.model.logoEditTextInput();
    }

    processCancelEditText = (event) => {
        this.model.logoEditTextInputDelete();
    }

    /**
     * This function responds to when the user clicks on a link
     * for recent work on the home screen.
     * 
     * @param {String} workName The name of the work to load into
     * the controls on the edit screen.
     */
    processEditWork = (event) => {
        console.log("processEditWork");

        // GET THE WORK THAT THE USER WANTS TO LOAD
        let clickedElement = event.target;
        let workName = clickedElement.workId;
        console.log(workName + " clicked");
        let work = this.model.getRecentWork(workName);
        this.model.currentWork = new Array();
        this.model.currentWork.push(work);
        // START EDITING THE SELECTED WORK
        this.model.editWork(workName);
    }

    /**
     * This function responds to when the user clicks the No
     * button in the popup dialog after having requested to delete
     * the loaded work.
     */
    processCancelDeleteWork = (event) => {
        // JUST HIDE THE DIALOG
        this.model.view.hideDialog();
    }

    /**
     * This function responds to when the user changes the
     * name of the list via the textfield.
     */
    processChangeName() {
        let nameTextField = document.getElementById(TodoGUIId.LIST_NAME_TEXTFIELD);
        let newName = nameTextField.value;
        let listBeingEdited = window.todo.model.listToEdit;
        window.todo.model.updateListName(listBeingEdited, newName);
    }

    /**
     * This function responds to when the user clicks the Yes
     * button in the popup dialog after having requested to delete
     * the loaded work.
     */
    processConfirmDeleteWork = (event) => {
        let workname = this.model.currentWork[0];
        this.model.removeWork(workname);
        // DELETE THE WORK
        //this.model.removeWork(this.model.getWorkToEdit());
        // GO BACK TO THE HOME SCREEN
        this.model.currentWork = new Array();
        this.processCancelDeleteWork();
        this.model.goHome();
        
    }

    /**
     * This function responds to when the user clicks the trash
     * button, i.e. the delete button, in order to delete the
     * list being edited.
     */
    processDeleteWork = (event) => {
        // VERIFY VIA A DIALOG BOX
        this.model.view.showDialog();
    }
    
    editText = (event) => {
        let textFill = this.model.currentWork[0].getText();
        //this.model.logoEditTextInput();
        this.model.view.editTextInput(textFill);
        console.log(this.model.currentWork);
        //this.model.updateText();
    }
    
    enterEditLogo = (event) => {
        let logoName = this.model.view.getEditText();
        let indexOfWork = this.model.recentWork.indexOf(this.model.currentWork[0]);
        this.model.recentWork[indexOfWork].setText(logoName);
        this.model.currentWork[0].setText(logoName);
        this.model.view.createEditTextScreenClose();
        this.model.view.loadWork(this.model.currentWork[0]);
    }

    cancelEditLogo = (event) =>{
        this.model.view.createEditTextScreenClose();
    }
    
    confirmCreateYes = (event) => {
        this.model.confirmNewLogo();
    }

    confirmOkClose = (event) => {
        this.model.closeConfirm();
    }

    changeTextColor = (event) => {
        
        let textColorPicker = document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT_COLOR_PICKER);
        let indexOfWork = this.model.recentWork.indexOf(this.model.currentWork[0]);
        let textDiv = document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT);
        console.log(textColorPicker.value);
        textDiv.style.color = textColorPicker.value;
        this.model.recentWork[indexOfWork].setTextColor(textColorPicker.value);
        this.model.currentWork[0].setTextColor(textColorPicker.value);
        document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT).style.color = textColorPicker.value;  
        this.model.view.loadWork(this.model.currentWork[0]);      
    }

    changeBackgroundColor = (event) => {
        let backColorPicker = document.getElementById(GoLogoLoGUIId.GOLOGOLO_BACKGROUND_COLOR_PICKER);
        let indexOfWork = this.model.recentWork.indexOf(this.model.currentWork[0]);
        let textDiv = document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT);
        textDiv.style.backgroundColor = backColorPicker.value;
        this.model.recentWork[indexOfWork].setBackgroundColor(backColorPicker.value);
        this.model.currentWork[0].setBackgroundColor(backColorPicker.value);
        document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT).style.backgroundColor = backColorPicker.value; 
        this.model.view.loadWork(this.model.currentWork[0]);       
    }

    changeBorderColor = (event) => {
        let borderColorPicker = document.getElementById(GoLogoLoGUIId.GOLOGOLO_BORDER_COLOR_PICKER);
        let indexOfWork = this.model.recentWork.indexOf(this.model.currentWork[0]);
        let textDiv = document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT);
        textDiv.style.borderColor = borderColorPicker.value;
        this.model.recentWork[indexOfWork].setBorderColor(borderColorPicker.value);
        this.model.currentWork[0].setBorderColor(borderColorPicker.value);
        document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT).style.borderColor = borderColorPicker.value; 
        
        this.model.view.loadWork(this.model.currentWork[0]);       
    }
    changeFontSize = (event) => {
        let fontSizeSlider = document.getElementById(GoLogoLoGUIId.GOLOGOLO_FONT_SIZE_SLIDER);
        let indexOfWork = this.model.recentWork.indexOf(this.model.currentWork[0]);
        let textDiv = document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT);
        textDiv.style.fontSize = (parseInt(fontSizeSlider.value)) + "px";
        console.log(fontSizeSlider.value);
        this.model.recentWork[indexOfWork].setFontSize(fontSizeSlider.value);
        this.model.currentWork[0].setFontSize(fontSizeSlider.value);
        document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT).style.fontSize = fontSizeSlider.value;
        this.model.view.loadWork(this.model.currentWork[0]);
    }

    changeBorerRadius = (event) => {
        let radiusSlider = document.getElementById(GoLogoLoGUIId.GOLOGOLO_BORDER_RADIUS_SLIDER);
        let indexOfWork = this.model.recentWork.indexOf(this.model.currentWork[0]);
        let textDiv = document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT);
        textDiv.style.borderRadius = (parseInt(radiusSlider.value)) + "px";
        console.log(radiusSlider.value);
        this.model.recentWork[indexOfWork].setBorderRadius(radiusSlider.value);
        this.model.currentWork[0].setBorderRadius(radiusSlider.value);
        document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT).style.borderRadius = radiusSlider.value;
        this.model.view.loadWork(this.model.currentWork[0]);
    }

    changeBorerThickness = (event) => {
        let thicknessSlider = document.getElementById(GoLogoLoGUIId.GOLOGOLO_BORDER_THICKNESS_SLIDER);
        let indexOfWork = this.model.recentWork.indexOf(this.model.currentWork[0]);
        let textDiv = document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT);
        textDiv.style.borderWidth = (parseInt(thicknessSlider.value)) + "px";
        console.log(thicknessSlider.value);
        this.model.recentWork[indexOfWork].setBorderThickness(thicknessSlider.value);
        this.model.currentWork[0].setBorderThickness(thicknessSlider.value);
        document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT).style.borderWidth = thicknessSlider.value;
        this.model.view.loadWork(this.model.currentWork[0]);
    }
    changePadding = (event) => {
        let paddingSlider = document.getElementById(GoLogoLoGUIId.GOLOGOLO_PADDING_SLIDER);
        let indexOfWork = this.model.recentWork.indexOf(this.model.currentWork[0]);
        let textDiv = document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT);
        textDiv.style.padding = (parseInt(paddingSlider.value)) + "px";
        console.log(paddingSlider.value);
        this.model.recentWork[indexOfWork].setPadding(paddingSlider.value);
        this.model.currentWork[0].setPadding(paddingSlider.value);
        document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT).style.padding = paddingSlider.value;
        this.model.view.loadWork(this.model.currentWork[0]);
    }
    changemargin = (event) => {
        let marginSlider = document.getElementById(GoLogoLoGUIId.GOLOGOLO_MARGIN_SLIDER);
        let indexOfWork = this.model.recentWork.indexOf(this.model.currentWork[0]);
        let textDiv = document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT);
        textDiv.style.margin = (parseInt(marginSlider.value)) + "px";
        console.log(marginSlider.value);
        this.model.recentWork[indexOfWork].setMargin(marginSlider.value);
        this.model.currentWork[0].setMargin(marginSlider.value);
        document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT).style.margin = marginSlider.value;
        this.model.view.loadWork(this.model.currentWork[0]);
    }
}