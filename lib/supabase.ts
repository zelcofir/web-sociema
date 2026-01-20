// lib/supabase.ts
import { createClient as createBrowserClient } from "./client";

// Aquí creamos la instancia que tu página está buscando
export const supabase = createBrowserClient();