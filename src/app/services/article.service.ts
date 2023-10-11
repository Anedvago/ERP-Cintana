import { Injectable } from '@angular/core';
import { SupabaseClient, User, createClient } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private supabaseClient!: SupabaseClient;
  private supabaseEnvironments: { apiKey: string; url: string } =
    environment.supabase;
  private userSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  constructor() {
    this.supabaseClient = createClient(
      this.supabaseEnvironments.url,
      this.supabaseEnvironments.apiKey
    );
  }

  public async getArticlesWithLowStock(): Promise<any[] | null> {
    let { data: Rooms, error } = await this.supabaseClient
      .from('Articles')
      .select('id,name,stock')
      .lte('stock', 10);
    return Rooms;
  }

  public async getAllArticles(): Promise<any[] | null> {
    let { data: Rooms, error } = await this.supabaseClient
      .from('Articles')
      .select('*');
    return Rooms;
  }
}
