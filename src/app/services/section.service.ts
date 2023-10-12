import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  private supabaseClient!: SupabaseClient;
  private supabaseEnvironments: { apiKey: string; url: string } =
    environment.supabase;

  constructor() {
    this.supabaseClient = createClient(
      this.supabaseEnvironments.url,
      this.supabaseEnvironments.apiKey
    );
  }

  public async getAllSections(): Promise<any[] | null> {
    let { data: Sections, error } = await this.supabaseClient
      .from('Sections')
      .select('*');
    return Sections;
  }

  public async insertSection(type: string, departament: string, name: string): Promise<any[] | null> {
    const { data, error } = await this.supabaseClient
      .from('Sections')
      .insert([
        { type: type, departament: departament, name: name },
      ])
      .select()

    return data;
  }
}



