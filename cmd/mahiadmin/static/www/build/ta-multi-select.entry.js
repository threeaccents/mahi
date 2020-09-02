import { r as registerInstance, h, c as createEvent, H as Host } from './index-d067c2a6.js';

const taMultiSelectCss = ":host{display:block;margin-bottom:var(--ta-multi-select-margin-bottom, 16px)}ta-input{margin-bottom:12px}.ta-multi-select{position:relative}.dropdown-menu-wrapper{z-index:99;position:absolute;top:36.5px;width:calc(100% - 4px);transition:all 0.2s ease-in-out 0s;opacity:0;visibility:hidden;border-radius:0 0 var(--border-radius) var(--border-radius);border:solid 2px var(--light-border-color);border-top:none;background-color:var(--primary-input-bg-color)}.dropdown-menu-wrapper.open{opacity:1;visibility:visible}.dropdown-menu{display:flex;flex-direction:column;overflow-y:auto;padding:20px 0;max-height:256px;background-color:var(--primary-input-bg-color);margin:1px}.dropdown-item{height:16px;font-size:14px;color:var(--dark-text-color);padding:6px 8px;margin:0 15px;cursor:pointer;background-color:var(--primary-input-bg-color)}.dropdown-item.disabled{cursor:auto}.dropdown-item.disabled:hover{background-color:inherit}.dropdown-item:hover{font-weight:500;border-radius:6px;background-color:var(--highlight-text-color)}.expand-arrow-icon{position:absolute;width:40px;height:26px;right:1px;top:4px;padding:4px 8px;text-align:center;transition:transform 0.2s ease;cursor:pointer}.expand-arrow-icon ta-icon{fill:var(--primary-text-color)}.expand-arrow-icon.expanded{transform:rotate(180deg)}.selected-items{display:flex;flex-wrap:wrap}.selected-item{display:flex;align-items:center;flex-direction:row;margin-bottom:4px;margin-right:4px;padding:5px 12px;border-radius:var(--border-radius);background-color:var(--multiselect-selected-option-bg-color)}.selected-item span{height:16px;margin-right:10px;font-size:14px;color:white;font-weight:normal}.selected-item ta-icon{cursor:pointer;height:14px;opacity:0.65;color:#ffffff}";

const MultiSelect = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.isFocused = false;
        this.searchQuery = '';
        this.showDropdown = false;
        this.label = '';
        this.value = [];
        this.options = [];
        this.loading = false;
        this.handleOnInput = (e) => {
            this.searchQuery = e.detail;
            this.filterOptions(e.detail);
        };
        this.filterOptions = (query) => {
            if (query) {
                this.filteredOptions = this.options.filter(o => o.text.toLowerCase().includes(query.toLowerCase()));
                return;
            }
            this.filteredOptions = this.options;
        };
        this.handleOnFocus = () => {
            this.isFocused = true;
            this.showDropdown = true;
        };
        this.handleSelectOption = (value) => {
            this.showDropdown = false;
            this.taSelect.emit([...this.value, value]);
        };
        this.getDropdownOptions = () => {
            if (this.availableDropdownOptions.length === 0) {
                return h("span", { class: "dropdown-item disabled" }, "No options available");
            }
            return this.availableDropdownOptions.map((o) => {
                return (h("span", { class: "dropdown-item", onClick: () => this.handleSelectOption(o.value) }, o.text));
            });
        };
        this.isActive = () => {
            return !!this.searchQuery || this.isFocused;
        };
        this.handleOnBlur = (e) => {
            e.preventDefault();
            this.isFocused = false;
            this.showDropdown = false;
        };
        this.getValueText = (optionValue) => {
            return this.options.find(o => o.value === optionValue).text;
        };
        this.handleRemoveSelectedItem = (optionValue) => {
            this.taSelect.emit(this.value.filter(o => o !== optionValue));
        };
        this.taSelect = createEvent(this, "taSelect", 7);
    }
    watchOptionsHandler(newValue, oldValue) {
        if (oldValue !== newValue) {
            this.filteredOptions = this.options;
        }
    }
    componentWillLoad() {
        this.filteredOptions = this.options;
    }
    get availableDropdownOptions() {
        return this.filteredOptions.filter(o => !this.value.includes(o.value));
    }
    render() {
        if (this.loading) {
            return (h(Host, null, h("div", { class: {
                    'ta-multi-select': true,
                    'is-active': this.isActive(),
                } }, h("ta-input", { disabled: true, loading: this.loading, label: this.label, value: this.searchQuery }), h("div", { class: {
                    'expand-arrow-icon': true,
                    'expanded': this.showDropdown,
                } }, h("ta-icon", { icon: 'expand-arrow' })))));
        }
        return (h(Host, null, h("div", { class: {
                'ta-multi-select': true,
                'is-active': this.isActive(),
            } }, h("ta-input", { loading: this.loading, label: this.label, value: this.searchQuery, onTaInput: this.handleOnInput, onFocus: this.handleOnFocus, onBlur: this.handleOnBlur }), h("div", { class: {
                'expand-arrow-icon': true,
                'expanded': this.showDropdown,
            } }, h("ta-icon", { icon: 'expand-arrow' })), h("div", { class: {
                'dropdown-menu-wrapper': true,
                'open': this.showDropdown,
            } }, h("div", { class: "dropdown-menu" }, this.getDropdownOptions()))), h("div", { class: "selected-items" }, this.value.map(o => (h("div", { class: "selected-item" }, h("span", null, this.getValueText(o)), h("ta-icon", { onClick: () => this.handleRemoveSelectedItem(o), icon: "cancel" })))))));
    }
    static get watchers() { return {
        "options": ["watchOptionsHandler"]
    }; }
};
MultiSelect.style = taMultiSelectCss;

export { MultiSelect as ta_multi_select };
