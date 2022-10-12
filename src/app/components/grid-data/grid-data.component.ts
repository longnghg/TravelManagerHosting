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
  @Output() gdSearch = new EventEmitter<any>()
  @Output() gdChecked = new EventEmitter<any>()
  @Output() gdChild = new EventEmitter<any>()
  @Output() gdType = new EventEmitter<any>()
  totalResult: number
  rowDataTmp: any
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
  keywordTmp: any = []
  isDelete: boolean
  constructor(){}
  ngOnInit(): void {
  }
  ngOnChanges(): void {
    if (this.rowData) {
      this.rowDataTmp = Object.assign(this.rowData)
    }
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

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }

  changePageSize(){
    this.calTotalResult()
    this.calStartEnd()
  }

  selectSection(name){
   var kw = ""
    var i = 0
    this.keywordTmp = Object.assign({}, this.keyword)
    if (this.keywordTmp[name].length > 1) {
      this.keywordTmp[name].forEach(item => {
        if ( i < this.keywordTmp[name].length-1) {
          kw += item + ","
        }
        else{
          kw += item
        }
        i++
      });
    }
    else{
      kw = this.keywordTmp[name][0]
      if (!kw) {
        kw = this.keywordTmp[name]
      }
    }
    this.keywordTmp[name] = kw
    this.setCache()
  }
  search(name){
    if (this.keywordTmp) {
      this.keywordTmp[name] = this.keyword[name]
    }
    this.setCache()

  }
  changeChecked(){
    if (this.isDelete) {
      this.isDelete = false
      this.gdChecked.emit(false);

    }
    else{
      this.isDelete = true
      this.gdChecked.emit(true);

    }
  }
  setCache(){
    if (this.keywordTmp)
    {
      this.keywordTmp.isDelete = this.isDelete
      this.gdSearch.emit(Object.assign({}, this.keywordTmp));
    }
    else
    {
      this.keyword.isDelete = this.isDelete
       this.gdSearch.emit(this.keyword);
    }
  }
  childData(data: any, type: string){
    this.gdChild.emit(data);
    this.gdType.emit(type);
  }
}

export interface ColDef{
  field?: string
  headerName?: string
  filter?: string
  width?: string
  searchable?: boolean
  searchObj?: any
  searchType?: string
  bindValue?: string
  bindLabel?: string
  multiple?: boolean
  listSection?: any
}

