import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-barra-envio',
  templateUrl: './barra-envio.component.html',
  styleUrl: './barra-envio.component.css'
})
export class BarraEnvioComponent {
  @Input() progress: number = 0;
  steps: string[] = ['Pedido Recibido', 'Procesando', 'Enviado', 'Entregado'];

  nextStep() {
    if (this.progress < 100) {
      this.progress += 25;  // Incrementa el progreso en 25% por cada paso
    }
  }

  isStepCompleted(stepIndex: number): boolean {
    return stepIndex < this.getStepIndex();
  }

  getStepIndex(): number {
    return Math.floor((this.progress / 100) * this.steps.length);
  }

  getIconClass(stepIndex: number): string {
    if (this.isStepCompleted(stepIndex)) {
      return 'fa-check-circle';
    } else if (stepIndex === this.getStepIndex()) {
      return 'fa-spinner fa-spin';
    } else {
      return 'fa-circle-thin';
    }
  }
}
