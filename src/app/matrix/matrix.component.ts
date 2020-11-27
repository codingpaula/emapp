import { Component, OnInit } from '@angular/core';
import { MatrixService } from './matrix.service';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.scss'],
})
export class MatrixComponent implements OnInit {
  constructor(private readonly matrixService: MatrixService) {}

  ngOnInit(): void {
    this.matrixService.getData();
  }
}
