import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PaginationModel } from "../../models/responsiveModels/pagination.model";
const FILTER_PAG_REGEX = /[^0-9]/g;
@Component({
  selector: 'app-grid-data',
  templateUrl: './grid-data.component.html',
  styleUrls: ['./grid-data.component.scss']
})
export class GridDataComponent implements OnInit {
  @Output() change: EventEmitter<PaginationModel> = new EventEmitter<PaginationModel>()
  @Input() rowData: any
  @Input() columnDefs: ColDef[]
  @Input() totalResult: number
  pageCount: number
  listPageSize = [2, 5, 10, 15, 20, 25, 30]
  pageSize: number = 15
  index: number
  pageNumber: number = 1
  btnPrev: boolean = false
  btnNext: boolean = true
  changed = true
  pagination: PaginationModel = {
    pageNumber: this.pageNumber,
    pageSize: this.pageSize,
  }
  paginationTmp: PaginationModel

  constructor(){}
  ngOnInit(): void {
      this.setCache();
  }


  ngOnChanges(): void {
    if (this.rowData) {
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

    this.pagination.pageNumber  = this.pageNumber

    if (this.paginationTmp) {
      this.paginationTmp.pageNumber = this.pagination.pageNumber
    }
    this.setCache()
  }

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }

  changePageSize(){
    this.pagination.pageSize = this.pageSize

    if (this.paginationTmp) {
      this.paginationTmp.pageSize = this.pagination.pageSize
    }
    this.setCache()
  }

  selectSection(e){
    var x = ""
    var i = 0
    this.paginationTmp = Object.assign({}, this.pagination)
    if (this.paginationTmp[e].length > 1) {
      this.paginationTmp[e].forEach(element => {
        if (i < this.paginationTmp[e].length-1) {
          x += element + ","
        }
        else{
          x += element
        }
        i++
      });
    }
    else{
      x = this.paginationTmp[e][0]
    }
    this.paginationTmp[e] = x

    this.setCache()

  }

  search(e){
    if (this.paginationTmp) {
      this.paginationTmp[e] = this.pagination[e]
    }
    this.setCache()
  }


  setCache(){
    if (this.paginationTmp) {
     this.change.emit(this.paginationTmp);
    }
    else{
      this.change.emit(this.pagination);
    }
  }
}

export interface ColDef{
  field?: string
  headerName?: string
  filter?: string
  width?: string
  searchable?: boolean
  searchType?: string
  bindValue?: string
  bindLabel?: string
  listSection?: any
}
