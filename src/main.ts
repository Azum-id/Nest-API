// src/main.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import helmet from "helmet";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { TimeoutInterceptor } from "./common/interceptors/timeout.interceptor";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // 1. Disable Helmet's CSP so Swagger UI can load scripts/styles
    app.use(
        helmet({
            contentSecurityPolicy: false
        })
    );

    // 2. Enable CORS
    app.enableCors();

    // 3. Global validation pipe
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true
        })
    );

    // 4. Global filters & interceptors
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new TimeoutInterceptor());

    // 5. Swagger / OpenAPI setup
    const port = process.env.PORT || 3000;
    // If you know your VPS IP, you can set it here or via env (e.g. process.env.HOST_IP)
    const host = process.env.HOST_IP || "YOUR.VPS.IP.HERE";

    const config = new DocumentBuilder()
        .setTitle("Bilibili TV Anime API")
        .setDescription("API for fetching anime data from Bilibili TV")
        .setVersion("1.0.0")
        // 6. Tell Swagger UI how to reach the spec when browsing via IP
        .addServer(`http://${host}:${port}`)
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api-docs", app, document);

    await app.listen(port);
    console.log(`✔️  Server running on http://${host}:${port}`);
    console.log(
        `📖  Swagger docs available at http://${host}:${port}/api-docs`
    );
}

bootstrap();
