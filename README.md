# Nexus Store (E-Commerce Angular)

Acesse aqui e utilize a página: [Nexus Store Ecommerce](https://helbertaguiar.github.io/adatech_projeto_final2/)

Este projeto é uma aplicação Single-Page Application (SPA) desenvolvida em Angular, simulando uma loja online (Vitrine E-commerce). O projeto foi criado com [Angular CLI](https://github.com/angular/angular-cli) versão 19.2.15.

## Arquitetura do Projeto

O projeto segue uma arquitetura modular e organizada, dividida nas seguintes estruturas principais:

### Estrutura de Pastas

```
src/
├── app/
│   ├── core/               # Serviços, modelos, guards e interceptors
│   │   ├── guards/
│   │   ├── interceptors/   
│   │   ├── models/        
│   │   └── services/       
│   ├── pages/              # Páginas principais da aplicação
│   │   ├── admin/
│   │   ├── cart/
│   │   ├── home/
│   │   ├── login/
│   │   └── product-detail/
│   └── shared/             # Componentes e pipes reutilizáveis
│       ├── components/
│       └── pipes/
├── assets/                 # Recursos estáticos
└── styles/                 # Estilos globais e variáveis
```

### Funcionalidades Implementadas

O projeto implementa todas as funcionalidades especificadas nos requisitos:

1. **Página Inicial (Listagem de Produtos)**
   - Exibe uma lista de produtos consumidos da API FakeStoreAPI
   - Utiliza componentes reutilizáveis (ProductCardComponent)
   - Implementa redirecionamento para a página de detalhes ao clicar em um produto

2. **Página de Detalhes do Produto**
   - Exibe informações completas de um único produto (imagem, título, preço, descrição)
   - Contém botão "Adicionar ao Carrinho"

3. **Página de Login**
   - Formulário simples com campos para "usuário" e "senha"
   - Requisição POST para autenticação na API
   - Armazenamento do token JWT no localStorage
   - Sistema de controle de estado de autenticação

4. **Página do Carrinho de Compras (Rota Protegida)**
   - Acessível apenas para usuários autenticados
   - Exibe produtos adicionados pelo usuário
   - Funcionalidade para remover itens do carrinho

5. **Módulo de Administração (Lazy Loading)**
   - Área para administração de produtos
   - Implementado com carregamento sob demanda (Lazy Loading)
   - Funcionalidade para deletar produtos (simulando um CRUD)

## Requisitos Técnicos Implementados

O projeto aplica os seguintes conceitos do Angular:

### 1. Rotas e Navegação
- Utilização do `RouterModule` para criar as rotas: `/home`, `/product/:id`, `/login`, `/cart` e `/admin`
- Implementação de `Route Guard` (AuthGuard) para proteger as rotas `/cart` e `/admin`
- Uso de `routerLink` para navegação declarativa e `Router.navigate()` para navegação imperativa

### 2. Componentização e Estado
- Componentes bem definidos como NavbarComponent, ProductCardComponent, ProductDetailComponent, etc.
- Utilização de `@Input()` e `@Output()` para comunicação entre componentes

### 3. Serviços e Injeção de Dependência
- `ProductService` para comunicação com endpoints de produtos da API
- `AuthService` para gerenciar login, logout e verificação do status de autenticação
- `CartService` para gerenciar o estado do carrinho de compras
- Todos os serviços são injetáveis com `@Injectable({ providedIn: 'root' })`

### 4. Observables e Signals
- Chamadas HTTP com HttpClient retornam Observables
- Implementação de Signals para gerenciamento de estado reativo

### 5. Autenticação JWT
- Implementação de `HttpInterceptor` que anexa automaticamente o token JWT ao cabeçalho
- Utilização de `Bearer Token` em todas as requisições às rotas protegidas

### 6. Técnicas de Desempenho
- Implementação de Lazy Loading para o módulo de administração
- A rota `/admin` e seus componentes só são carregados quando o usuário acessa essa rota

## Boas Práticas de Angular Utilizadas

1. **Arquitetura por Responsabilidade**: Separação clara entre core, pages e shared
2. **Carregamento Sob Demanda**: Lazy loading para módulos que não são necessários no carregamento inicial
3. **Tipagem Forte**: Uso de interfaces para tipagem (Product, LoginRequest, etc.)
4. **Gestão de Estado**: Utilização de Signals para gerenciamento reativo de estado
5. **Interceptors**: Manipulação centralizada das requisições HTTP
6. **Guards**: Proteção de rotas baseada em autenticação
7. **Pipes Personalizados**: Criação do TruncatePipe para facilitar a formatação de textos
8. **Componentes Reutilizáveis**: Componentes compartilhados no diretório shared
9. **Organização de Estilos**: Variáveis SCSS para consistência visual da aplicação

## Como rodar a aplicação (em DES)

Para iniciar o servidor de desenvolvimento, execute:

```bash
ng serve
```

Acesse `http://localhost:4200/` no navegador. A aplicação será recarregada automaticamente se você modificar qualquer arquivo fonte.

## Build

Para construir o projeto, execute:

```bash
ng build
```

Os artefatos da construção serão armazenados no diretório `dist/`.
