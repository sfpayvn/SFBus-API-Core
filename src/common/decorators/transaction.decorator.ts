import { ClientSession } from 'mongoose';

export function Transactional() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const session: ClientSession = await this.busProvinceModel.startSession();
      session.startTransaction();

      try {
        // Thêm session vào arguments cuối cùng
        args.push(session);
        const result = await originalMethod.apply(this, args);
        await session.commitTransaction();
        return result;
      } catch (error) {
        await session.abortTransaction();
        throw error;
      } finally {
        await session.endSession();
      }
    };

    return descriptor;
  };
}
