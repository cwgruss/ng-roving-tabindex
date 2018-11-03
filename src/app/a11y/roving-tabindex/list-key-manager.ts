import { UP_ARROW, RIGHT_ARROW, DOWN_ARROW, LEFT_ARROW, TAB, HOME, END } from 'src/app/util/keycodes';
import { QueryList } from '@angular/core';
import { Subject } from 'rxjs';


export interface ILisKeyManagerOption {
    isDisabled?: boolean;
}

export class ListKeyManager<T extends ILisKeyManagerOption> {
    private _selectedItem: T;
    private _selectedItemIndex = -1;
    public change: Subject<T> = new Subject<T>();
    public tabOut: Subject<void> = new Subject<void>();

    set selectedItemIndex(index: number) {
        const newSelected = this.items[index];
        if (newSelected) {
            this._selectedItemIndex = index;
            this._selectedItem = newSelected;
            this.change.next(this._selectedItem);
        }
    }

    set selectedItem(item: T) {
        const index = this.items.indexOf(item);
        if (index >= 0) {
            this._selectedItem = item;
            this._selectedItemIndex = index;
            this.change.next(this._selectedItem);
        }
    }

    get selected(): T {
        return this._selectedItem;
    }

    private get items(): T[] {
        if (this._itemsQueryList instanceof QueryList) {
            return this._itemsQueryList.toArray();
        }
        return this._itemsQueryList;
    }

    constructor(private _itemsQueryList: QueryList<T> | T[]) {   }

    public handleKeyDown(event: KeyboardEvent): void {
        const keyCode = event.keyCode;
        let selectedIdx = -1;

        switch (keyCode) {
            case TAB: {
                this.tabOut.next();
                return;
            }
            case HOME: {
                this._selectFirstItem();
                return;
            }
            case END: {
                this._selectLastItem();
                return;
            }
            case UP_ARROW:
            case LEFT_ARROW: {
                event.preventDefault();
                if (this._selectedItemIndex === 0) {
                    this._selectLastItem();
                    return;
                } else {
                    selectedIdx = this._selectedItemIndex - 1;
                }
                break;
            }
            case DOWN_ARROW:
            case RIGHT_ARROW: {
                if (this._selectedItemIndex === (this.items.length - 1)) {
                    this._selectFirstItem();
                    return;
                } else {
                    selectedIdx = this._selectedItemIndex + 1;
                }
                break;
            }
        }
        this.setSelectedItem(selectedIdx);
    }

    public setSelectedItem(item: number | T): void {
        const itemArr: T[] = this.items;
        const index = this._getIndexOf(itemArr, item);
        this.selectedItemIndex = index;
    }

    private _selectFirstItem(): void {
        this.setSelectedItem(0);
    }

    private _selectLastItem(): void {
        const lastIndex = this.items.length - 1;
        this.setSelectedItem(lastIndex);
    }

    private _getIndexOf(items: T[], item: number | T): number {
        const index = typeof item === 'number' ? item : items.indexOf(item);
        return index;
    }
}
