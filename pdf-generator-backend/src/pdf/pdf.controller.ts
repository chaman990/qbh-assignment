import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { PdfService } from './pdf.service';
import { UserService } from 'src/user/user.service';

@Controller('pdf')
export class PdfController {
  constructor(
    private readonly pdfService: PdfService,
    private userService: UserService,
  ) {}

  @Get()
  async generatePdf(@Query() {user}, @Res() res: Response): Promise<void> {
    console.warn(user);
    
    const data = JSON.parse(user || {});
    const filePath = await this.pdfService.generatePdf(data);
    console.log(filePath);
    res.download(filePath);
  }
}
