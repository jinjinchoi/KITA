import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";


export function setupSwagger(app:INestApplication): void {
    const options = new DocumentBuilder()
    .setTitle("테스트 화면")
    .setDescription("정상 작동되는 지 확인")
    .setVersion("1.0")
    .addTag("board")
    .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup("test", app, document);
}