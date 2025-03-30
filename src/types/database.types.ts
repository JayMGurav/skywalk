export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
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
      airports: {
        Row: {
          city: string
          city_name: string
          code: string
          country: string
          country_name: string
          id: string
          name: string
          province: string | null
          type: string
        }
        Insert: {
          city: string
          city_name: string
          code: string
          country: string
          country_name: string
          id?: string
          name: string
          province?: string | null
          type: string
        }
        Update: {
          city?: string
          city_name?: string
          code?: string
          country?: string
          country_name?: string
          id?: string
          name?: string
          province?: string | null
          type?: string
        }
        Relationships: []
      }
      booking: {
        Row: {
          base_fare: string
          contact_email: string
          contact_phone: string
          created_at: string | null
          currency_code: string
          id: string
          number_of_travellers: number
          tax: string
          ticket_type: string
          token: string
          total_price: string
          user_id: string
        }
        Insert: {
          base_fare: string
          contact_email: string
          contact_phone: string
          created_at?: string | null
          currency_code: string
          id?: string
          number_of_travellers: number
          tax: string
          ticket_type: string
          token: string
          total_price: string
          user_id: string
        }
        Update: {
          base_fare?: string
          contact_email?: string
          contact_phone?: string
          created_at?: string | null
          currency_code?: string
          id?: string
          number_of_travellers?: number
          tax?: string
          ticket_type?: string
          token?: string
          total_price?: string
          user_id?: string
        }
        Relationships: []
      }
      booking_segment: {
        Row: {
          arrival_airport_id: string | null
          arrival_time: string
          booking_id: string | null
          cabin_class: string
          carrier_id: string | null
          departure_airport_id: string | null
          departure_time: string
          flight_number: string
          id: string
          total_time: number
        }
        Insert: {
          arrival_airport_id?: string | null
          arrival_time: string
          booking_id?: string | null
          cabin_class: string
          carrier_id?: string | null
          departure_airport_id?: string | null
          departure_time: string
          flight_number: string
          id?: string
          total_time: number
        }
        Update: {
          arrival_airport_id?: string | null
          arrival_time?: string
          booking_id?: string | null
          cabin_class?: string
          carrier_id?: string | null
          departure_airport_id?: string | null
          departure_time?: string
          flight_number?: string
          id?: string
          total_time?: number
        }
        Relationships: [
          {
            foreignKeyName: "booking_segment_arrival_airport_id_fkey"
            columns: ["arrival_airport_id"]
            isOneToOne: false
            referencedRelation: "airports"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_segment_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "booking"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_segment_carrier_id_fkey"
            columns: ["carrier_id"]
            isOneToOne: false
            referencedRelation: "carriers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_segment_departure_airport_id_fkey"
            columns: ["departure_airport_id"]
            isOneToOne: false
            referencedRelation: "airports"
            referencedColumns: ["id"]
          },
        ]
      }
      booking_segment_luggage: {
        Row: {
          id: string
          is_checked_luggage: boolean | null
          luggage_type: string
          mass_unit: string | null
          max_piece: number | null
          max_weight_per_piece: number | null
          rule_type: string | null
          segment_id: string | null
          size_max_height: number | null
          size_max_length: number | null
          size_max_width: number | null
          size_unit: string | null
          traveller_reference: string
        }
        Insert: {
          id?: string
          is_checked_luggage?: boolean | null
          luggage_type: string
          mass_unit?: string | null
          max_piece?: number | null
          max_weight_per_piece?: number | null
          rule_type?: string | null
          segment_id?: string | null
          size_max_height?: number | null
          size_max_length?: number | null
          size_max_width?: number | null
          size_unit?: string | null
          traveller_reference: string
        }
        Update: {
          id?: string
          is_checked_luggage?: boolean | null
          luggage_type?: string
          mass_unit?: string | null
          max_piece?: number | null
          max_weight_per_piece?: number | null
          rule_type?: string | null
          segment_id?: string | null
          size_max_height?: number | null
          size_max_length?: number | null
          size_max_width?: number | null
          size_unit?: string | null
          traveller_reference?: string
        }
        Relationships: [
          {
            foreignKeyName: "booking_segment_luggage_segment_id_fkey"
            columns: ["segment_id"]
            isOneToOne: false
            referencedRelation: "booking_segment"
            referencedColumns: ["id"]
          },
        ]
      }
      booking_traveller: {
        Row: {
          booking_id: string | null
          first_name: string
          gender: Database["public"]["Enums"]["gender"]
          id: string
          last_name: string
        }
        Insert: {
          booking_id?: string | null
          first_name: string
          gender: Database["public"]["Enums"]["gender"]
          id?: string
          last_name: string
        }
        Update: {
          booking_id?: string | null
          first_name?: string
          gender?: Database["public"]["Enums"]["gender"]
          id?: string
          last_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "booking_traveller_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "booking"
            referencedColumns: ["id"]
          },
        ]
      }
      carriers: {
        Row: {
          code: string
          id: string
          logo: string | null
          name: string
        }
        Insert: {
          code: string
          id?: string
          logo?: string | null
          name: string
        }
        Update: {
          code?: string
          id?: string
          logo?: string | null
          name?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          created_at: string
          first_name: string | null
          gender: Database["public"]["Enums"]["gender"] | null
          id: string
          last_name: string | null
          phone: string | null
          recent_searches: Json[] | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          first_name?: string | null
          gender?: Database["public"]["Enums"]["gender"] | null
          id: string
          last_name?: string | null
          phone?: string | null
          recent_searches?: Json[] | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          first_name?: string | null
          gender?: Database["public"]["Enums"]["gender"] | null
          id?: string
          last_name?: string | null
          phone?: string | null
          recent_searches?: Json[] | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_recent_search: {
        Args: {
          user_id: string
          from_id: string
          to_id: string
          from_city_name: string
          to_city_name: string
          departure_date: string
          arrival_date: string
          cabin_class: string
          adults: number
        }
        Returns: undefined
      }
      save_recent_search: {
        Args: {
          from_id: string
          to_id: string
          from_city_name: string
          to_city_name: string
          departure_date: string
          arrival_date: string
          cabin_class: string
          adults: number
        }
        Returns: undefined
      }
    }
    Enums: {
      gender: "male" | "female" | "other"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          user_metadata: Json | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          owner_id: string | null
          upload_signature: string
          user_metadata: Json | null
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          owner_id?: string | null
          upload_signature: string
          user_metadata?: Json | null
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          owner_id?: string | null
          upload_signature?: string
          user_metadata?: Json | null
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "s3_multipart_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
        }
        Returns: {
          key: string
          id: string
          created_at: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          start_after?: string
          next_token?: string
        }
        Returns: {
          name: string
          id: string
          metadata: Json
          updated_at: string
        }[]
      }
      operation: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
