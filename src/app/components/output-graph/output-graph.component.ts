import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { SignalRService } from '../../../shared/services/signalr.service';

@Component({
  selector: 'app-output-graph',
  templateUrl: './output-graph.component.html',
  styleUrls: ['./output-graph.component.scss'],
})
export class OutputGraphComponent implements OnInit {
  constructor(private signalRService: SignalRService) {}

  @ViewChild('chartRef') chartRef!: Chart;
  label = 0.0;
  sliderValue = 50; // Initial slider value
  data: any;
  options: any;

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    this.createOptions(documentStyle);
    this.createChart(documentStyle);
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
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Variável manipulada',
          data: [12, 51, 62, 33, 21, 62, 45],
          fill: true,
          borderColor: documentStyle.getPropertyValue('--orange-500'),
          tension: 0.4,
          backgroundColor: 'rgba(255,167,38,0.2)',
        },
        {
          label: 'Variável de processo',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          tension: 0.4,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
        },
        {
          label: 'Setpoint',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderDash: [5, 5],
          tension: 0.4,
          borderColor: documentStyle.getPropertyValue('--teal-500'),
        },
      ],
    };
  }

  startSimulation(): void {
    this.signalRService.StartSimulation();
    this.signalRService.output$.subscribe((output) => {
      this.data.datasets[0].data.push(output * 100);
      this.data.labels.push(this.label);

      this.label += 1;
      this.chartRef.update();
    });
  }



  onPlay() {
    console.log('Play button clicked');
    // Add logic for play action
  }

  onPause() {
    console.log('Pause button clicked');
    // Add logic for pause action
  }

  onSliderChange(event: any) {
    console.log('Slider value changed:', this.sliderValue);
    // Add logic for slider change action
  }
}
