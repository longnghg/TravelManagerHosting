import { Component, OnInit } from '@angular/core';
// import Chart from 'chart.js';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import { ConfigService } from "../../services_API/config.service";
import { StatusNotification } from "../../enums/enum";
import { AuthenticationModel } from "../../models/authentication.model";
import { ResponseModel } from "../../models/responsiveModels/response.model";
import { StatisticModel, ReportTourBookingModel } from "../../models/statistic.model";
import { NotificationService } from "../../services_API/notification.service";
import { StatisticService } from "../../services_API/statistic.service";
// core components
// import {
//   chartOptions,
//   parseOptions,
//   chartExample1,
//   chartExample2
// } from "../../variables/charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  resWeeks: StatisticModel[]
  resWeek: StatisticModel = new StatisticModel
  response: ResponseModel
  resReportTourBooking: ReportTourBookingModel[]
  reportDataBar = []
  reportLabelBar: string[] = []
  reportDataLine = []
  reportLabelLine: string[] = []                                                                                                                                                                                                                                                                                                                                                                                                            = []
  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: string = 'month';
  constructor(private statisticService: StatisticService, private notificationService: NotificationService, private configService: ConfigService){

  }
  resMonths = this.configService.listMonth()
  resYears = this.configService.listYear()


  public lineChartData: ChartConfiguration<'line'>['data']
  public barChartData: ChartConfiguration<'bar'>['data']
  // public lineChartLegend = true;
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
        fill: false,
        borderWidth: 1,
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y: {
        grid: {
          drawBorder: false,
          drawOnChartArea: false
        },
        ticks: {
          color: 'white'
        }
      },
      x: {
        grid: {
          drawBorder: false,
          drawOnChartArea: false
        },
        ticks: {
          color: 'white'
        }
      }
    },
    font: {
      weight: 'lighter'
    },
    plugins: {
      legend: {
        labels: { color: "white" }
      },
    }


  };

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y: {
        grid: {
          drawBorder: false,
          drawOnChartArea: false
        },
        ticks: {
          color: 'black'
        }
      },
      x: {
        grid: {
          drawBorder: false,
          drawOnChartArea: false
        },
        ticks: {
          color: 'black'
        }
      }
    },
    font: {
      weight: 'lighter'
    },
    plugins: {
      legend: {
        labels: { color: "black" }
      },
    }


  };
  ngOnInit() {
    this.statisticService.listWeekByYear(new Date().getFullYear()).then(res => {
    this.resWeeks = res
    this.resWeek.week = this.resWeeks[this.resWeeks.length-1].week
  })

  var split = new Date().toLocaleDateString().split("/")
  this.resWeek.fromDate = this.configService.formatFromUnixTimestampToFullDate(new Date().getTime())
  this.resWeek.toDate = this.configService.formatFromUnixTimestampToFullDate(new Date().getTime())
  this.resWeek.year = Number(split[2])
  this.resWeek.month = Number(split[1])

  // parseOptions(Chart, chartOptions());
  this.monthChange()
  }

  weekChange(){
    this.reportDataBar = []
    this.reportLabelBar = []
    this.reportDataLine = []
    this.reportLabelLine = []

    this.resWeeks.forEach(report => {
      if (report.week == this.resWeek.week) {
        this.statisticService.getStatisticTourbookingFromDateToDate(new Date(report.fromDate).getTime(), new Date(report.toDate).getTime()).subscribe(res => {
          this.response = res
          if (this.response.notification.type == StatusNotification.Success) {
            this.resReportTourBooking = this.response.content

            this.resReportTourBooking.forEach(report => {
              this.reportDataBar.push(report.quantityBooked)
              this.reportLabelBar.push(report.nameTour)

              this.reportDataLine.push(report.totalRevenue)
              this.reportLabelLine.push(report.nameTour)
            });

            this.updateOptions("Tổng số người", "Doanh thu")

          }
        }, error => {
          var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
          this.notificationService.handleAlert(message, StatusNotification.Error)

        })
      }
    });

  }

  monthChange(){
    this.reportDataBar = []
    this.reportLabelBar = []
    this.reportDataLine = []
    this.reportLabelLine = []
    this.statisticService.getStatisticTourbookingByMonth(this.resWeek.month, this.resWeek.year).subscribe(res => {
      this.response = res
      if (this.response.notification.type == StatusNotification.Success) {
        this.resReportTourBooking =  this.response.content

        this.resReportTourBooking.forEach(report => {
          this.reportDataBar.push(report.quantityBooked)
              this.reportLabelBar.push(report.nameTour)

              this.reportDataLine.push(report.totalRevenue)
              this.reportLabelLine.push(report.nameTour)
        });

        this.updateOptions("Tổng số người", "Doanh thu")

      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
      this.notificationService.handleAlert(message, StatusNotification.Error)

    })

  }

  dateChange(){
    this.reportDataBar = []
    this.reportLabelBar = []
    this.reportDataLine = []
    this.reportLabelLine = []
    this.statisticService.getStatisticTourbookingFromDateToDate(new Date(this.resWeek.fromDate).getTime(), new Date(this.resWeek.toDate).getTime()).subscribe(res => {
      this.response = res
      if (this.response.notification.type == StatusNotification.Success) {
        this.resReportTourBooking =  this.response.content
        this.resReportTourBooking.forEach(report => {
          this.reportDataBar.push(report.quantityBooked)
          this.reportLabelBar.push(report.nameTour)

          this.reportDataLine.push(report.totalRevenue)
          this.reportLabelLine.push(report.nameTour)
        });

        this.updateOptions("Tổng số người", "Doanh thu")
      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
      this.notificationService.handleAlert(message, StatusNotification.Error)

    })

  }

  yearChange(){
    this.reportDataBar = []
    this.reportLabelBar = []
    this.reportDataLine = []
    this.reportLabelLine = []
    this.statisticService.getStatisticTourbookingByYear(this.resWeek.year).subscribe(res => {
      this.response = res
      console.log(res);

      if (this.response.notification.type == StatusNotification.Success) {
        this.resReportTourBooking = this.response.content

        this.resReportTourBooking.forEach(report => {
          this.reportDataBar.push(report.quantityBooked)
          this.reportLabelBar.push(report.nameTour)

          this.reportDataLine.push(report.totalRevenue)
          this.reportLabelLine.push(report.nameTour)
        });

        this.updateOptions("Tổng số người", "Doanh thu")
      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
      this.notificationService.handleAlert(message, StatusNotification.Error)

    })
  }
  // public updateOptions(labelBar, labelLine) {
  //   var bar = {
  //     options: {
  //       scales: {
  //         yAxes: [
  //           {
  //             gridLines: {
  //               color: "#212529",
  //               zeroLineColor: "#212529",
  //               drawOnChartArea: false
  //             },
  //             ticks: {
  //               callback: function(value) {
  //                 return value;
  //               }
  //             }
  //           }
  //         ]
  //       }
  //     },
  //     data: {
  //       labels: this.reportLabelBar,
  //       datasets: [{
  //         label: labelBar,
  //         data: this.reportDataBar,
  //         // maxBarThickness: 10
  //       }]
  //     }
  //   }


  //   var line = {
  //     options: {
  //       scales: {
  //         yAxes: [
  //           {
  //             gridLines: {
  //               color: "#212529",
  //               zeroLineColor: "#212529",
  //               drawOnChartArea: false
  //             },
  //             ticks: {
  //               callback: function(value) {
  //                 if (!(value % 10)) {
  //                   return (value/1000000).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace(".00", "") + 'tr';
  //                 }
  //               }
  //             }
  //           }
  //         ]
  //       }
  //     },
  //     data: {
  //       labels: this.reportLabelLine,
  //       datasets: [{
  //         label: labelLine,
  //         data: this.reportDataLine
  //       }]
  //     }
  //   }


  //   var config = {
  //     type: "line",
  //     data: {
  //       labels: this.reportLabelLine,
  //       datasets: [
  //         {
  //           label: labelLine,
  //           backgroundColor: "#4c51bf",
  //           borderColor: "#4c51bf",
  //           data: this.reportDataLine,
  //           fill: false,
  //         },
  //         {
  //           label: labelLine+"sd",
  //           fill: false,
  //           backgroundColor: "#fed7d7",
  //           borderColor: "#fed7d7",
  //           data: this.reportDataLiney,
  //         },
  //       ],
  //     },
  //     options: {
  //       maintainAspectRatio: false,
  //       responsive: true,
  //       legend: {
  //         labels: {
  //           fontColor: "white",
  //         },
  //         align: "end",
  //         position: "bottom",
  //       },
  //       tooltips: {
  //         mode: "index",
  //         intersect: false,
  //       },
  //       hover: {
  //         mode: "nearest",
  //         intersect: true,
  //       },
  //       scales: {
  //         xAxes: [
  //           {
  //             display: true,
  //             scaleLabel: {
  //               display: false,
  //               labelString: "Month",
  //               fontColor: "white",
  //             },
  //             gridLines: {
  //               display: false,
  //               borderDash: [2],
  //               borderDashOffset: [2],
  //               color: "rgba(33, 37, 41, 0.3)",
  //               zeroLineColor: "rgba(0, 0, 0, 0)",
  //               zeroLineBorderDash: [2],
  //               zeroLineBorderDashOffset: [2],
  //             },
  //           },
  //         ],
  //         yAxes: [
  //           {
  //             ticks: {
  //               callback: function(value) {
  //                 if (!(value % 10)) {
  //                   return (value/1000000).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace(".00", "") + 'tr';
  //                 }
  //               }
  //             },
  //             display: true,
  //             scaleLabel: {
  //               display: false,
  //               labelString: "Value",
  //               fontColor: "white",
  //             },
  //             gridLines: {
  //               color: "#212529",
  //               zeroLineColor: "#212529",
  //               drawOnChartArea: false
  //             },
  //           },
  //         ],
  //       },
  //     },
  //   };
  //   var chartOrders = document.getElementById('chart-orders');

  //   // var ordersChart = new Chart(chartOrders, {
  //   //   type: 'bar',
  //   //   options: bar.options,
  //   //   data: bar.data
  //   // });

  //   // var chartSales = document.getElementById('chart-sales');

  //   // this.salesChart = new Chart(chartSales, {
  //   //   type: 'line',
  //   //   options: config.options,
  //   //   data: config.data
  //   // });
  // }


  public updateOptions(labelBar, labelLine) {
   this.lineChartData =
    {
      labels: this.reportLabelLine,
      datasets: [
        {
          data: this.reportDataLine,
          label: labelLine,
          borderColor: 'black',
          backgroundColor: 'purple',
          pointBackgroundColor: 'purple',
          pointHoverBorderColor: 'rgba(77,83,96,1)',
        }
      ]
    };

    this.barChartData =
    {
      labels: this.reportLabelBar,
      datasets: [
        {
          data: this.reportDataBar,
          label: labelBar,
          backgroundColor: 'purple'
        }
      ]
    };
  }
}

