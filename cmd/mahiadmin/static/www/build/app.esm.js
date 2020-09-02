import { p as patchBrowser, b as bootstrapLazy } from './index-d067c2a6.js';
import { g as globalScripts } from './app-globals-b2ffd28d.js';

patchBrowser().then(options => {
  globalScripts();
  return bootstrapLazy([["settings-view",[[1,"settings-view",{"history":[16],"selectedTab":[32]}]]],["app-root",[[1,"app-root"]]],["application-details-view",[[0,"application-details-view",{"history":[16],"match":[16],"application":[32],"files":[32],"fetchingApi":[32],"searchQuery":[32]},[[8,"taFileWasDeleted","listenFileWasDeleted"]]]]],["dashboard-view",[[0,"dashboard-view",{"usages":[32],"fetchingApi":[32],"reFetchingUsages":[32],"dateRange":[32],"totalDue":[32]}]]],["applications-view",[[1,"applications-view",{"history":[16],"applications":[32],"fetchingApi":[32],"applicationView":[32]},[[8,"taApplicationWasUpdated","listenApplicationWasUpdated"],[8,"taApplicationWasDeleted","listenApplicationWasDeleted"]]]]],["create-application-view",[[1,"create-application-view",{"history":[16],"newApplication":[32],"formErr":[32],"creatingApplication":[32],"spaceUsersOptions":[32]}]]],["edit-application-view",[[1,"edit-application-view",{"history":[16],"fetchingApplication":[32],"application":[32],"fetchingUsers":[32],"spaceUsersOptions":[32],"formErr":[32],"updatingApplication":[32]}]]],["create-user-view",[[1,"create-user-view",{"history":[16],"newUser":[32],"formErr":[32],"creatingUser":[32],"fullName":[32]}]]],["ta-user-card",[[1,"ta-user-card",{"user":[16],"create":[4],"history":[16],"displayConfirmModal":[32],"deletingUser":[32],"isMenuShown":[32]}]]],["ta-user-list-card",[[1,"ta-user-list-card",{"user":[16],"create":[4],"history":[16],"displayConfirmModal":[32],"deletingUser":[32],"isMenuShown":[32]}]]],["ta-avatar-list",[[1,"ta-avatar-list",{"items":[16],"size":[1]}]]],["context-consumer",[[0,"context-consumer",{"context":[16],"renderer":[16],"subscribe":[16],"unsubscribe":[32]}]]],["stencil-async-content",[[0,"stencil-async-content",{"documentLocation":[1,"document-location"],"content":[32]}]]],["stencil-route-title",[[0,"stencil-route-title",{"titleSuffix":[1,"title-suffix"],"pageTitle":[1,"page-title"]}]]],["stencil-router-prompt",[[0,"stencil-router-prompt",{"when":[4],"message":[1],"history":[16],"unblock":[32]}]]],["stencil-router-redirect",[[0,"stencil-router-redirect",{"history":[16],"root":[1],"url":[1]}]]],["ta-checkbox",[[1,"ta-checkbox",{"label":[1],"initialChecked":[4,"initial-checked"]}]]],["billing-setting-view",[[1,"billing-setting-view",{"cards":[32],"fetchingCards":[32],"creatingCard":[32],"formError":[32]}]]],["ta-app-layout",[[1,"ta-app-layout",{"drawerOpen":[32]}]]],["ta-recent-applications-list",[[1,"ta-recent-applications-list",{"fetchingApi":[32],"applications":[32]}]]],["ta-application-list-card",[[1,"ta-application-list-card",{"application":[16],"create":[4],"history":[16],"deletingApplication":[32],"displayConfirmModal":[32],"verifyDeleteText":[32],"isMenuShown":[32]}]]],["personal-setting-view",[[1,"personal-setting-view",{"me":[32],"formErr":[32],"updatingUser":[32],"updatePasswordState":[32]}]]],["space-setting-view",[[1,"space-setting-view",{"space":[32],"updatingSpace":[32],"formErr":[32]}]]],["ta-dragger",[[1,"ta-dragger",{"applicationId":[1,"application-id"],"dragging":[32],"previewFiles":[32]}]]],["ta-file-card",[[1,"ta-file-card",{"file":[16],"displayConfirmModal":[32],"deletingFile":[32]}]]],["application-details-sidebar",[[1,"application-details-sidebar",{"application":[16]}]]],["ta-multi-select",[[1,"ta-multi-select",{"label":[1],"value":[16],"options":[16],"loading":[4],"isFocused":[32],"searchQuery":[32],"showDropdown":[32],"filteredOptions":[32]}]]],["ta-drawers",[[1,"ta-drawers",{"history":[16],"routeId":[2,"route-id"],"showDrawer":[32],"component":[32]}]]],["ta-select",[[1,"ta-select",{"placeholder":[1],"value":[8],"error":[1],"dropdownOpen":[32],"label":[32]},[[8,"click","handleWindowClick"]]]]],["ta-stat-card",[[1,"ta-stat-card",{"icon":[1],"label":[1],"value":[1]}]]],["custom-storage-engine-input",[[1,"custom-storage-engine-input",{"value":[1],"exceptions":[16]}]]],["stencil-route",[[0,"stencil-route",{"group":[513],"componentUpdated":[16],"match":[1040],"url":[1],"component":[1],"componentProps":[16],"exact":[4],"routeRender":[16],"scrollTopOffset":[2,"scroll-top-offset"],"routeViewsUpdated":[16],"location":[16],"history":[16],"historyType":[1,"history-type"]}]]],["stencil-route-switch",[[4,"stencil-route-switch",{"group":[513],"scrollTopOffset":[2,"scroll-top-offset"],"location":[16],"routeViewsUpdated":[16]}]]],["stencil-router",[[4,"stencil-router",{"root":[1],"historyType":[1,"history-type"],"titleSuffix":[1,"title-suffix"],"scrollTopOffset":[2,"scroll-top-offset"],"location":[32],"history":[32]}]]],["ta-line-graph",[[1,"ta-line-graph",{"labels":[16],"datasets":[16]}]]],["ta-select-option",[[1,"ta-select-option",{"value":[8],"label":[1],"selected":[32],"select":[64],"deselect":[64]}]]],["ta-switch-button",[[1,"ta-switch-button",{"label":[1],"initialChecked":[4,"initial-checked"],"noLabel":[1,"no-label"],"yesLabel":[1,"yes-label"]}]]],["ta-tab-body",[[1,"ta-tab-body",{"tab":[1],"isActive":[32],"activate":[64],"deactivate":[64]}]]],["ta-tab-header",[[1,"ta-tab-header",{"tab":[1],"isActive":[32],"activate":[64],"deactivate":[64]}]]],["ta-tab-header-bar",[[1,"ta-tab-header-bar"]]],["ta-tabs",[[1,"ta-tabs",{"initialValue":[1,"initial-value"]}]]],["ta-icon",[[1,"ta-icon",{"icon":[1]}]]],["ta-sidebar",[[1,"ta-sidebar",{"history":[16],"isMenuShown":[32]}]]],["ta-nav-drawer",[[0,"ta-nav-drawer",{"open":[4]}]]],["ta-billing-card",[[1,"ta-billing-card",{"card":[16],"isMenuShown":[32]}]]],["ta-dragger-preview-file",[[1,"ta-dragger-preview-file",{"file":[16]}]]],["ta-drawer",[[1,"ta-drawer",{"open":[4]}]]],["ta-textarea",[[1,"ta-textarea",{"value":[1],"label":[1],"error":[1],"rows":[2],"isFocused":[32]}]]],["ta-tooltip",[[1,"ta-tooltip",{"text":[1]}]]],["ta-topbar",[[1,"ta-topbar"]]],["ta-application-card",[[1,"ta-application-card",{"application":[16],"create":[4],"history":[16],"deletingApplication":[32],"displayConfirmModal":[32],"verifyDeleteText":[32],"isMenuShown":[32]}]]],["ta-avatar",[[1,"ta-avatar",{"size":[1],"color":[1],"text":[1]}]]],["ta-progress",[[1,"ta-progress",{"value":[2],"size":[2]}]]],["ta-sidebar-item",[[1,"ta-sidebar-item",{"to":[1],"icon":[1]}]]],["ta-form-label",[[1,"ta-form-label"]]],["ta-page-header",[[1,"ta-page-header",{"pageTitle":[1,"page-title"]}]]],["ta-app-page",[[1,"ta-app-page"]]],["ta-error",[[1,"ta-error",{"error":[1]}]]],["ta-form",[[1,"ta-form",null,[[0,"keyup","handleKeyUpEvent"]]]]],["ta-card",[[1,"ta-card"]]],["ta-loader",[[1,"ta-loader"]]],["ta-button",[[1,"ta-button",{"loading":[4],"type":[1],"small":[4],"color":[1],"disabled":[4]}]]],["ta-modal",[[1,"ta-modal",{"loading":[4],"titleText":[1,"title-text"],"bodyText":[1,"body-text"],"confirmBtnText":[1,"confirm-btn-text"],"cancelBtnText":[1,"cancel-btn-text"],"display":[4],"useDefaultFooter":[4,"use-default-footer"]}]]],["stencil-route-link",[[4,"stencil-route-link",{"url":[1],"urlMatch":[1,"url-match"],"activeClass":[1,"active-class"],"exact":[4],"strict":[4],"custom":[1],"anchorClass":[1,"anchor-class"],"anchorRole":[1,"anchor-role"],"anchorTitle":[1,"anchor-title"],"anchorTabIndex":[1,"anchor-tab-index"],"anchorId":[1,"anchor-id"],"history":[16],"location":[16],"root":[1],"ariaHaspopup":[1,"aria-haspopup"],"ariaPosinset":[1,"aria-posinset"],"ariaSetsize":[2,"aria-setsize"],"ariaLabel":[1,"aria-label"],"match":[32]}]]],["ta-input",[[1,"ta-input",{"value":[1],"label":[1],"type":[1],"error":[1],"loading":[4],"disabled":[4],"isFocused":[32],"showCleartext":[32]}]]],["ta-dropdown",[[4,"ta-dropdown",{"overlay":[16],"showOverlay":[32],"width":[32],"close":[64]},[[8,"click","handleWindowClick"]]]]]], options);
});
