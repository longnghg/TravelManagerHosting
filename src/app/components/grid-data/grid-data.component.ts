import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
const FILTER_PAG_REGEX = /[^0-9]/g;
@Component({
  selector: 'app-grid-data',
  templateUrl: './grid-data.component.html',
  styleUrls: ['./grid-data.component.scss']
})
export class GridDataComponent implements OnInit {
  @Input() rowData: any
  @Input() columnDefs: ColDef[]
  @Input() gridConfig: GridConfig
  @Output() gdSearch = new EventEmitter<any>()
  @Output() gdChecked = new EventEmitter<any>()
  @Output() gdDelete = new EventEmitter<any>()
  @Output() gdApprove = new EventEmitter<any>()
  @Output() gdRestore = new EventEmitter<any>()
  @Output() gdChild = new EventEmitter<any>()
  @Output() gdType = new EventEmitter<any>()
  totalResult: number
  rowDataRestore: any
  pageCount: number
  listPageSize = [1, 2, 5, 10, 15, 20, 25, 30]
  pageSize: number = 15
  index: number = 0
  pageNumber: number = 1
  start: number = 0
  end: number = 0
  btnPrev: boolean = false
  btnNext: boolean = true
  keyword: any = []
  constructor(){}
  ngOnInit(): void {
  }
  ngOnChanges(): void {
    this.calTotalResult()
    this.calStartEnd()
  }

  calStartEnd(){
    this.start = ((this.pageNumber - 1) * this.pageSize) + 1
    this.end = this.start + this.pageSize - 1
  }
  calTotalResult(){
    if (this.rowData) {
      for (let index = 0; index < this.rowData.length; index++) {
        this.rowData[index].rowNum = index+1
      }
      this.totalResult = this.rowData.length
      if(this.totalResult % this.pageSize == 0){
        this.pageCount = this.totalResult / this.pageSize
      }
      else{
        this.pageCount = Math.floor(this.totalResult / this.pageSize + 1)
      }

      if (this.pageCount == 1) {
         this.btnNext = false
      }
      else{
        this.btnNext = true
      }
      this.index = (this.pageNumber - 1) * this.pageSize
    }
  }
  selectPage(page: string, type: string) {
    var index = parseInt(page)
    if (type == 'prev' && index > 1) {
      this.pageNumber = index - 1
    }
    else if(type == 'next' && index < this.pageCount){
      this.pageNumber = index + 1
    }
    else if(type == 'nextAll'){
      this.pageNumber = this.pageCount
    }
    else if (type == 'prevAll') {
      this.pageNumber = 1
    }
    else{
      if (index > this.pageCount) {
        this.pageNumber = this.pageCount
      }
      else if (index == 0){
        this.pageNumber = 1
      }
      else{
        this.pageNumber = index
      }
    }

    if (this.pageNumber == 1) {
      this.btnPrev = false
    }
    else{
      this.btnPrev = true
    }

    if (this.pageNumber == this.pageCount) {
      this.btnNext = false
    }
    else{
      this.btnNext = true
    }

    this.calTotalResult()
    this.calStartEnd()
  }

  formatInput(input: HTMLInputElement, keyword?: any, column?: any, type?: string) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
    if (input.value) {
      if (type == "price") {
        keyword[column] = Number(input.value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace(".00", "")
      }
      else{
        keyword[column] = input.value
      }
    }
    else{
      keyword[column] = input.value
    }
  }

  changePageSize(){
    this.calTotalResult()
    this.calStartEnd()
  }

  selectSection(name){
    var kw = ""
     var i = 0
     if (this.keyword[name+'Tmp']) {
       if (this.keyword[name+'Tmp'].length > 0) {
         this.keyword[name+'Tmp'].forEach(item => {

           if ( i < this.keyword[name+'Tmp'].length-1) {
             kw += item + ","
           }
           else{
             kw += item
           }
           i++
         });
       }
       else{
         kw = this.keyword[name+'Tmp']
       }
     }
     else{
       kw = this.keyword[name+'Tmp']
     }
     this.keyword[name] = kw
     this.setCache()
   }


  search(name){
    this.setCache()
  }
  changeChecked(){
    if (this.gridConfig.isRestore) {
      this.gridConfig.isRestore = false
      this.gdChecked.emit(false);

    }
    else{
      this.gridConfig.isRestore = true
      this.gdChecked.emit(true);

    }
  }
  setCache(){
    this.keyword.isDelete = this.gridConfig.isRestore
    console.log(this.keyword);

    this.gdSearch.emit(this.keyword);
  }

  getDataDelete(data: any){

    this.gdDelete.emit(data);
  }

  getDataApprove(data: any){
    this.gdApprove.emit(data);
  }

  getDataRestore(data: any){
    this.gdRestore.emit(data);
  }

  childData(data: any, type: string){
    this.gdChild.emit(data);
    this.gdType.emit(type);
  }
}

export interface ColDef{
  field?: string
  headerName?: string
  filter?: GridFilter
  typeDate?: GridTypeDate
  style?: string
  searchable?: boolean
  searchObj?: any
  searchType?: GridSearchType
  bindValue?: string
  bindLabel?: string
  multiple?: boolean
  closeOnSelect?: boolean
  listSection?: any
}

export class GridConfig{
  idModalRestore?: string
  idModalDelete?: string
  idModalApprove?: string
  idModal?: string

  disableApprove?: boolean
  disableCreate?: boolean
  disableDetail?: boolean
  disableDelete?: boolean
  disableRestore?: boolean
  disableRadioBox?: boolean
  radioBoxName?: string
  style?: string
  isRestore?: boolean
}

export declare type GridFilter = 'star' | 'number' | 'date' | 'status' | 'text' | 'call' | 'price' ;
export declare type GridSearchType = 'section' | 'number' | 'date' | 'dateTime' | 'text' | 'email' | 'price' ;
export declare type  GridTypeDate = 'single' | 'range' ;
