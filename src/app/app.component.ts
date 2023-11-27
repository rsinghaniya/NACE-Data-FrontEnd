import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public columnDefs: ColDef[] = [
    { field: 'orderId', filter: true, aggFunc: 'sum', resizable: true},
    { field: 'level', filter: true, aggFunc: 'sum', resizable: true},
    { field: 'code', filter: true, resizable: true },
    { field: 'parent', filter: true, resizable: true },
    { field: 'description', filter: true, resizable: true, cellRenderer: 'tooltipRenderer' },
    { field: 'itemIncludes', resizable: true, cellRenderer: 'tooltipRenderer' },
    { field: 'itemIncludesExtra', resizable: true },
    { field: 'rulings', resizable: true },
    { field: 'itemExcludes', resizable: true },
    { field: 'refIsicRev', filter: true, resizable: true }
  ];

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };
  
  public rowData$!: Observable<any[]>;

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
   
    this.rowData$ = this.http
      .get<any[]>('http://localhost:8080/rest/api/nace-data');
  }

  onCellClicked( e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }

  onFirstDataRendered(params: any) {
    // This function is called when the grid has finished rendering for the first time
    const api = params.api;
    const rowCount = api.getDisplayedRowCount();

    // Display row count in the console or wherever needed
    console.log(`Row count: ${rowCount}`);
  }

  tooltipRenderer(params: any){ 
      return '<span title="' + params.value + '">'+params.value+'</span>';
  };
}