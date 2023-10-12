import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private supabaseClient!: SupabaseClient;
  private supabaseEnvironments: { apiKey: string; url: string } =
    environment.supabase;

  constructor() {
    this.supabaseClient = createClient(
      this.supabaseEnvironments.url,
      this.supabaseEnvironments.apiKey
    );
  }

  public async getAllDepartaments(): Promise<any[] | null> {
    let { data: Departaments, error } = await this.supabaseClient
      .from('Departaments')
      .select('*')
      .eq('type', 'A');
    return Departaments;
  }
  public async getAllSections(): Promise<any[] | null> {
    let { data: Sections, error } = await this.supabaseClient
      .from('Sections')
      .select('*')
      .eq('type', 'A');
    return Sections;
  }

  public async getAllFamilies(): Promise<any[] | null> {
    let { data: Families, error } = await this.supabaseClient
      .from('Families')
      .select('*')
      .eq('type', 'A');
    return Families;
  }
}
