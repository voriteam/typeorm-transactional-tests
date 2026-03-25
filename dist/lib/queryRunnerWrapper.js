"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrap = void 0;
var wrap = function (originalQueryRunner) {
    var originalRelease = originalQueryRunner.release.bind(originalQueryRunner);
    originalQueryRunner.release = function () {
        return Promise.resolve();
    };
    originalQueryRunner.releaseQueryRunner = function () {
        originalQueryRunner.release = originalRelease;
        return originalQueryRunner.release();
    };
    return originalQueryRunner;
};
exports.wrap = wrap;
//# sourceMappingURL=queryRunnerWrapper.js.map