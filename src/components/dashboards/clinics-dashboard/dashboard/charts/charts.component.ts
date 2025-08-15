// src/app/features/dashboard/charts/charts.component.ts

import {
  Component,
  computed,
  effect,
  EffectRef,
  input,
  InputSignal,
  OnDestroy,
  signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { CardModule, ColComponent, RowComponent } from '@coreui/angular-pro';
import { getStyle } from '@coreui/utils';

import { ISearchResponseCounts } from '../../../../../core/interfaces/idashboard';
import { TranslateModule } from '@ngx-translate/core';

interface ChartConfig {
  chartKey: string;
  title: string;
  color: string;
}

@Component({
  selector: 'app-dashboard-charts',
  standalone: true,
  imports: [
    CommonModule,
    ChartjsComponent,
    CardModule,
    ColComponent,
    RowComponent,
    TranslateModule
  ],
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnDestroy {
  // Input data
  data: InputSignal<ISearchResponseCounts> = input<ISearchResponseCounts>(
    {} as ISearchResponseCounts
  );

  // Chart configurations
  chartConfigs: ChartConfig[] = [
    { chartKey: 'doctorVisits', title: 'زيارات الأطباء', color: '#3b82f6' },
    { chartKey: 'dateVisits', title: 'الزيارات حسب التاريخ', color: '#10b981' },
    { chartKey: 'cityVisits', title: 'الزيارات حسب المدينة', color: '#f59e0b' },
    { chartKey: 'areaVisits', title: 'الزيارات حسب المنطقة', color: '#ef4444' },
    { chartKey: 'brandVisits', title: 'الزيارات حسب العلامة التجارية', color: '#8b5cf6' },
    { chartKey: 'specializationVisits', title: 'الزيارات حسب التخصص', color: '#06b6d4' },
  ];

  // Chart data and options
  chartData: WritableSignal<Record<string, any>> = signal({});
  chartOptions: WritableSignal<Record<string, any>> = signal({});

  private effectRef: EffectRef;

  constructor() {
    // React to data changes
    this.effectRef = effect(
      () => {
        const counts = this.data();
        if (counts && Object.keys(counts).length > 0) {
          this.updateCharts(counts);
        }
      },
      { manualCleanup: true }
    );
  }

  private updateCharts(counts: ISearchResponseCounts): void {
    const newChartData: Record<string, any> = {};
    const newChartOptions: Record<string, any> = {};

    this.chartConfigs.forEach((config) => {
      const { chartKey, color } = config;
      const dataSource = this.getDataSource(counts, chartKey);

      if (dataSource && Object.keys(dataSource).length > 0) {
        newChartData[chartKey] = this.createChartData(dataSource, color);
        newChartOptions[chartKey] = this.createChartOptions();
      }
    });

    this.chartData.set(newChartData);
    this.chartOptions.set(newChartOptions);
  }

  private getDataSource(
    counts: ISearchResponseCounts,
    chartKey: string
  ): Record<string, number> | null {
    switch (chartKey) {
      case 'doctorVisits':
        return counts.doctorVisitsCount || {};
      case 'dateVisits':
        return counts.dateVisitsCount || {};
      case 'cityVisits':
        return counts.cityVisitsCount || {};
      case 'areaVisits':
        return counts.areaVisitsCount || {};
      case 'brandVisits':
        return counts.brandVisitsCount || {};
      case 'specializationVisits':
        return counts.specializationVisitsCount || {};
      default:
        return null;
    }
  }

  private createChartData(dataSource: Record<string, number>, color: string) {
    const labels = Object.keys(dataSource);
    const data = Object.values(dataSource);

    return {
      labels,
      datasets: [
        {
          label: 'عدد الزيارات',
          data,
          backgroundColor: this.generateColors(data.length, color),
          borderColor: color,
          borderWidth: 2,
          borderRadius: 4,
          borderSkipped: false,
        },
      ],
    };
  }

  private createChartOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: '#fff',
          borderWidth: 1,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: getStyle('--cui-body-color') || '#6c757d',
            maxRotation: 45,
            minRotation: 0,
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            color: getStyle('--cui-border-color') || '#dee2e6',
          },
          ticks: {
            color: getStyle('--cui-body-color') || '#6c757d',
          },
        },
      },
      animation: {
        duration: 1000,
        easing: 'easeInOutQuart',
      },
    };
  }

  private generateColors(count: number, baseColor: string): string[] {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const opacity = 0.3 + (0.7 * i) / Math.max(count - 1, 1);
      colors.push(this.hexToRgba(baseColor, opacity));
    }
    return colors;
  }

  private hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  ngOnDestroy(): void {
    this.effectRef.destroy();
  }
}