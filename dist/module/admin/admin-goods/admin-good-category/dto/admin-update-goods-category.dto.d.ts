import { AdminCreateGoodsCategoryDto } from './admin-create-goods-category.dto';
declare const AdminUpdateGoodsCategoryDto_base: import("@nestjs/mapped-types").MappedType<Partial<AdminCreateGoodsCategoryDto>>;
export declare class AdminUpdateGoodsCategoryDto extends AdminUpdateGoodsCategoryDto_base {
    _id: string;
    status: string;
}
export {};
