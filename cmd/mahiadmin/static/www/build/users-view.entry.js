import { r as registerInstance, h, H as Host } from './index-d067c2a6.js';
import './index-37baca77.js';
import './base-fd95655b.js';
import { t as toastr } from './index-61f3bdea.js';
import { U as UserService } from './index-8346a309.js';

const usersViewCss = ":host{display:block}.users-wrapper{display:grid;grid-template-columns:auto auto auto auto;grid-gap:20px}.users-wrapper.full-width{grid-template-columns:auto}a{text-decoration:none;color:inherit}.page-actions{display:flex}ta-icon{opacity:.5;cursor:pointer}ta-icon.selected{opacity:1}ta-icon:nth-child(2){margin-left:17px}@media (max-width: 1400px){.users-wrapper{grid-template-columns:auto auto auto}}@media (max-width: 1140px){.users-wrapper{grid-template-columns:auto auto}}@media (max-width: 1080px){.users-wrapper{grid-template-columns:auto auto auto}}@media (max-width: 866px){.users-wrapper{grid-template-columns:auto auto}}@media (max-width: 600px){.users-wrapper{grid-template-columns:auto}}";

const usersViewTypeKey = 'usersViewType';
const UsersView = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.users = [];
        this.fetchingApi = false;
        this.userView = localStorage.getItem(usersViewTypeKey) || 'card';
        this.loadUsers = () => {
            this.fetchingApi = true;
            UserService()
                .listSpaceUsers()
                .then(this.handleSuccess)
                .catch(this.handleError)
                .finally(() => this.fetchingApi = false);
        };
        this.handleSuccess = (resp) => {
            this.users = resp.data;
        };
        this.handleError = (err) => {
            if (!err.error) {
                toastr().danger('Oops! Something went wrong. Please refresh and try again');
                return console.log(err);
            }
            toastr().danger(err.error);
        };
        this.updateUserView = (type) => {
            this.userView = type;
            localStorage.setItem(usersViewTypeKey, type);
        };
    }
    listenUserWasCreated(e) {
        this.users = [e.detail, ...this.users];
    }
    listenUserWasUpdated(e) {
        const newUsersValue = this.users.map(u => {
            if (u.id !== e.detail.id)
                return u;
            return e.detail;
        });
        this.users = newUsersValue;
    }
    listenUserWasDeleted(e) {
        this.users = this.users.filter(u => u.id !== e.detail);
    }
    componentWillLoad() {
        this.loadUsers();
    }
    render() {
        const pathname = this.history.location.pathname;
        return (h(Host, null, h("ta-app-page", null, h("ta-page-header", { pageTitle: "Users" }, h("div", { slot: "right" }, h("div", { class: "page-actions" }, h("ta-icon", { onClick: () => this.updateUserView('card'), class: { 'selected': this.userView === 'card' }, icon: 'card' }), h("ta-icon", { icon: 'list', onClick: () => this.updateUserView('list'), class: { 'selected': this.userView === 'list' } })))), this.fetchingApi ? h("ta-loader", null) :
            h("div", { class: {
                    'users-wrapper': true,
                    'full-width': this.userView === 'list'
                } }, h("stencil-route-link", { url: `${pathname}#createUser` }, this.userView === 'card' ? h("ta-user-card", { create: true }) : h("ta-user-list-card", { create: true })), this.users.map((u) => (this.userView === 'card' ? h("ta-user-card", { user: u }) : h("ta-user-list-card", { user: u })))))));
    }
};
UsersView.style = usersViewCss;

export { UsersView as users_view };
