import { RovingTabindex, TabbableOption } from './roving-tabindex';
import { ElementRef } from '@angular/core';
import { Options } from 'selenium-webdriver/chrome';

const button = (id: number): HTMLButtonElement => {
    const el = document.createElement('button');
    el.type = 'button';
    el.textContent = `Test Button ${id}`;
    el.id = `test-button-${id}`;
    return el;
};

const anchor = (id: number): HTMLAnchorElement => {
    const el = document.createElement('anchor');
    el.textContent = `Test anchor ${id}`;
    el.id = `test-anchor-${id}`;
    el.setAttribute('href', `/${this.id}`);
    return el as HTMLAnchorElement;
};

export class MockButtonRef extends ElementRef {
    static id = 0;
    constructor() {
        super(button(MockButtonRef.id++));
    }
}


export class MockAnchorRef extends ElementRef {
    static id = 0;
    constructor() {
        super(anchor(MockAnchorRef.id++));
    }
}

const createButtonRef = () => new MockButtonRef();
const creaateAnchorRef = () => new MockAnchorRef();

describe('RovingTabindex', function() {
    const options: TabbableOption[] = [];

    const buttonOptions: TabbableOption[] = [
        new TabbableOption(createButtonRef()),
        new TabbableOption(createButtonRef()),
        new TabbableOption(createButtonRef()),
        new TabbableOption(createButtonRef()),
        new TabbableOption(createButtonRef()),
        new TabbableOption(createButtonRef()),
    ];

    beforeAll(() => {
        this.options = buttonOptions;
        this.options.forEach((element,index) => {
            console.log(`${index} :: ${JSON.stringify(element)}\n`);
        });
    });
    it('should create an instance', () => {
      const rovingTabindex = new RovingTabindex(buttonOptions);
      expect(rovingTabindex).toBeTruthy();
    });

    it('should have an array of TabbableOption', () => {
        const rovingTabindex = new RovingTabindex(this.options);
        expect(this.options.length).toEqual(buttonOptions.length);
    });

    it('should update `selectedIndex` when the third element is selected', () => {
        const rovingTabindex = new RovingTabindex(this.options);
        rovingTabindex.select(2);
        expect(rovingTabindex.selectedIndex).toBe(2);
    });

    it('should update focus when the third element is selected', () => {
        const rovingTabindex = new RovingTabindex(this.options);
        rovingTabindex.select(2);
        expect(rovingTabindex.selected).toBeDefined();
    });
  });
