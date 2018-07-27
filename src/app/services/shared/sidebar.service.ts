import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu:any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard' },
        { titulo: 'ProgressBar', url: '/progress' },
        { titulo: 'Graficas', url: '/graph1' },
        { titulo: 'Promesas', url: '/promesas' },
        { titulo: 'RxJsObservable', url: '/rxjs' }
      ]
    }
  ]

  constructor() { }
}
