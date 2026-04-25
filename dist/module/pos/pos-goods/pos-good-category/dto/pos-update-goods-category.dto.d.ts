import { PosCreateGoodsCategoryDto } from './pos-create-goods-category.dto';
declare const PosUpdateGoodsCategoryDto_base: import("@nestjs/mapped-types").MappedType<Partial<PosCreateGoodsCategoryDto>>;
export declare class PosUpdateGoodsCategoryDto extends PosUpdateGoodsCategoryDto_base {
    _id: string;
    status: string;
}
export {};
