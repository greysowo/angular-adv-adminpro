import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
  styles: [
  ]
})
export class IncrementerComponent implements OnInit {

  @Input() progress = 50;
  @Input() btnClass = 'btn-primary';

  @Output() valueChanged: EventEmitter<number> = new EventEmitter();

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  changeValue(value: number) {
    if (this.progress >=100 && value >=0) {
      this.valueChanged.emit(100);
      this.progress = 100;
      return;
    }

    if (this.progress <=0 && value < 0) {
      this.valueChanged.emit(0);
      this.progress = 0;
      return;
    }

    this.progress = this.progress + value;
    this.valueChanged.emit(this.progress);
  }

  onChange(newValue: number) {

    if (newValue >= 100) {
      this.progress = 100;
    } else if (newValue <= 0) {
      this.progress = 0;
    } else {
      this.progress = newValue;
    }

    this.valueChanged.emit(this.progress);
  }

}
