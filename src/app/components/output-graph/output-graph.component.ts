import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { SignalRService } from '../../../shared/services/signalr.service';

@Component({
  selector: 'app-output-graph',
  templateUrl: './output-graph.component.html',
  styleUrls: ['./output-graph.component.scss']
})
export class OutputGraphComponent implements OnInit {
  constructor(private signalRService: SignalRService) { }
  chart: any; // Type can be defined more specifically
  timeLabel: number = 0.0;

  ngOnInit(): void {
    this.createChart();
    this.signalRService.StartSimulation();
    this.signalRService.output$.subscribe(output => {
      this.chart.data.datasets[0].data.push(output * 100);
      this.chart.data.labels.push(this.timeLabel);

      this.timeLabel += 1;
      this.chart.update();
    })
  }

  createChart() {
    const ctx = document.getElementById('outputChart') as HTMLCanvasElement;

    this.chart = new Chart(ctx, {
      type: 'line', // Type of chart
      data: {
        labels: [], // Generate time labels
        datasets: [{
          label: 'Saída (%)',
          data: [], // Example data
          fill: false,
          borderColor: 'rgba(75, 192, 192, 1)',
          tension: 0.1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            min: 0,
            max: 100, // Y-axis scale from 0 to 100
            title: {
              display: true,
              text: 'Saída (%)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Tempo(s)'
            }
          }
        }
      }
    });
  }

  generateTimeLabels(): string[] {
    // Generate labels for the X-axis (time)
    return Array.from({ length: 10 }, (_, i) => `Time ${i + 1}`);
  }

  generateRandomData(): number[] {
    // Generate random data for the example; replace this with your actual data logic
    return Array.from({ length: 10 }, () => Math.random() * 100);
  }
}
