import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DepartamentService {

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
      .select('*');
    return Departaments;
  }

  public async insertDepartament(type: string, name: string): Promise<any[] | null> {
    const { data, error } = await this.supabaseClient
      .from('Departaments')
      .insert([
        { type: type, name: name },
      ])
      .select()

    return data;
  }
}
