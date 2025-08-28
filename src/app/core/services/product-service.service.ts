// src/app/core/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { apiconsumo } from '../../../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {

  constructor(private http: HttpClient) { }
  private readonly baseURL = `${apiconsumo.baseURL}/products`;

  /**
   * Obtém todos os produtos
   */
  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseURL);
  }

  /**
   * Obtém um produto pelo ID
   */
  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseURL}/${id}`);
  }

  /**
   * Remove um produto pelo ID
   */
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  /**
   * Atualiza um produto existente
   */
  update(id: number, produto: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseURL}/${id}`, produto);
  }

  /**
   * Adiciona um novo produto
   */
  create(produto: Product): Observable<Product> {
    return this.http.post<Product>(this.baseURL, produto);
  }
}
