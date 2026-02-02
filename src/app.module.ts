import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AdminModule } from './module/admin/admin.module';
import { PosModule } from './module/pos/pos.module';
import { ClientModule } from './module/client/client.module';
import { DriverModule } from './module/driver/driver.module';

import { parseModules } from './common/module-flags';
import { CoreModule } from './module/core/core.module';

const enabled = parseModules(process.env.APP_MODULES);

// Luôn có Core (tuỳ bạn)
const featureModules = [
  enabled.has('admin') ? AdminModule : null,
  enabled.has('pos') ? PosModule : null,
  enabled.has('client') ? ClientModule : null,
  enabled.has('driver') ? DriverModule : null,
].filter(Boolean) as any[];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    CoreModule,
    ...featureModules,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
