import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PdfModule } from './pdf/pdf.module';

@Module({
  imports: [UserModule, PdfModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
