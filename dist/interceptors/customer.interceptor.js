"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var CustomInterceptor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomInterceptor = exports.defaultErrorHandler = exports.defaultResponseHandler = exports.defaultRequestHandler = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
function isValidDateTime(value) {
    if (typeof value !== 'string')
        return false;
    const formats = [
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(Z|[\+\-]\d{2}:\d{2})?$/,
        /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,
        /^\d{4}-\d{2}-\d{2}$/,
        /^\d{2}[\/\-]\d{2}[\/\-]\d{4}$/,
        /^[a-zA-Z]{3}, \d{2} [a-zA-Z]{3} \d{4} \d{2}:\d{2}:\d{2} (GMT|UTC)([\+\-]\d{4})?$/,
        /^[a-zA-Z]{3}, \d{2} [a-zA-Z]{3} \d{4} \d{2}:\d{2}:\d{2} GMT [A-Za-z ]+$/,
        /^[a-zA-Z]{3} [a-zA-Z]{3} \d{2} \d{4} \d{2}:\d{2}:\d{2} GMT[\+\-]\d{4} \([^)]+\)$/,
    ];
    const matchesFormat = formats.some((regex) => regex.test(value));
    if (!matchesFormat)
        return false;
    const parsedDate = Date.parse(value);
    return !isNaN(parsedDate);
}
const toDate = (str) => new Date(Date.parse(str));
function convertDatesToISO(obj) {
    if (Array.isArray(obj)) {
        return obj.map(item => typeof item === 'object' && item !== null ? convertDatesToISO(item) : item);
    }
    const result = {};
    Object.keys(obj).forEach(key => {
        const value = obj[key];
        if (value instanceof Date || isValidDateTime(value)) {
            result[key] = toDate(value).toISOString();
        }
        else if (Array.isArray(value)) {
            result[key] = value.map(item => typeof item === 'object' && item !== null ? convertDatesToISO(item) : item);
        }
        else if (typeof value === 'object' && value !== null) {
            result[key] = convertDatesToISO(value);
        }
        else {
            result[key] = value;
        }
    });
    return result;
}
const defaultRequestHandler = (request, logger) => {
    if (request.query && request.query !== null) {
        request.query = convertDatesToISO(request.query);
    }
    if (request.body && request.body !== null) {
        request.body = convertDatesToISO(request.body);
    }
};
exports.defaultRequestHandler = defaultRequestHandler;
const defaultResponseHandler = (request, response, _body, logger) => {
    logger.log(`RESPONSE: ${request.method} ${request.url} => ${response.statusCode}`);
};
exports.defaultResponseHandler = defaultResponseHandler;
const defaultErrorHandler = (request, error, logger) => {
    if (error instanceof common_1.HttpException) {
        const statusCode = error.getStatus();
        const message = `ERROR: ${request.method} ${request.url} => ${statusCode}`;
        if (statusCode >= common_1.HttpStatus.INTERNAL_SERVER_ERROR) {
            logger.error({ message, error }, error.stack);
        }
        else {
            logger.warn({ message, error });
        }
    }
    else {
        logger.error({ message: `ERROR: ${request.method} ${request.url}` }, error.stack);
    }
};
exports.defaultErrorHandler = defaultErrorHandler;
let CustomInterceptor = CustomInterceptor_1 = class CustomInterceptor {
    constructor(config) {
        const partialConfig = typeof config === 'string' ? { context: config } : { ...config };
        this.config = {
            ...partialConfig,
            requestHandler: partialConfig.requestHandler ?? exports.defaultRequestHandler,
            responseHandler: partialConfig.responseHandler ?? exports.defaultResponseHandler,
            errorHandler: partialConfig.errorHandler ?? exports.defaultErrorHandler,
            context: partialConfig.context || CustomInterceptor_1.name,
        };
        this.logger = new common_1.Logger(this.config.context);
    }
    intercept(context, callHandler) {
        if (this.config.requestHandler) {
            const request = context.switchToHttp().getRequest();
            this.config.requestHandler(request, this.logger);
        }
        return callHandler.handle().pipe((0, operators_1.tap)({
            next: (val) => this.logNext(val, context),
            error: (err) => this.logError(err, context),
        }));
    }
    logNext(body, context) {
        if (this.config.responseHandler) {
            const request = context.switchToHttp().getRequest();
            const response = context.switchToHttp().getResponse();
            this.config.responseHandler(request, response, body, this.logger);
        }
    }
    logError(error, context) {
        const request = context.switchToHttp().getRequest();
        if (this.config.errorHandler) {
            this.config.errorHandler(request, error, this.logger);
        }
    }
};
exports.CustomInterceptor = CustomInterceptor;
exports.CustomInterceptor = CustomInterceptor = CustomInterceptor_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Optional)()),
    __metadata("design:paramtypes", [Object])
], CustomInterceptor);
//# sourceMappingURL=customer.interceptor.js.map