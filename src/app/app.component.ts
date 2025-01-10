import { Component, HostListener } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatListModule} from '@angular/material/list'
import { MatIconModule} from '@angular/material/icon'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, MatToolbarModule, MatListModule, MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Aplicación para Presupuesto';
  
  isSreenSmall = false
   
  @HostListener('window:resize', ['$event'])

  onResize(event: Event){
    this.isSreenSmall = window.innerWidth < 600
  }

  ngOnInit(){
    this.isSreenSmall = window.innerWidth < 600
  }

}

