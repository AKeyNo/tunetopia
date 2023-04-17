export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      album: {
        Row: {
          album_id: number;
          genre: string | null;
          image: string | null;
          label: string | null;
          name: string;
          release_year: number | null;
        };
        Insert: {
          album_id?: number;
          genre?: string | null;
          image?: string | null;
          label?: string | null;
          name: string;
          release_year?: number | null;
        };
        Update: {
          album_id?: number;
          genre?: string | null;
          image?: string | null;
          label?: string | null;
          name?: string;
          release_year?: number | null;
        };
      };
      album_artist: {
        Row: {
          album_id: number;
          artist_id: number;
        };
        Insert: {
          album_id: number;
          artist_id: number;
        };
        Update: {
          album_id?: number;
          artist_id?: number;
        };
      };
      artist: {
        Row: {
          artist_id: number;
          description: string | null;
          image: string | null;
          is_solo: boolean | null;
          location: string | null;
          name: string;
          year_formed: string | null;
        };
        Insert: {
          artist_id?: number;
          description?: string | null;
          image?: string | null;
          is_solo?: boolean | null;
          location?: string | null;
          name: string;
          year_formed?: string | null;
        };
        Update: {
          artist_id?: number;
          description?: string | null;
          image?: string | null;
          is_solo?: boolean | null;
          location?: string | null;
          name?: string;
          year_formed?: string | null;
        };
      };
      profile: {
        Row: {
          avatar_url: string | null;
          full_name: string | null;
          id: string;
          summary: string | null;
          updated_at: string | null;
          username: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          full_name?: string | null;
          id: string;
          summary?: string | null;
          updated_at?: string | null;
          username?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          full_name?: string | null;
          id?: string;
          summary?: string | null;
          updated_at?: string | null;
          username?: string | null;
        };
      };
      song: {
        Row: {
          artist_id: number;
          name: string;
          song_id: number;
        };
        Insert: {
          artist_id: number;
          name: string;
          song_id?: number;
        };
        Update: {
          artist_id?: number;
          name?: string;
          song_id?: number;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
