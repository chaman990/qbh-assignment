import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class PdfService {
  async generatePdf(user): Promise<string> {
    const doc = new PDFDocument();
    const filePath = 'example.pdf';
    doc.pipe(fs.createWriteStream(filePath));
    doc.fontSize(10).text(
      `Hi Name is ${user?.name}, you can send me mail at ${user?.email}
          and if possible call me at ${user?.phone}, or send me a letter at ${user?.address}
        `,
      100,
      100,
    );
    doc.end();
    return filePath;
  }
}
