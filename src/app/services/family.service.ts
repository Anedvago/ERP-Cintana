import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {

  private supabaseClient!: SupabaseClient;
  private supabaseEnvironments: { apiKey: string; url: string } =
    environment.supabase;

  constructor() {
    this.supabaseClient = createClient(
      this.supabaseEnvironments.url,
      this.supabaseEnvironments.apiKey
    );
  }

  public async getAllFamilies(): Promise<any[] | null> {
    let { data: Families, error } = await this.supabaseClient
      .from('Families')
      .select('*');
    return Families;
  }

  public async insertFamily(type: string, departament: string, section: string, name: string): Promise<any[] | null> {
    const { data, error } = await this.supabaseClient
      .from('Families')
      .insert([
        { type: type, departament: departament, section: section, name: name },
      ])
      .select()

    return data;
  }
}

