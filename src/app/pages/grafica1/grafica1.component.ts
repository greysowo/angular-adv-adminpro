import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  labels1 = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  data1 = [ 10, 20, 30 ];

}
