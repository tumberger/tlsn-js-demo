"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var tlsn_extension_rs_1 = require("../wasm/prover/pkg/tlsn_extension_rs");
var TLSN = /** @class */ (function () {
    function TLSN() {
        var _this = this;
        console.log('worker module initiated.');
        this.startPromise = new Promise(function (resolve) {
            _this.resolveStart = resolve;
        });
        this.start();
    }
    TLSN.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var numConcurrency, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('start');
                        numConcurrency = navigator.hardwareConcurrency;
                        console.log('!@# navigator.hardwareConcurrency=', numConcurrency);
                        return [4 /*yield*/, (0, tlsn_extension_rs_1["default"])()];
                    case 1:
                        res = _a.sent();
                        console.log('!@# res.memory=', res.memory);
                        // 6422528 ~= 6.12 mb
                        console.log('!@# res.memory.buffer.length=', res.memory.buffer.byteLength);
                        return [4 /*yield*/, (0, tlsn_extension_rs_1.initThreadPool)(numConcurrency)];
                    case 2:
                        _a.sent();
                        this.resolveStart();
                        return [2 /*return*/];
                }
            });
        });
    };
    TLSN.prototype.waitForStart = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.startPromise];
            });
        });
    };
    TLSN.prototype.prover = function (url, options) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var resProver, resJSON, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.waitForStart()];
                    case 1:
                        _c.sent();
                        console.log('worker', url, __assign(__assign({}, options), { notaryUrl: options === null || options === void 0 ? void 0 : options.notaryUrl, websocketProxyUrl: options === null || options === void 0 ? void 0 : options.websocketProxyUrl }));
                        return [4 /*yield*/, (0, tlsn_extension_rs_1.prover)(url, __assign(__assign({}, options), { notaryUrl: options === null || options === void 0 ? void 0 : options.notaryUrl, websocketProxyUrl: options === null || options === void 0 ? void 0 : options.websocketProxyUrl }), (options === null || options === void 0 ? void 0 : options.secretHeaders) || [], (options === null || options === void 0 ? void 0 : options.secretResps) || [])];
                    case 2:
                        resProver = _c.sent();
                        resJSON = JSON.parse(resProver);
                        console.log('!@# resProver,resJSON=', { resProver: resProver, resJSON: resJSON });
                        console.log('!@# resAfter.memory=', resJSON.memory);
                        // 1105920000 ~= 1.03 gb
                        console.log('!@# resAfter.memory.buffer.length=', (_b = (_a = resJSON.memory) === null || _a === void 0 ? void 0 : _a.buffer) === null || _b === void 0 ? void 0 : _b.byteLength);
                        return [2 /*return*/, resJSON];
                    case 3:
                        e_1 = _c.sent();
                        console.log(e_1);
                        return [2 /*return*/, e_1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TLSN.prototype.verify = function (proof, pubkey) {
        return __awaiter(this, void 0, void 0, function () {
            var raw;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.waitForStart()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, tlsn_extension_rs_1.verify)(JSON.stringify(proof), pubkey)];
                    case 2:
                        raw = _a.sent();
                        return [2 /*return*/, JSON.parse(raw)];
                }
            });
        });
    };
    return TLSN;
}());
exports["default"] = TLSN;
