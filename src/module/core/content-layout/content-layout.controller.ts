import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { ContentLayoutService } from './content-layout.service';
import { CreateContentLayoutDto } from './dto/create-content-layout.dto';
import { UpdateContentLayoutDto } from './dto/update-content-layout.dto';

@Controller('content-layout')
export class ContentLayoutController {
  constructor(private readonly contentLayoutService: ContentLayoutService) {}
}
