import { Component, OnInit, Input } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent} from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-grid-data',
  templateUrl: './grid-data.component.html',
  styleUrls: ['./grid-data.component.scss']
})
export class GridDataComponent implements OnInit {
  @Input() rowData: any
  @Input() columnDefs: ColDef[]
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  }

  public rowSelection: 'single' | 'multiple' = 'multiple';
  public defaultColDef: ColDef = {

    minWidth: 50,
    sortable: true,
    floatingFilter: true,

  };
}

