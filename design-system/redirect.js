// Sends an old Storybook address on to the page that replaced it on the new
// documentation site. Storybook kept the page in the query string
// (?path=/docs/components-actions-button--docs, or iframe.html?id=...), so one
// script covers every address. The ids are those of the last Storybook build
// (design system 0.26.2) and do not change anymore.
(function () {
    var target = "https://design.digitaledienst.overheid.nl";

    // Storybook id, up to the "--", to the path on the new site.
    var pages = {
        "docs-introductie": "/aan-de-slag/",
        "docs-ontwerprichtlijnen": "/richtlijnen/",
        "docs-thema-s": "/themas/",
        "docs-iconen": "/iconen/",
        "docs-vertalingen": "/vertalingen/",
        "docs-breakpoints": "/breakpoints/",
        "docs-toegankelijkheid": "/toegankelijkheid/",
        "docs-changelog": "/changelog/",
        "components-actions-button": "/componenten/button/",
        "components-actions-button-bar": "/componenten/button-bar/",
        "components-actions-button-group": "/componenten/button-group/",
        "components-actions-icon-button": "/componenten/icon-button/",
        "components-actions-menu": "/componenten/menu/",
        "components-actions-split-button": "/componenten/split-button/",
        "components-actions-toolbar": "/componenten/toolbar/",
        "components-content-accordion": "/componenten/accordion/",
        "components-content-admonition": "/componenten/admonition/",
        "components-content-avatar": "/componenten/avatar/",
        "components-content-avatar-group": "/componenten/avatar-group/",
        "components-content-blockquote": "/componenten/blockquote/",
        "components-content-code-viewer": "/componenten/code-viewer/",
        "components-content-icon": "/componenten/icon/",
        "components-content-identity": "/componenten/identity/",
        "components-content-image": "/componenten/image/",
        "components-content-keyboard-shortcut": "/componenten/keyboard-shortcut/",
        "components-content-rich-text": "/componenten/rich-text/",
        "components-content-tag": "/componenten/tag/",
        "components-content-term": "/componenten/term/",
        "components-content-text": "/componenten/text/",
        "components-content-title": "/componenten/title/",
        "components-content-token": "/componenten/token/",
        "components-content-tooltip": "/componenten/tooltip/",
        "components-content-visually-hidden": "/componenten/visually-hidden/",
        "components-forms-form": "/componenten/form/",
        "components-forms-form-actions": "/componenten/form-actions/",
        "components-forms-form-field": "/componenten/form-field/",
        "components-forms-form-section": "/componenten/form-section/",
        "components-forms-validation-list": "/componenten/validation-list/",
        "components-inputs-checkbox": "/componenten/checkbox/",
        "components-inputs-checkbox-field": "/componenten/checkbox-field/",
        "components-inputs-checkbox-group": "/componenten/checkbox-group/",
        "components-inputs-code-editor": "/componenten/code-editor/",
        "components-inputs-combo-box": "/componenten/combo-box/",
        "components-inputs-date-field": "/componenten/date-field/",
        "components-inputs-date-picker": "/componenten/date-picker/",
        "components-inputs-dropdown": "/componenten/dropdown/",
        "components-inputs-file-field": "/componenten/file-field/",
        "components-inputs-multi-line-text-field": "/componenten/multi-line-text-field/",
        "components-inputs-number-field": "/componenten/number-field/",
        "components-inputs-one-time-code-field": "/componenten/one-time-code-field/",
        "components-inputs-password-field": "/componenten/password-field/",
        "components-inputs-radio-button": "/componenten/radio-button/",
        "components-inputs-radio-button-field": "/componenten/radio-button-field/",
        "components-inputs-radio-button-group": "/componenten/radio-button-group/",
        "components-inputs-search-field": "/componenten/search-field/",
        "components-inputs-segmented-control": "/componenten/segmented-control/",
        "components-inputs-slider": "/componenten/slider/",
        "components-inputs-stepper": "/componenten/stepper/",
        "components-inputs-swatch-picker": "/componenten/swatch-picker/",
        "components-inputs-switch": "/componenten/switch/",
        "components-inputs-switch-field": "/componenten/switch-field/",
        "components-inputs-text-editor": "/componenten/text-editor/",
        "components-inputs-text-field": "/componenten/text-field/",
        "components-inputs-time-field": "/componenten/time-field/",
        "components-inputs-time-picker": "/componenten/time-picker/",
        "components-inputs-toggle-button": "/componenten/toggle-button/",
        "components-inputs-toggle-button-group": "/componenten/toggle-button-group/",
        "components-inputs-token-field": "/componenten/token-field/",
        "components-layout-box": "/componenten/box/",
        "components-layout-card": "/componenten/card/",
        "components-layout-collection": "/componenten/collection/",
        "components-layout-container": "/componenten/container/",
        "components-layout-divider": "/componenten/divider/",
        "components-layout-kanban": "/componenten/kanban/",
        "components-layout-page": "/componenten/page/",
        "components-layout-page-footer": "/componenten/page-footer/",
        "components-layout-page-sections-full-bleed-section": "/componenten/full-bleed-section/",
        "components-layout-page-sections-hero": "/componenten/hero/",
        "components-layout-page-sections-one-half-one-half-section": "/componenten/one-half-one-half-section/",
        "components-layout-page-sections-one-third-two-thirds-section": "/componenten/one-third-two-thirds-section/",
        "components-layout-page-sections-sidebar-section": "/componenten/sidebar-section/",
        "components-layout-page-sections-simple-section": "/componenten/simple-section/",
        "components-layout-page-sections-two-thirds-one-third-section": "/componenten/two-thirds-one-third-section/",
        "components-layout-popover": "/componenten/popover/",
        "components-layout-sheet": "/componenten/sheet/",
        "components-layout-shell": "/componenten/shell/",
        "components-layout-spacer": "/componenten/spacer/",
        "components-layout-split-views-bar-split-view": "/componenten/bar-split-view/",
        "components-layout-split-views-navigation-split-view": "/componenten/navigation-split-view/",
        "components-layout-split-views-side-by-side-split-view": "/componenten/side-by-side-split-view/",
        "components-layout-split-views-split-view-divider": "/componenten/split-view-divider/",
        "components-layout-split-views-split-view-pane": "/componenten/split-view-pane/",
        "components-layout-split-views-stacked-split-view": "/componenten/stacked-split-view/",
        "components-layout-window": "/componenten/window/",
        "components-lists-tables-cells-cell": "/componenten/cell/",
        "components-lists-tables-cells-description-cell": "/componenten/description-cell/",
        "components-lists-tables-cells-icon-cell": "/componenten/icon-cell/",
        "components-lists-tables-cells-reorder-handle-cell": "/componenten/reorder-handle-cell/",
        "components-lists-tables-cells-spacer-cell": "/componenten/spacer-cell/",
        "components-lists-tables-cells-step-cell": "/componenten/step-cell/",
        "components-lists-tables-cells-text-cell": "/componenten/text-cell/",
        "components-lists-tables-cells-title-cell": "/componenten/title-cell/",
        "components-lists-tables-list": "/componenten/list/",
        "components-lists-tables-list-item": "/componenten/list-item/",
        "components-lists-tables-list-item-segment": "/componenten/list-item-segment/",
        "components-lists-tables-table": "/componenten/table/",
        "components-navigation-breadcrumbs": "/componenten/breadcrumbs/",
        "components-navigation-document-tab-bar": "/componenten/document-tab-bar/",
        "components-navigation-link": "/componenten/link/",
        "components-navigation-link-group": "/componenten/link-group/",
        "components-navigation-menu-bar": "/componenten/menu-bar/",
        "components-navigation-menu-bar-item": "/componenten/menu-bar-item/",
        "components-navigation-pagination": "/componenten/pagination/",
        "components-navigation-skip-link": "/componenten/skip-link/",
        "components-navigation-tab-bar": "/componenten/tab-bar/",
        "components-navigation-top-navigation-bar": "/componenten/top-navigation-bar/",
        "components-navigation-top-title-bar": "/componenten/top-title-bar/",
        "components-status-feedback-activity-indicator": "/componenten/activity-indicator/",
        "components-status-feedback-badge": "/componenten/badge/",
        "components-status-feedback-banner": "/componenten/banner/",
        "components-status-feedback-inline-dialog": "/componenten/inline-dialog/",
        "components-status-feedback-just-in-time-education": "/componenten/just-in-time-education/",
        "components-status-feedback-modal-dialog": "/componenten/modal-dialog/",
        "components-status-feedback-notification": "/componenten/notification/",
        "components-status-feedback-progress-bar": "/componenten/progress-bar/",
        "components-status-feedback-progress-circle": "/componenten/progress-circle/",
        "components-status-feedback-status-bar": "/componenten/status-bar/",
        "components-status-feedback-step-bar": "/componenten/step-bar/",
        "patronen-applicatie": "/patronen/application/",
        "patronen-bewerken-in-een-sheet": "/patronen/edit-in-a-sheet/",
        "patronen-filteren": "/patronen/filtering/",
        "patronen-formulier": "/patronen/form/",
        "patronen-lezen-in-een-sheet": "/patronen/read-in-a-sheet/",
        "patronen-lijst": "/patronen/list/",
        "patronen-menu-bij-een-knop": "/patronen/menu-from-a-button/",
        "patronen-onomkeerbare-actie": "/patronen/irreversible-action/",
        "patronen-pagina-s-contentpagina": "/patronen/content-page/",
        "patronen-pagina-s-home": "/patronen/home-page/",
        "patronen-pagina-s-navigatiepagina": "/patronen/navigation-page/",
        "patronen-pagina-s-onderwerppagina": "/patronen/topic-page/",
        "patronen-pagina-s-paginaopbouw": "/patronen/page-structure/",
        "patronen-werkbalk-met-acties": "/patronen/toolbar-with-actions/"
    };

    // An id from an older Storybook build still lands in the right section.
    var sections = {
        "components-": "/componenten/",
        "patronen-": "/patronen/",
        "docs-": "/documentatie/"
    };

    function pathFor(id) {
        if (!id) return "/";
        if (pages[id]) return pages[id];
        for (var prefix in sections) {
            if (id.indexOf(prefix) === 0) return sections[prefix];
        }
        return "/";
    }

    var query = new URLSearchParams(window.location.search);
    // ?path=/docs/<id>--docs and ?path=/story/<id>--<story>, or ?id=<id>--<story>.
    var address = query.get("path") || query.get("id") || "";
    var id = address.replace(/^\/(docs|story)\//, "").split("--")[0].toLowerCase();

    // The anchor goes along: the headings of the guidelines kept their ids, and
    // nldd lint of an older version links to them.
    window.location.replace(target + pathFor(id) + window.location.hash);
})();
