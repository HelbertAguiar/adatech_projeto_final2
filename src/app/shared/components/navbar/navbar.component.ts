import { Component, computed, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '@services/auth.service';
import { CartService } from '@services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatToolbarModule, RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private servicoAutenticacao = inject(AuthService);
  private servicoCarrinho = inject(CartService);

  usuarioLogado = this.servicoAutenticacao.isLoggedIn;
  quantidadeCarrinho = computed(() => this.servicoCarrinho.items().length);

  logout() {
    this.servicoAutenticacao.logout();
  }
}
