"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const size_limit_middleware_1 = require("./middleware/size-limit-middleware");
const multipart_1 = __importDefault(require("@fastify/multipart"));
const platform_fastify_1 = require("@nestjs/platform-fastify");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter({
        bodyLimit: 104857600,
    }));
    app.register(multipart_1.default, {
        limits: {
            fileSize: 104857600,
        },
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: false,
        transform: true,
    }));
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('PORT');
    app.enableCors({
        origin: ['*'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
        exposedHeaders: ['X-RateLimit-Limit', 'X-RateLimit-Remaining', 'X-RateLimit-Reset'],
    });
    app.use(new size_limit_middleware_1.SizeLimitMiddleware().use);
    await app.listen(port, '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map