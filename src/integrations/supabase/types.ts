export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      meal_plans: {
        Row: {
          calories: number | null
          carbs_g: number | null
          created_at: string
          description: string | null
          fats_g: number | null
          fibre_g: number | null
          id: string
          image_url: string | null
          ingredients: Json | null
          is_active: boolean | null
          meal_type: string | null
          name: string
          protein_g: number | null
          recipe_instructions: string | null
        }
        Insert: {
          calories?: number | null
          carbs_g?: number | null
          created_at?: string
          description?: string | null
          fats_g?: number | null
          fibre_g?: number | null
          id?: string
          image_url?: string | null
          ingredients?: Json | null
          is_active?: boolean | null
          meal_type?: string | null
          name: string
          protein_g?: number | null
          recipe_instructions?: string | null
        }
        Update: {
          calories?: number | null
          carbs_g?: number | null
          created_at?: string
          description?: string | null
          fats_g?: number | null
          fibre_g?: number | null
          id?: string
          image_url?: string | null
          ingredients?: Json | null
          is_active?: boolean | null
          meal_type?: string | null
          name?: string
          protein_g?: number | null
          recipe_instructions?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          date_of_birth: string | null
          email: string | null
          first_name: string | null
          height_cm: number | null
          id: string
          last_name: string | null
          phone: string | null
          subscription_expires_at: string | null
          subscription_status: string | null
          updated_at: string
          user_id: string
          weight_kg: number | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          first_name?: string | null
          height_cm?: number | null
          id?: string
          last_name?: string | null
          phone?: string | null
          subscription_expires_at?: string | null
          subscription_status?: string | null
          updated_at?: string
          user_id: string
          weight_kg?: number | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          first_name?: string | null
          height_cm?: number | null
          id?: string
          last_name?: string | null
          phone?: string | null
          subscription_expires_at?: string | null
          subscription_status?: string | null
          updated_at?: string
          user_id?: string
          weight_kg?: number | null
        }
        Relationships: []
      }
      progress_photos: {
        Row: {
          created_at: string
          id: string
          photo_type: string
          photo_url: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          photo_type: string
          photo_url: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          photo_type?: string
          photo_url?: string
          user_id?: string
        }
        Relationships: []
      }
      user_goal_tracking: {
        Row: {
          calories_consumed: number | null
          created_at: string
          date: string
          id: string
          sleep_hours: number | null
          steps: number | null
          user_id: string
          water_ml: number | null
        }
        Insert: {
          calories_consumed?: number | null
          created_at?: string
          date?: string
          id?: string
          sleep_hours?: number | null
          steps?: number | null
          user_id: string
          water_ml?: number | null
        }
        Update: {
          calories_consumed?: number | null
          created_at?: string
          date?: string
          id?: string
          sleep_hours?: number | null
          steps?: number | null
          user_id?: string
          water_ml?: number | null
        }
        Relationships: []
      }
      user_plan_purchases: {
        Row: {
          amount_paid: number
          expires_at: string
          id: string
          is_active: boolean | null
          payment_id: string | null
          plan_name: string
          plan_type: string
          purchased_at: string
          user_id: string
        }
        Insert: {
          amount_paid: number
          expires_at: string
          id?: string
          is_active?: boolean | null
          payment_id?: string | null
          plan_name: string
          plan_type: string
          purchased_at?: string
          user_id: string
        }
        Update: {
          amount_paid?: number
          expires_at?: string
          id?: string
          is_active?: boolean | null
          payment_id?: string | null
          plan_name?: string
          plan_type?: string
          purchased_at?: string
          user_id?: string
        }
        Relationships: []
      }
      workout_plans: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          difficulty: string | null
          duration_minutes: number | null
          equipment: string[] | null
          exercises: Json | null
          id: string
          image_url: string | null
          is_active: boolean | null
          name: string
          video_url: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          difficulty?: string | null
          duration_minutes?: number | null
          equipment?: string[] | null
          exercises?: Json | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name: string
          video_url?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          difficulty?: string | null
          duration_minutes?: number | null
          equipment?: string[] | null
          exercises?: Json | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          video_url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
  public: {
    Enums: {},
  },
} as const
