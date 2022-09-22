import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: [
  ]
})
export class PromisesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // const promesa = new Promise((resolve, reject) => {
    //   if (false) {
    //     resolve('Hola mundo');
    //   } else {
    //     reject('Algo salio mal');
    //   }
    // });

    // promesa.then((mensaje) => {
    //   console.log(mensaje);
    // })
    // .catch(error => console.log('error', error));

    // console.log('Fin del init');
    this.getUsers().then(users => console.log(users));
  }

  getUsers() {
    return new Promise(resolve => {
      fetch('https://reqres.in/api/users')
      .then(resp => resp.json())
      .then(body => resolve(body.data));
    });
  }

}
