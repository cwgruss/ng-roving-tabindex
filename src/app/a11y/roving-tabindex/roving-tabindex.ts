import { ListKeyManager, ILisKeyManagerOption } from './list-key-manager';
import { QueryList, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';

const toggleTabIndex = (element: HTMLElement, isTabbable: boolean) => element.setAttribute('tabindex', isTabbable ? '0' : '-1');

export class TabbableOption implements ILisKeyManagerOption {
    isDisabled: boolean;
    private _isFocusable: boolean;
    private _host: HTMLElement;

    set isFocusable(canFocus: boolean) {
        this._isFocusable = canFocus;
        toggleTabIndex(this._host, canFocus);
    }

    get isFocusable(): boolean {
        return this._isFocusable;
    }

    constructor(el: ElementRef) {
        this._host = el.nativeElement;
    }

    public focus(): void {
        this._host.focus();
    }
}

export class RovingTabindex<T extends TabbableOption> {
    private _keyManager: ListKeyManager<T>;

    private _focusedEl: T;
    public handleKeyboard: (event: KeyboardEvent) => {};


    change: Subject<T>;
    tabOut: Subject<void>;

    get selected(): T {
        return this._keyManager.selected;
    }

    get selectedIndex(): number {
        return this._keyManager.selectedItemIndex;
    }

    public select(item: T| number): void {
        this._keyManager.setSelectedItem(item);
    }


    constructor(private _itemsQueryList: QueryList<T> | T[]) {
        this._keyManager = new ListKeyManager(_itemsQueryList);

        this._keyManager.change.subscribe((selected: T) => {
            this.deselectAll();
            this._focusedEl = selected;
            this._focusedEl.isFocusable = true;
            this._focusedEl.focus();
        });
        this.change = this._keyManager.change;
        this.tabOut = this._keyManager.tabOut;
        this.handleKeyboard = this._keyManager.handleKeyDown.bind(this._keyManager);
    }

    public deselectAll(): void {
        this._itemsQueryList.forEach((option: T) => {
            option.isFocusable = false;
        });
    }
}
