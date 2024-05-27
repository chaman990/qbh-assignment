import { Component, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/models/users.model';
import { PdfService } from 'src/app/services/pdf.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  @Output() setEditUser = new EventEmitter<User>();
  constructor(
    private userService: UserService,
    private pdfService: PdfService
  ) {
    this.userService.getUsers();
  }

  pdfs: {
    [key: number]: { url: string; showViewer: boolean; originalcontent: any };
  } = {};

  users$ = this.userService.users.asObservable();
  deleteUser(userId: number) {
    this.userService.deleteUser(userId);
  }

  editUser(user: User) {
    this.setEditUser.emit(user);
  }

  generatePdf(user: User) {
    this.pdfService.generatePdf(user).subscribe((res) => {
      console.warn(res);
      var fileURL = URL.createObjectURL(res);
      this.pdfs = {
        ...this.pdfs,
        [user.id]: { url: fileURL, showViewer: false, originalcontent: res },
      };
      return fileURL;
    });
  }
  downloadPdf(url: string) {
    window.open(url);
  }
  viewPdf(originalcontent: Blob, id: number) {
    let src;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const src = new Uint8Array(fileReader.result as ArrayBuffer);
      this.pdfs[id].originalcontent = src;
      this.pdfs[id].showViewer = true;
    };
    fileReader.readAsArrayBuffer(originalcontent);
  }
}
