import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { ConfigService } from "../../services_API/config.service";
import { StatusNotification } from "../../enums/enum";
import { AuthenticationModel } from "../../models/authentication.model";
import { ResponseModel } from "../../models/responsiveModels/response.model";
import { StatisticModel, ReportTourBookingModel } from "../../models/statistic.model";
import { NotificationService } from "../../services_API/notification.service";
import { StatisticService } from "../../services_API/statistic.service";
// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  resWeek: StatisticModel[]
  response: ResponseModel
  resReportTourBooking: ReportTourBookingModel[]
  value: any
  reportData = []
  reportLabel: string[] = []                                                                                                                                                                                                                                                                                                                                                                                                                = []
  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  constructor(private statisticService: StatisticService, private notificationService: NotificationService, private configService: ConfigService){

  }
  ngOnInit() {
    this.statisticService.listWeekByYear(new Date().getFullYear()).then(res => {
    this.resWeek = res})
    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];

    parseOptions(Chart, chartOptions());


    // var chartSales = document.getElementById('chart-sales');

    // this.salesChart = new Chart(chartSales, {
		// 	type: 'line',
		// 	options: chartExample1.options,
		 	data: chartExample1.data
		// });
  }

  weekChange(){
    this.resWeek.forEach(report => {
      if (report.week == this.value) {
        this.statisticService.getStatisticTourbookingFromDateToDate(new Date(report.fromDate).getTime(), new Date(report.toDate).getTime()).subscribe(res => {
          this.response = res
          if (this.response.notification.type == StatusNotification.Success) {
            this.resReportTourBooking = this.response.content

            this.resReportTourBooking .forEach(report => {
              this.reportData.push(report.quantityBooked)
              this.reportLabel.push(report.nameTour)
            });

            var chartOrders = document.getElementById('chart-orders');
            var d = {
              options: {
                scales: {
                  yAxes: [
                    {
                      gridLines: {
                        color: "#212529",
                        zeroLineColor: "#212529",
                        drawOnChartArea: false
                      },
                      ticks: {
                        callback: function(value) {
                          return value;
                        }
                      }
                    }
                  ]
                }
              },
              data: {
                labels: this.reportLabel,
                datasets: [{
                  label: 'Tổng số người',
                  data: this.reportData,
                  // maxBarThickness: 10
                }]
              }
            }

            var ordersChart = new Chart(chartOrders, {
              type: 'bar',
              options: d.options,
              data: d.data
            });

            var chartSales = document.getElementById('chart-sales');

            this.salesChart = new Chart(chartSales, {
              type: 'line',
              options: d.options,
              data: d.data
            });
          }
        }, error => {
          var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
          this.notificationService.handleAlert(message, StatusNotification.Error)

        })
      }
    });

  }

  monthChange(){

  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    console.log(this.salesChart.data.datasets[0].data);

    this.salesChart.update();
  }

}
