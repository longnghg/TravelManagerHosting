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
  @Output() gdSchedule = new EventEmitter<any>()
  @Output() gdChild = new EventEmitter<any>()
  @Output() gdType = new EventEmitter<any>()
  rowDataRestore: any
  pageCount: number
  listPageSize = [1, 2, 5, 10, 15, 20, 25, 30]
  pageSize: number = 15
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
    this.pageIndex = 1

    this.calTotalResult()
    this.calStartEnd()
    this.setCache()
  }

  selectSection(name){
    var kw = ""
     var i = 0
      if (this.keyword[name+'Tmp']) {
        if (typeof this.keyword[name+'Tmp'] == 'object') {
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
    this.rowData = null
    this.keyword.pageSize = this.gridConfig.pageSize
    this.pageIndex = 1
    this.keyword.pageIndex = this.pageIndex

    if (this.gridConfig.isRestore) {
      this.gridConfig.isRestore = false
      this.keyword.isDelete = false
    }
    else{
      this.gridConfig.isRestore = true
      this.keyword.isDelete = true
    }

    setTimeout(() => {
      this.gdChecked.emit(this.keyword);
    }, 500);
  }

  setCache(){
    this.rowData = null
    this.keyword.pageSize = this.gridConfig.pageSize
    this.keyword.pageIndex = this.pageIndex
    this.keyword.isDelete = this.gridConfig.isRestore
    setTimeout(() => {
      this.gdSearch.emit(this.keyword);
    }, 500);
  }

  getDataDelete(data: any){
    this.gdDelete.emit(data);
  }

  getDataApprove(data: any){
    this.gdApprove.emit(data);
  }

  getDataSchedule(data: any){
    this.gdSchedule.emit(data);
  }

  getDataRestore(data: any){
    this.gdRestore.emit(data);
  }

  childData(data: any, type: string){
    this.gdChild.emit(data);
    this.gdType.emit(type);
  }

  changeZIndex(){
    document.getElementById("thead").style.zIndex = "1"
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
  disableSchedule?: boolean
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

export declare type GridFilter = 'star' | 'number' | 'date' | 'dateTime' | 'status' | 'text' | 'call' | 'price' | 'statusTourBooking' | 'statusCar' | 'statusPayment' ;
export declare type GridSearchType = 'section' | 'number' | 'date' | 'dateTime' | 'text' | 'email' | 'price' ;
export declare type  GridTypeDate = 'single' | 'range' ;
