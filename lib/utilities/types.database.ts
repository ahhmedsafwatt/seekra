export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      ai_models: {
        Row: {
          id: string
          name: string
          provider: string | null
          sort_order: number | null
          tool_id: string | null
          version: string | null
        }
        Insert: {
          id?: string
          name: string
          provider?: string | null
          sort_order?: number | null
          tool_id?: string | null
          version?: string | null
        }
        Update: {
          id?: string
          name?: string
          provider?: string | null
          sort_order?: number | null
          tool_id?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_models_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      analytics_events: {
        Row: {
          created_at: string | null
          event_type: Database["public"]["Enums"]["analytics_event_type_enum"]
          id: string
          ip_address: unknown | null
          referrer: string | null
          session_id: string | null
          tool_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_type: Database["public"]["Enums"]["analytics_event_type_enum"]
          id?: string
          ip_address?: unknown | null
          referrer?: string | null
          session_id?: string | null
          tool_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_type?: Database["public"]["Enums"]["analytics_event_type_enum"]
          id?: string
          ip_address?: unknown | null
          referrer?: string | null
          session_id?: string | null
          tool_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_events_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string | null
          id: string
          name: string
          parent_id: string | null
          sort_order: number | null
          updated_at: string | null
          usage_count: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          parent_id?: string | null
          sort_order?: number | null
          updated_at?: string | null
          usage_count?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          parent_id?: string | null
          sort_order?: number | null
          updated_at?: string | null
          usage_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      features: {
        Row: {
          description: string | null
          id: string
          sort_order: number | null
          title: string
          tool_id: string | null
        }
        Insert: {
          description?: string | null
          id?: string
          sort_order?: number | null
          title: string
          tool_id?: string | null
        }
        Update: {
          description?: string | null
          id?: string
          sort_order?: number | null
          title?: string
          tool_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "features_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      pricing_tiers: {
        Row: {
          features: Json | null
          highlighted: boolean | null
          id: string
          interval: Database["public"]["Enums"]["pricing_interval_enum"] | null
          is_custom_price: boolean | null
          limits: Json | null
          name: string
          price: number | null
          sort_order: number | null
          tool_id: string | null
        }
        Insert: {
          features?: Json | null
          highlighted?: boolean | null
          id?: string
          interval?: Database["public"]["Enums"]["pricing_interval_enum"] | null
          is_custom_price?: boolean | null
          limits?: Json | null
          name: string
          price?: number | null
          sort_order?: number | null
          tool_id?: string | null
        }
        Update: {
          features?: Json | null
          highlighted?: boolean | null
          id?: string
          interval?: Database["public"]["Enums"]["pricing_interval_enum"] | null
          is_custom_price?: boolean | null
          limits?: Json | null
          name?: string
          price?: number | null
          sort_order?: number | null
          tool_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pricing_tiers_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      sponsors: {
        Row: {
          contact_email: string | null
          created_at: string | null
          id: string
          logo_url: string | null
          name: string
          website_url: string | null
        }
        Insert: {
          contact_email?: string | null
          created_at?: string | null
          id?: string
          logo_url?: string | null
          name: string
          website_url?: string | null
        }
        Update: {
          contact_email?: string | null
          created_at?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          website_url?: string | null
        }
        Relationships: []
      }
      sponsorships: {
        Row: {
          banner_image_url: string | null
          category_id: string | null
          created_at: string | null
          cta_url: string | null
          end_date: string
          id: string
          note: string | null
          placement: string | null
          price: number | null
          sponsor_id: string | null
          start_date: string
          tool_id: string | null
        }
        Insert: {
          banner_image_url?: string | null
          category_id?: string | null
          created_at?: string | null
          cta_url?: string | null
          end_date: string
          id?: string
          note?: string | null
          placement?: string | null
          price?: number | null
          sponsor_id?: string | null
          start_date: string
          tool_id?: string | null
        }
        Update: {
          banner_image_url?: string | null
          category_id?: string | null
          created_at?: string | null
          cta_url?: string | null
          end_date?: string
          id?: string
          note?: string | null
          placement?: string | null
          price?: number | null
          sponsor_id?: string | null
          start_date?: string
          tool_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sponsorships_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sponsorships_sponsor_id_fkey"
            columns: ["sponsor_id"]
            isOneToOne: false
            referencedRelation: "sponsors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sponsorships_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          created_at: string | null
          id: string
          name: string
          usage_count: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          usage_count?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          usage_count?: number | null
        }
        Relationships: []
      }
      tool_alternatives: {
        Row: {
          alternative_tool_id: string
          tool_id: string
        }
        Insert: {
          alternative_tool_id: string
          tool_id: string
        }
        Update: {
          alternative_tool_id?: string
          tool_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tool_alternatives_alternative_tool_id_fkey"
            columns: ["alternative_tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tool_alternatives_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      tool_analytics_daily: {
        Row: {
          clicks: number | null
          date: string
          favorites_added: number | null
          reviews_added: number | null
          tool_id: string
          views: number | null
        }
        Insert: {
          clicks?: number | null
          date: string
          favorites_added?: number | null
          reviews_added?: number | null
          tool_id: string
          views?: number | null
        }
        Update: {
          clicks?: number | null
          date?: string
          favorites_added?: number | null
          reviews_added?: number | null
          tool_id?: string
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tool_analytics_daily_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      tool_categories: {
        Row: {
          category_id: string
          is_primary: boolean | null
          sort_order: number | null
          tool_id: string
        }
        Insert: {
          category_id: string
          is_primary?: boolean | null
          sort_order?: number | null
          tool_id: string
        }
        Update: {
          category_id?: string
          is_primary?: boolean | null
          sort_order?: number | null
          tool_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tool_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tool_categories_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      tool_tags: {
        Row: {
          tag_id: string
          tool_id: string
        }
        Insert: {
          tag_id: string
          tool_id: string
        }
        Update: {
          tag_id?: string
          tool_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tool_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tool_tags_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      tools: {
        Row: {
          affiliate_url: string | null
          api_doc_url: string | null
          approved_at: string | null
          click_count: number | null
          created_at: string | null
          description: string | null
          favorite_count: number | null
          github_stars: number | null
          has_api: boolean | null
          id: string
          is_featured: boolean | null
          is_trending: boolean | null
          last_updated: string | null
          logo_url: string | null
          meta_description: string | null
          meta_title: string | null
          name: string
          pricing_type: Database["public"]["Enums"]["pricing_type_enum"]
          primary_screenshot_url: string | null
          producthunt_votes: number | null
          rating: number | null
          review_count: number | null
          short_description: string | null
          slug: string
          starting_price: number | null
          status: Database["public"]["Enums"]["tool_status_enum"] | null
          submitted_at: string | null
          tagline: string | null
          total_users: number | null
          updated_at: string | null
          view_count: number | null
          website_url: string
        }
        Insert: {
          affiliate_url?: string | null
          api_doc_url?: string | null
          approved_at?: string | null
          click_count?: number | null
          created_at?: string | null
          description?: string | null
          favorite_count?: number | null
          github_stars?: number | null
          has_api?: boolean | null
          id?: string
          is_featured?: boolean | null
          is_trending?: boolean | null
          last_updated?: string | null
          logo_url?: string | null
          meta_description?: string | null
          meta_title?: string | null
          name: string
          pricing_type: Database["public"]["Enums"]["pricing_type_enum"]
          primary_screenshot_url?: string | null
          producthunt_votes?: number | null
          rating?: number | null
          review_count?: number | null
          short_description?: string | null
          slug: string
          starting_price?: number | null
          status?: Database["public"]["Enums"]["tool_status_enum"] | null
          submitted_at?: string | null
          tagline?: string | null
          total_users?: number | null
          updated_at?: string | null
          view_count?: number | null
          website_url: string
        }
        Update: {
          affiliate_url?: string | null
          api_doc_url?: string | null
          approved_at?: string | null
          click_count?: number | null
          created_at?: string | null
          description?: string | null
          favorite_count?: number | null
          github_stars?: number | null
          has_api?: boolean | null
          id?: string
          is_featured?: boolean | null
          is_trending?: boolean | null
          last_updated?: string | null
          logo_url?: string | null
          meta_description?: string | null
          meta_title?: string | null
          name?: string
          pricing_type?: Database["public"]["Enums"]["pricing_type_enum"]
          primary_screenshot_url?: string | null
          producthunt_votes?: number | null
          rating?: number | null
          review_count?: number | null
          short_description?: string | null
          slug?: string
          starting_price?: number | null
          status?: Database["public"]["Enums"]["tool_status_enum"] | null
          submitted_at?: string | null
          tagline?: string | null
          total_users?: number | null
          updated_at?: string | null
          view_count?: number | null
          website_url?: string
        }
        Relationships: []
      }
      user_favorites: {
        Row: {
          created_at: string | null
          tool_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          tool_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          tool_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_favorites_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      analytics_event_type_enum: "view" | "click" | "favorite" | "review"
      pricing_interval_enum: "monthly" | "yearly" | "one_time"
      pricing_type_enum:
        | "free"
        | "open_source"
        | "freemium"
        | "paid"
        | "enterprise"
      tool_status_enum: "pending" | "approved" | "rejected" | "archived"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      analytics_event_type_enum: ["view", "click", "favorite", "review"],
      pricing_interval_enum: ["monthly", "yearly", "one_time"],
      pricing_type_enum: [
        "free",
        "open_source",
        "freemium",
        "paid",
        "enterprise",
      ],
      tool_status_enum: ["pending", "approved", "rejected", "archived"],
    },
  },
} as const
