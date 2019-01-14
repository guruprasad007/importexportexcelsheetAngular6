import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { ExcelService } from 'src/app/excel.service';
import { ImportmenuexcelService } from 'src/app/importmenuexcel.service';
import { ArrayType } from '@angular/compiler/src/output/output_ast';
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
  data_array = [];


  /* Import Excel File */
  incomingfile(event) {
    this.file = event.target.files[0];
  }

  Upload() {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      
       this.excelService.getDataArray(this.arrayBuffer).then(array => {
        this.sendDataArray(array);
       }).catch(error => {
         console.log(error);
       });
    };
    fileReader.readAsArrayBuffer(this.file);
  }

  sendDataArray(menuitem_array) {
    this.importexcelfile.addItem(menuitem_array).subscribe(data => {
      if (data.success) {
      } else {
      }
    });
  }
  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.data, 'Menu File');
  }
}
