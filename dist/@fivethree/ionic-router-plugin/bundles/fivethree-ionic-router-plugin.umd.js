(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('@fivethree/ionic-router-plugin', ['exports', '@angular/core'], factory) :
    (factory((global.fivethree = global.fivethree || {}, global.fivethree['ionic-router-plugin'] = {}),global.ng.core));
}(this, (function (exports,i0) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var IonicRouterPluginService = /** @class */ (function () {
        function IonicRouterPluginService() {
        }
        IonicRouterPluginService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        IonicRouterPluginService.ctorParameters = function () { return []; };
        /** @nocollapse */ IonicRouterPluginService.ngInjectableDef = i0.defineInjectable({ factory: function IonicRouterPluginService_Factory() { return new IonicRouterPluginService(); }, token: IonicRouterPluginService, providedIn: "root" });
        return IonicRouterPluginService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var IonicRouterPluginComponent = /** @class */ (function () {
        function IonicRouterPluginComponent() {
        }
        /**
         * @return {?}
         */
        IonicRouterPluginComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
            };
        IonicRouterPluginComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'ionic-router-plugin-ionic-router-plugin',
                        template: "\n    <p>\n      ionic-router-plugin works!\n    </p>\n  "
                    }] }
        ];
        /** @nocollapse */
        IonicRouterPluginComponent.ctorParameters = function () { return []; };
        return IonicRouterPluginComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var IonicRouterPluginModule = /** @class */ (function () {
        function IonicRouterPluginModule() {
        }
        IonicRouterPluginModule.decorators = [
            { type: i0.NgModule, args: [{
                        declarations: [IonicRouterPluginComponent],
                        imports: [],
                        exports: [IonicRouterPluginComponent]
                    },] }
        ];
        return IonicRouterPluginModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.IonicRouterPluginService = IonicRouterPluginService;
    exports.IonicRouterPluginComponent = IonicRouterPluginComponent;
    exports.IonicRouterPluginModule = IonicRouterPluginModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=fivethree-ionic-router-plugin.umd.js.map