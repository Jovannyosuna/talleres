import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  titulo = 'Talleres disponibles';

  talleres = [
    { id: 1, nombre: 'Introducción a HTML', duracion: '2 horas' },
    { id: 2, nombre: 'CSS básico', duracion: '3 horas' },
    { id: 3, nombre: 'JavaScript', duracion: '4 horas' },
    { id: 4, nombre: 'Angular', duracion: '4 horas' },
    { id: 5, nombre: 'React', duracion: '5 horas' }
  ];

  inscritos = signal<number[]>([]);

  limiteAlcanzado = computed(() => this.inscritos().length >= 2);
  talleresSeleccionados = computed(() => this.talleres.filter(t => this.inscritos().includes(t.id)));

  inscribirse(id: number) {
    if (this.inscritos().includes(id) || this.limiteAlcanzado()) return;
    this.inscritos.update(ids => [...ids, id]);
  }

  cancelarInscripcion(id: number) {
    this.inscritos.update(ids => ids.filter(item => item !== id));
  }

  cancelarTodas() {
    this.inscritos.set([]);
  }

  estaInscrito(id: number): boolean {
    return this.inscritos().includes(id);
  }
}