import { Controller } from '@nestjs/common';
import { WidgetBlocksService } from './widget-blocks.service';

@Controller('api/widget-blocks')
export class WidgetBlocksController {
  constructor(private readonly widgetBlocksService: WidgetBlocksService) {}
}
