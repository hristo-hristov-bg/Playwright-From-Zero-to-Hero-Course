import { Page } from "@playwright/test";
import { NavigationPage } from '../page-objects/navigationPage';
import { FormLayoutsPage } from '../page-objects/formLayoutsPage';
import { DatePickerPage } from '../page-objects/datePickerPage';

export class PageManager {
    private readonly page: Page;
    public navigationPage: NavigationPage;
    public formLayoutsPage: FormLayoutsPage;
    public datePickerPage: DatePickerPage;

    constructor(page: Page) {
        this.page = page;
        this.navigationPage = new NavigationPage(this.page);
        this.formLayoutsPage = new FormLayoutsPage(this.page);
        this.datePickerPage = new DatePickerPage(this.page);
    }

    navigateTo() {
        return this.navigationPage;
    }

    onFormLayoutsPage() {
        return this.formLayoutsPage;
    }

    onDatePickerPage() {
        return this.datePickerPage;
    }
}