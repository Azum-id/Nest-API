// src/main.ts - Entry point
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import helmet from "helmet";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { TimeoutInterceptor } from "./common/interceptors/timeout.interceptor";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Global middlewares
    app.use(helmet());
    app.enableCors();

    // Global pipes
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true
        })
    );

    // Global filters and interceptors
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new TimeoutInterceptor());

    const port = process.env.PORT || 3000;
    await app.listen(port);

    // Swagger setup
    const config = new DocumentBuilder()
        .setTitle("Bilibili TV Anime API")
        .setDescription("API for fetching anime data from Bilibili TV")
        .setVersion("1.0.0")
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api-docs", app, document);

    console.log(`Server running on port ${port}`);
    console.log(
        `Swagger documentation available at http://localhost:${port}/api-docs`
    );
}
bootstrap();
