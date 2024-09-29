import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { SignalRService } from '../../../shared/services/signalr.service';
import { ControlParametersModel } from '../../../shared/models/control.model';
import { UIChart } from 'primeng/chart';

@Component({
  selector: 'app-output-graph',
  templateUrl: './output-graph.component.html',
  styleUrls: ['./output-graph.component.scss'],
})
export class OutputGraphComponent implements OnInit {
  constructor(private signalRService: SignalRService) {}
  @Input() controllerParameters!: ControlParametersModel;
  @ViewChild('chartRef') chartRef!: UIChart;
  label = 0.0;
  sliderValue = 0;
  data!: ChartData;
  options!: ChartOptions;
  isAutoMode = true;
  manualOutput = 0.0;
  currentOutput = 0.0;

  ngOnInit() {
    this.sliderValue = this.controllerParameters.maxOutput / 2;
    this.signalRService.SetProcessVariable(this.sliderValue);

    const documentStyle = getComputedStyle(document.documentElement);
    this.createOptions(documentStyle);
    this.createChart(documentStyle);

    this.signalRService.output$.subscribe((outputModel) => {
      if (outputModel) {
        this.currentOutput = this.AdjustValueToScale(outputModel.output);
        this.data.datasets[0].data.push(outputModel.output);
        this.data.datasets[1].data.push(outputModel.processVariable);
        this.data.datasets[2].data.push(outputModel.setPoint);

        this.data?.labels?.push(this.label + '(ms)');

        this.label += this.controllerParameters.cycleTime;
        if (this.options?.scales?.['y'])
          this.options.scales['y'].max = this.controllerParameters.maxOutput;
        this.chartRef?.refresh();
      }
    });
  }

  createOptions(documentStyle: CSSStyleDeclaration): void {
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.4,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          min: 0, // Start Y-axis at 0
          max: this.controllerParameters.maxOutput, // End Y-axis at 100
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };
  }

  createChart(documentStyle: CSSStyleDeclaration) {
    this.data = {
      labels: [],
      datasets: [
        {
          label: 'Variável manipulada',
          data: [],
          fill: true,
          borderColor: documentStyle.getPropertyValue('--orange-500'),
          tension: 0.4,
          backgroundColor: 'rgba(255,167,38,0.2)',
        },
        {
          label: 'Variável de processo',
          data: [],
          fill: false,
          tension: 0.4,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
        },
        {
          label: 'Setpoint',
          data: [],
          fill: false,
          borderDash: [5, 5],
          tension: 0.4,
          borderColor: documentStyle.getPropertyValue('--teal-500'),
        },
      ],
    };
  }

  onPlay() {
    this.signalRService.StartSimulation();
  }

  onPause() {
    this.signalRService.StopSimulation();
  }

  onSliderChange() {
    this.signalRService.SetProcessVariable(this.sliderValue);
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
