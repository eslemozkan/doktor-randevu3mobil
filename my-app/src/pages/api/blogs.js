import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    case 'POST':
      try {
        const { data, error } = await supabase
          .from('blogs')
          .insert([req.body])
          .select();
        
        if (error) throw error;
        res.status(201).json(data[0]);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 