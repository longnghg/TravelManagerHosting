import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
const FILTER_PAG_REGEX = /[^0-9]/g;
@Component({
  selector: 'app-grid2-data',
  templateUrl: './grid2-data.component.html',
  styleUrls: ['./grid2-data.component.scss']
})
export class Grid2DataComponent implements OnInit {
  @Input() rowData: any
  @Input() columnDefs: ColDef2[]
  @Input() gridConfig: GridConfig2
  @Output() gdSearch = new EventEmitter<any>()
  @Output() gdChecked = new EventEmitter<any>()
  @Output() gdDelete = new EventEmitter<any>()
  @Output() gdApprove = new EventEmitter<any>()
  @Output() gdRestore = new EventEmitter<any>()
  @Output() gdChild = new EventEmitter<any>()
  @Output() gdType = new EventEmitter<any>()
  rowDataRestore: any
  pageCount: number
  listPageSize = [1, 2, 5, 10, 15, 20, 25, 30]
  // pageSize: number = 5
  index: number = 0
  pageIndex: number = 1
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
    this.start = ((this.pageIndex - 1) * this.gridConfig.pageSize) + 1
    this.end = this.start + this.gridConfig.pageSize - 1
    if (this.rowData) {
      for (let index = 0; index < this.rowData.length; index++) {
        this.rowData[index].rowNum = this.start + index
      }
    }

  }
  calTotalResult(){
    if (this.rowData) {
      if(this.gridConfig.totalResult % this.gridConfig.pageSize == 0){
        this.pageCount = this.gridConfig.totalResult / this.gridConfig.pageSize
      }
      else{
        this.pageCount = Math.floor(this.gridConfig.totalResult / this.gridConfig.pageSize + 1)
      }

      if (this.pageCount == 1) {
         this.btnNext = false
      }
      else{
        this.btnNext = true
      }
      this.index = (this.pageIndex - 1) * this.gridConfig.pageSize
    }
  }

  selectPage(page: string, type: string) {
    var index = parseInt(page)
    if (type == 'prev' && index > 1) {
      this.pageIndex = index - 1
    }
    else if(type == 'next' && index < this.pageCount){
      this.pageIndex = index + 1
    }
    else if(type == 'nextAll'){
      this.pageIndex = this.pageCount
    }
    else if (type == 'prevAll') {
      this.pageIndex = 1
    }
    else{
      if (index > this.pageCount) {
        this.pageIndex = this.pageCount
      }
      else if (index == 0){
        this.pageIndex = 1
      }
      else{
        this.pageIndex = index
      }
    }

    if (this.pageIndex == 1) {
      this.btnPrev = false
    }
    else{
      this.btnPrev = true
    }

    if (this.pageIndex == this.pageCount) {
      this.btnNext = false
    }
    else{
      this.btnNext = true
    }

    this.calTotalResult()
    this.calStartEnd()
    this.setCache()
  }

  formatInput(input: HTMLInputElement, keyword?: any, column?: any) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
    keyword[column] = input.value
  }

  changePageSize(){
    this.pageIndex = 1

    this.calTotalResult()
    this.calStartEnd()
    this.setCache()
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

    this.pageIndex = 1
    this.setCache()
  }

  search(name){
    this.pageIndex = 1
    this.setCache()
  }
  changeChecked(){
    if (this.gridConfig.isRestore) {
      this.gridConfig.isRestore = false
      this.keyword.isDelete = false
    }
    else{
      this.gridConfig.isRestore = true
      this.keyword.isDelete = true
    }
    this.setCache()
  }
  setCache(){
    this.rowData = null
    this.keyword.pageSize = this.gridConfig.pageSize
    this.keyword.pageIndex = this.pageIndex
    this.keyword.isDelete = this.gridConfig.isRestore
    setTimeout(() => {
      this.gdSearch.emit(this.keyword);
    }, 500);
    // if (this.keywordTmp)
    // {
    //   this.keywordTmp.isDelete = this.gridConfig.isRestore
    //   this.gdSearch.emit(Object.assign({}, this.keywordTmp));
    // }
    // else
    // {
    //   this.keyword.isDelete = this.gridConfig.isRestore
    //    this.gdSearch.emit(this.keyword);
    // }
  }

  getDataApprove(data: any){
    this.gdApprove.emit(data);
  }
  getDataDelete(data: any){

    this.gdDelete.emit(data);
  }

  getDataRestore(data: any){
    this.gdRestore.emit(data);
  }

  childData(data: any, type: string){
    this.gdChild.emit(data);
    this.gdType.emit(type);
  }
}

export interface ColDef2{
  field?: string
  headerName?: string
  filter?: GridFilter
  style?: string
  typeDate?: GridTypeDate
  searchable?: boolean
  searchObj?: any
  searchType?: GridSearchType
  bindValue?: string
  bindLabel?: string
  multiple?: boolean
  closeOnSelect?: boolean
  listSection?: any
}

export class GridConfig2{
  idModalRestore?: string
  idModalDelete?: string
  idModalApprove?: string

  route?: string
  alias?: string

  disableApprove?: boolean
  disableCreate?: boolean
  disableDetail?: boolean
  disableDelete?: boolean
  disableRestore?: boolean
  disableRadioBox?: boolean
  radioBoxName?: string
  style?: string
  isRestore?: boolean

  pageSize?: number
  totalResult? : number
}



export declare type GridFilter = 'star' | 'number' | 'date' | 'status' | 'text' | 'call' ;
export declare type GridSearchType = 'section' | 'number' | 'date' | 'dateTime' | 'text' | 'email';
export declare type  GridTypeDate = 'single' | 'range' ;
