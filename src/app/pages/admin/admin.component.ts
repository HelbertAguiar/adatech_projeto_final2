import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { ProductService } from '../../core/services/product-service.service';
import { Product } from '../../core/models/product.model';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import localePt from '@angular/common/locales/pt';
import { ConfirmarDialogComponent, ConfirmarDialogData } from '../../shared/components/confirmar-dialog/confirmar-dialog.component';
import { ProdutoFormComponent, ProdutoFormData } from './produto-form/produto-form.component';

// Registrar os dados de localização para o português do Brasil
registerLocaleData(localePt);

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
    // Não precisamos importar o ConfirmarDialogComponent aqui, pois ele é carregado dinamicamente
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit, AfterViewInit {
  fonteDados = new MatTableDataSource<Product>([]);
  produtos: Product[] = [];
  colunasMostradas: string[] = ['id', 'title', 'price', 'actions'];
  carregando = true;

  @ViewChild(MatPaginator) paginador!: MatPaginator;
  @ViewChild(MatSort) ordenacao!: MatSort;

  constructor(
    private servicoProdutos: ProductService,
    private snackBar: MatSnackBar,
    private dialogo: MatDialog
  ) {}

  ngOnInit() {
    this.carregarProdutos();
  }

  ngAfterViewInit() {
    // Primeiro, definir a função de filtragem para buscar em todos os campos
    this.fonteDados.filterPredicate = (data: Product, filter: string) => {
      // Função para remover acentos para melhorar a busca em português
      const removerAcentos = (texto: string) => {
        return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      };
      
      const filterSemAcentos = removerAcentos(filter);
      const titleSemAcentos = removerAcentos(data.title.toLowerCase());
      
      return titleSemAcentos.includes(filterSemAcentos) || 
             data.id.toString().includes(filter) || 
             data.price.toString().includes(filter);
    };
    
    // Configurar paginação e ordenação
    this.fonteDados.paginator = this.paginador;
    this.fonteDados.sort = this.ordenacao;

    // Configuração para tradução da paginação
    this.paginador._intl.itemsPerPageLabel = 'Itens por página:';
    this.paginador._intl.nextPageLabel = 'Próxima página';
    this.paginador._intl.previousPageLabel = 'Página anterior';
    this.paginador._intl.firstPageLabel = 'Primeira página';
    this.paginador._intl.lastPageLabel = 'Última página';
    this.paginador._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0 || pageSize === 0) {
        return `0 de ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ? 
        Math.min(startIndex + pageSize, length) : 
        startIndex + pageSize;
      return `${startIndex + 1} - ${endIndex} de ${length}`;
    };
  }
  
  aplicarFiltro(event: Event) {
    const valorFiltro = (event.target as HTMLInputElement).value;
    this.fonteDados.filter = valorFiltro.trim().toLowerCase();

    if (this.fonteDados.paginator) {
      this.fonteDados.paginator.firstPage();
    }
  }

  carregarProdutos() {
    this.carregando = true;
    this.servicoProdutos.getAll().subscribe({
      next: (produtos: Product[]) => {
        this.produtos = produtos;
        this.fonteDados.data = produtos;
        
        // Garantir que a ordenação e paginação sejam aplicadas corretamente
        if (this.fonteDados.sort && this.fonteDados.paginator) {
          this.fonteDados.sort.active = 'id';
          this.fonteDados.sort.direction = 'asc';
          this.fonteDados.sort.sortChange.emit({active: 'id', direction: 'asc'});
        }
        
        this.carregando = false;
      },
      error: (erro: any) => {
        this.carregando = false;
        this.snackBar.open('Erro ao carregar produtos', 'Fechar', {
          duration: 5000,
          panelClass: 'error-snackbar'
        });
        console.error('Erro ao carregar produtos:', erro);
      }
    });
  }

  abrirFormulario(produto?: Product) {
    const dados: ProdutoFormData = {
      produto: produto,
      titulo: produto ? 'Editar Produto' : 'Adicionar Produto',
      botaoSalvar: produto ? 'Atualizar' : 'Adicionar'
    };

    const dialogRef = this.dialogo.open(ProdutoFormComponent, {
      width: '500px',
      data: dados
    });

    dialogRef.afterClosed().subscribe((resultado: Product) => {
      if (resultado) {
        this.carregando = true;
        
        if (resultado.id) {
          // Atualizar produto existente
          this.servicoProdutos.update(resultado.id, resultado).subscribe({
            next: () => {
              this.carregarProdutos();
              this.snackBar.open('Produto atualizado com sucesso', 'Fechar', {
                duration: 3000,
                panelClass: 'success-snackbar'
              });
            },
            error: (erro) => {
              this.carregando = false;
              this.snackBar.open('Erro ao atualizar produto', 'Fechar', {
                duration: 5000,
                panelClass: 'error-snackbar'
              });
              console.error('Erro ao atualizar produto:', erro);
            }
          });
        } else {
          // Adicionar novo produto
          this.servicoProdutos.create(resultado).subscribe({
            next: () => {
              this.carregarProdutos();
              this.snackBar.open('Produto adicionado com sucesso', 'Fechar', {
                duration: 3000,
                panelClass: 'success-snackbar'
              });
            },
            error: (erro) => {
              this.carregando = false;
              this.snackBar.open('Erro ao adicionar produto', 'Fechar', {
                duration: 5000,
                panelClass: 'error-snackbar'
              });
              console.error('Erro ao adicionar produto:', erro);
            }
          });
        }
      }
    });
  }

  editar(produto: Product) {
    this.abrirFormulario(produto);
  }

  excluir(id: number) {
    const dadosDialogo: ConfirmarDialogData = {
      titulo: 'Confirmar Exclusão',
      mensagem: 'Tem certeza que deseja excluir este produto?',
      botaoConfirmar: 'Excluir',
      botaoCancelar: 'Cancelar'
    };

    const dialogRef = this.dialogo.open(ConfirmarDialogComponent, {
      width: '400px',
      data: dadosDialogo
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        this.carregando = true;
        this.servicoProdutos.delete(id).subscribe({
          next: () => {
            this.carregarProdutos();
            this.snackBar.open('Produto excluído com sucesso', 'Fechar', {
              duration: 3000,
              panelClass: 'success-snackbar'
            });
          },
          error: (erro: any) => {
            this.carregando = false;
            this.snackBar.open('Erro ao excluir produto', 'Fechar', {
              duration: 5000,
              panelClass: 'error-snackbar'
            });
            console.error('Erro ao excluir produto:', erro);
          }
        });
      }
    });
  }
}
