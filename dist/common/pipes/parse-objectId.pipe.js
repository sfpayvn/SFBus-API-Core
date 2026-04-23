"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseObjectIdPipe = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
let ParseObjectIdPipe = class ParseObjectIdPipe {
    transform(value, metadata) {
        return this.parseValue(value);
    }
    parseValue(value) {
        if (Array.isArray(value)) {
            return value.map((item) => this.parseValue(item)).filter((v) => v !== undefined);
        }
        else if (typeof value === 'object' && value !== null) {
            Object.keys(value).forEach((key) => {
                const parsed = this.parseValue(value[key]);
                if (parsed === undefined) {
                    delete value[key];
                }
                else {
                    value[key] = parsed;
                }
            });
            return value;
        }
        else if (this.isValidObjectId(value)) {
            return new mongoose_1.Types.ObjectId(value);
        }
        else if (value === '') {
            return undefined;
        }
        else {
            return value;
        }
    }
    isValidObjectId(id) {
        return mongoose_1.Types.ObjectId.isValid(id) && new mongoose_1.Types.ObjectId(id).toString() === id;
    }
};
exports.ParseObjectIdPipe = ParseObjectIdPipe;
exports.ParseObjectIdPipe = ParseObjectIdPipe = __decorate([
    (0, common_1.Injectable)()
], ParseObjectIdPipe);
//# sourceMappingURL=parse-objectId.pipe.js.map