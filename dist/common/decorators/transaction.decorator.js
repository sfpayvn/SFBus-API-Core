"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transactional = Transactional;
function Transactional() {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args) {
            const session = await this.busProvinceModel.startSession();
            session.startTransaction();
            try {
                args.push(session);
                const result = await originalMethod.apply(this, args);
                await session.commitTransaction();
                return result;
            }
            catch (error) {
                await session.abortTransaction();
                throw error;
            }
            finally {
                await session.endSession();
            }
        };
        return descriptor;
    };
}
//# sourceMappingURL=transaction.decorator.js.map