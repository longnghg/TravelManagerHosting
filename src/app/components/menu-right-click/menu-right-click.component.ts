import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu-right-click',
  templateUrl: './menu-right-click.component.html',
  styleUrls: ['./menu-right-click.component.scss']
})
export class MenuRightClickComponent implements OnInit {
  constructor() { }
  @Input() target: any
  ngOnInit(): void {
    let menu = document.getElementById('menu');
    document.addEventListener('contextmenu', function(event){
      console.log(event);
        menu.style.position = 'fixed'
        menu.style.display = 'block';
        menu.style.top = event.y + 'px';
        menu.style.left = event.x + 'px';
        event.preventDefault();

    })
    document.addEventListener('scroll', function(event){
      menu.style.display = 'none';
   })
    document.addEventListener('click', function(event){
        menu.style.display = 'none';
    })
  }

  delete(e){
    console.log(this.target);

    console.log(e);

  }
}
