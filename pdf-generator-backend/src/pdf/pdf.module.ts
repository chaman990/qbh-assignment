import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { PdfController } from './pdf.controller';
import { UserService } from 'src/user/user.service';

@Module({
  providers: [PdfService, UserService],
  controllers: [PdfController]
})
export class PdfModule {}
