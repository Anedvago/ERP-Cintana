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

  //Departaments

  public async getAllArticlesDepartaments(): Promise<any[] | null> {
    let { data: Departaments, error } = await this.supabaseClient
      .from('Departaments')
      .select('*')
      .eq('type', 'A');
    return Departaments;
  }

  public async getAllServicesDepartaments(): Promise<any[] | null> {
    let { data: Departaments, error } = await this.supabaseClient
      .from('Departaments')
      .select('*')
      .eq('type', 'S');
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


  //Sections


  public async getAllArticlesSections(): Promise<any[] | null> {
    let { data: Sections, error } = await this.supabaseClient
      .from('Sections')
      .select('*')
      .eq('type', 'A');
    return Sections;
  }

  public async getAllServicesSections(): Promise<any[] | null> {
    let { data: Sections, error } = await this.supabaseClient
      .from('Sections')
      .select('*')
      .eq('type', 'S');
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


  //Families


  public async getAllArticlesFamilies(): Promise<any[] | null> {
    let { data: Families, error } = await this.supabaseClient
      .from('Families')
      .select('*')
      .eq('type', 'A');
    return Families;
  }
  public async getAllServicesFamilies(): Promise<any[] | null> {
    let { data: Families, error } = await this.supabaseClient
      .from('Families')
      .select('*')
      .eq('type', 'S');
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
