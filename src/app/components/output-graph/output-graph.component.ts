import { AfterContentInit, AfterViewChecked, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { SignalRService } from '../../../shared/services/signalr.service';
import { ControlParametersModel } from '../../../shared/models/control.model';
import { UIChart } from 'primeng/chart';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-output-graph',
  templateUrl: './output-graph.component.html',
  styleUrls: ['./output-graph.component.scss'],
})
export class OutputGraphComponent implements OnInit, AfterViewChecked {
  constructor(private signalRService: SignalRService) { }
  @Input() controllerParameters!: ControlParametersModel;
  @ViewChild('chartRef') chartRef!: UIChart;
  label = 0.0;
  sliderValue = 0;
  options!: ChartOptions;
  isAutoMode = true;
  manualOutput = 0.0;
  currentOutput = 0.0;
  chart: any = []

  ngOnInit() {
    this.sliderValue = this.controllerParameters.maxOutput / 2;

    const documentStyle = getComputedStyle(document.documentElement);
    this.createChart(documentStyle);

    this.signalRService.output$.subscribe((outputModel) => {
      if (outputModel) {
        this.currentOutput = this.AdjustValueToScale(outputModel.output);

        this.chart.data.datasets[0].data.push(outputModel.output);
        this.chart.data.datasets[1].data.push(outputModel.processVariable);
        this.chart.data.datasets[2].data.push(outputModel.setPoint);

        this.chart?.data.labels?.push(this.label + '(ms)');

        this.label += this.controllerParameters.cycleTime;
        if (this.options?.scales?.['y'])
          this.options.scales['y'].max = this.controllerParameters.maxOutput;
        this.chart.update();
      }
    });
  }

  ngAfterViewChecked(): void {
    let placeholder = document.getElementById("control-bar-placeholder");
    let controlBar = document.getElementById("control-bar");

    if (placeholder && controlBar)
      placeholder.style.height = (controlBar.offsetHeight + 24) + "px";
  }

  createChart(documentStyle: CSSStyleDeclaration) {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          
        {
            label: 'Variável manipulada',
            data: [],
            borderColor: documentStyle.getPropertyValue('--orange-500'),
            backgroundColor: 'rgba(255,167,38,0.2)',
            stepped: true
          },
          {
            label: 'Variável de processo',
            data: [],
            borderColor: documentStyle.getPropertyValue('--blue-500'),
            stepped: true
          },
          {
            label: 'Setpoint',
            data: [],
            borderColor: documentStyle.getPropertyValue('--teal-500'),
            stepped: true
          },
        ],
      },
      options: {
        scales: {
          y: {
            max: this.controllerParameters.maxOutput ,
            beginAtZero: true,
          },
        },
      },
    });
  }

  onPlay() {
    this.signalRService.StartSimulation();
  }

  onPause() {
    this.signalRService.StopSimulation();
  }

  onModeChange() {
    this.manualOutput = this.currentOutput * 100;
    this.signalRService.SetManualOutput(this.manualOutput / 100);
    this.signalRService.ChangeMode(this.isAutoMode);
  }

  onManualOutputChange() {
    this.signalRService.SetManualOutput(this.manualOutput / 100);
  }

  AdjustValueToScale(value: number) {
    if (this.controllerParameters.maxOutput == 0) return 0.0;

    const percent = (value * 100.0) / this.controllerParameters.maxOutput;

    return percent / 100;
  }
}
