import { Component, OnInit } from '@angular/core';
import { ColDef, FirstDataRenderedEvent, GridApi, GridReadyEvent, SideBarDef, ValueFormatterParams } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

  public columnDefs: ColDef[] = [
    // set filters
    { field: 'athlete', filter: 'agTextColumnFilter'},
    {
      field: 'country',
      filter: 'agTextColumnFilter'
    },
    // number filters
    { field: 'gold', filter: 'agSetColumnFilter' },
    { field: 'silver', filter: 'agNumberColumnFilter' },
    { field: 'bronze', filter: 'agNumberColumnFilter' },
  ];
  public rowSelection: 'single' | 'multiple' = 'multiple';
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 200,
    sortable: true,
    floatingFilter: true,
  };
  public rowData!: IOlympicData[];
  private gridApi!: GridApi<IOlympicData>;
  constructor(private http: HttpClient) {}


  printFilterModel() {
    var filterModel = this.gridApi.getFilterModel();
    console.log(filterModel);
  }




  ngOnInit() {


  }

  onSelectionChanged() {
    var selectedRows = this.gridApi.getSelectedRows();
    var selectedRowsString = '';
    var maxToShow = 5;
    selectedRows.forEach(function (selectedRow, index) {
      if (index >= maxToShow) {
        return;
      }
      if (index > 0) {
        selectedRowsString += ', ';
      }
      selectedRowsString += selectedRow.athlete;
    });
    if (selectedRows.length > maxToShow) {
      var othersCount = selectedRows.length - maxToShow;
      selectedRowsString +=
        ' and ' + othersCount + ' other' + (othersCount !== 1 ? 's' : '');
    }
    (document.querySelector(
      '#selectedRows'
    ) as any).innerHTML = selectedRowsString;
  }
  onGridReady(params: GridReadyEvent<IOlympicData>) {
    this.http
      .get<IOlympicData[]>(
        'https://www.ag-grid.com/example-assets/olympic-winners.json'
      )
      .subscribe((data) => (this.rowData = data));
  }

}

export interface IOlympicData {
  athlete: string;
  age: number;
  country: string;
  year: number;
  date: string;
  sport: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
}

