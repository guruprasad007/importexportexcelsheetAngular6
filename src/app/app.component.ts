import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { ExcelService } from 'src/app/excel.service';
import { ImportmenuexcelService } from 'src/app/importmenuexcel.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'excelfileupload';
  arrayBuffer: any;
  file: File;
  data: any = [{
    name: '',
    description: '',
    catageory_id: '',
    availability: '',
    price: ''
  }];
  constructor(private excelService: ExcelService,
    private importexcelfile: ImportmenuexcelService) {
  }
  menuitem_array = [];
  

  /* Import Excel File */
  incomingfile(event) {
    this.file = event.target.files[0];
  }

  Upload() {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      const data = new Uint8Array(this.arrayBuffer);
      // tslint:disable-next-line:prefer-const
      let arr = new Array();
      for (let i = 0; i !== data.length; ++i) { arr[i] = String.fromCharCode(data[i]); }
      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, {type: 'binary'});
      const first_sheet_name = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[first_sheet_name];
       XLSX.utils.sheet_to_json(worksheet, { raw: true});
    };
    debugger
    this.importexcelfile.addItem(this.menuitem_array).subscribe(data => {
      if(data.success){
debugger
      }else{
debugger
      }
    });
    debugger
    fileReader.readAsArrayBuffer(this.file);
  }
  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.data, 'Menu File');
  }
}
