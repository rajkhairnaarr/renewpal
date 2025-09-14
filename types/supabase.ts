export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string
          name: string
          slug: string
          plan: 'free' | 'pro' | 'team' | 'enterprise'
          settings: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          plan?: 'free' | 'pro' | 'team' | 'enterprise'
          settings?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          plan?: 'free' | 'pro' | 'team' | 'enterprise'
          settings?: Json
          created_at?: string
          updated_at?: string
        }
      }
      organization_members: {
        Row: {
          id: string
          organization_id: string
          user_id: string
          role: 'admin' | 'member' | 'viewer'
          permissions: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          user_id: string
          role?: 'admin' | 'member' | 'viewer'
          permissions?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          user_id?: string
          role?: 'admin' | 'member' | 'viewer'
          permissions?: Json
          created_at?: string
          updated_at?: string
        }
      }
      renewals: {
        Row: {
          id: string
          organization_id: string
          title: string
          description: string | null
          category: string
          vendor: string
          amount: number
          currency: string
          renewal_date: string
          notification_days: number[]
          status: 'active' | 'cancelled' | 'completed'
          custom_fields: Json
          attachments: string[]
          created_by: string
          assigned_to: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          title: string
          description?: string | null
          category: string
          vendor: string
          amount: number
          currency?: string
          renewal_date: string
          notification_days?: number[]
          status?: 'active' | 'cancelled' | 'completed'
          custom_fields?: Json
          attachments?: string[]
          created_by: string
          assigned_to?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          title?: string
          description?: string | null
          category?: string
          vendor?: string
          amount?: number
          currency?: string
          renewal_date?: string
          notification_days?: number[]
          status?: 'active' | 'cancelled' | 'completed'
          custom_fields?: Json
          attachments?: string[]
          created_by?: string
          assigned_to?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          organization_id: string
          renewal_id: string
          user_id: string
          type: 'email' | 'sms' | 'in_app' | 'slack'
          status: 'pending' | 'sent' | 'failed' | 'acknowledged'
          scheduled_at: string
          sent_at: string | null
          content: Json
          created_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          renewal_id: string
          user_id: string
          type: 'email' | 'sms' | 'in_app' | 'slack'
          status?: 'pending' | 'sent' | 'failed' | 'acknowledged'
          scheduled_at: string
          sent_at?: string | null
          content: Json
          created_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          renewal_id?: string
          user_id?: string
          type?: 'email' | 'sms' | 'in_app' | 'slack'
          status?: 'pending' | 'sent' | 'failed' | 'acknowledged'
          scheduled_at?: string
          sent_at?: string | null
          content?: Json
          created_at?: string
        }
      }
      audit_logs: {
        Row: {
          id: string
          organization_id: string
          user_id: string
          action: string
          resource_type: string
          resource_id: string
          details: Json
          ip_address: string
          user_agent: string
          created_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          user_id: string
          action: string
          resource_type: string
          resource_id: string
          details: Json
          ip_address: string
          user_agent: string
          created_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          user_id?: string
          action?: string
          resource_type?: string
          resource_id?: string
          details?: Json
          ip_address?: string
          user_agent?: string
          created_at?: string
        }
      }
      files: {
        Row: {
          id: string
          organization_id: string
          renewal_id: string
          filename: string
          original_name: string
          mime_type: string
          size: number
          url: string
          uploaded_by: string
          created_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          renewal_id: string
          filename: string
          original_name: string
          mime_type: string
          size: number
          url: string
          uploaded_by: string
          created_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          renewal_id?: string
          filename?: string
          original_name?: string
          mime_type?: string
          size?: number
          url?: string
          uploaded_by?: string
          created_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          organization_id: string
          stripe_subscription_id: string
          stripe_customer_id: string
          plan: 'free' | 'pro' | 'team' | 'enterprise'
          status: 'active' | 'canceled' | 'past_due' | 'unpaid'
          current_period_start: string
          current_period_end: string
          cancel_at_period_end: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          stripe_subscription_id: string
          stripe_customer_id: string
          plan: 'free' | 'pro' | 'team' | 'enterprise'
          status?: 'active' | 'canceled' | 'past_due' | 'unpaid'
          current_period_start: string
          current_period_end: string
          cancel_at_period_end?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          stripe_subscription_id?: string
          stripe_customer_id?: string
          plan?: 'free' | 'pro' | 'team' | 'enterprise'
          status?: 'active' | 'canceled' | 'past_due' | 'unpaid'
          current_period_start?: string
          current_period_end?: string
          cancel_at_period_end?: boolean
          created_at?: string
          updated_at?: string
        }
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
  }
} 