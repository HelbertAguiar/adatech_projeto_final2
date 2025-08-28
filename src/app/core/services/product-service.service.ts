// src/app/core/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { apiconsumo } from '../../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class ProductService {

  constructor(private http: HttpClient) { }
  private readonly baseURL = `${apiconsumo.baseURL}/products`;

  getAll() {
    return this.http.get<Product[]>(this.baseURL);
  }

  getById(id: number) {
    return this.http.get<Product>(`${this.baseURL}/${id}`);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

}
