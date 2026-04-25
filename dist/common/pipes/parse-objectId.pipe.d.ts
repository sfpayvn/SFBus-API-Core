import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
export declare class ParseObjectIdPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any;
    private parseValue;
    private isValidObjectId;
}
