import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64, barcode } = await req.json();

    // 1) BARCODE LOOKUP: use Open Food Facts for accurate product data
    if (barcode) {
      const raw = String(barcode);
      const cleaned = raw.replace(/\D/g, ''); // keep digits only

      if (!cleaned) {
        return new Response(
          JSON.stringify({ error: 'Invalid barcode format', food_name: 'Unknown product' }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log('Looking up barcode in Open Food Facts:', cleaned);

      const offResponse = await fetch(
        `https://world.openfoodfacts.org/api/v2/product/${cleaned}.json`
      );

      if (!offResponse.ok) {
        console.error('Open Food Facts HTTP error:', offResponse.status, offResponse.statusText);
        return new Response(
          JSON.stringify({ error: 'Could not reach product database', food_name: 'Unknown product' }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const offData = await offResponse.json();

      if (offData.status !== 1 || !offData.product) {
        console.warn('Product not found for barcode:', cleaned);
        return new Response(
          JSON.stringify({
            error: 'Product not found for this barcode',
            food_name: 'Unknown product',
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const product = offData.product;
      const nutriments = product.nutriments || {};

      const numOrNull = (value: unknown): number | null => {
        if (typeof value === 'number') return Math.round(value);
        if (typeof value === 'string') {
          const n = parseFloat(value);
          return Number.isFinite(n) ? Math.round(n) : null;
        }
        return null;
      };

      // Prefer per-serving values, fall back to per 100g
      const calories =
        numOrNull(nutriments['energy-kcal_serving']) ??
        numOrNull(nutriments['energy-kcal_100g']);
      const protein_g =
        numOrNull(nutriments['proteins_serving']) ??
        numOrNull(nutriments['proteins_100g']);
      const carbs_g =
        numOrNull(nutriments['carbohydrates_serving']) ??
        numOrNull(nutriments['carbohydrates_100g']);
      const fats_g =
        numOrNull(nutriments['fat_serving']) ??
        numOrNull(nutriments['fat_100g']);
      const fibre_g =
        numOrNull(nutriments['fiber_serving']) ??
        numOrNull(nutriments['fiber_100g']);

      const food_name =
        product.product_name || product.generic_name || 'Unknown product';
      const serving_size = product.serving_size || '100 g';

      const result = {
        food_name,
        serving_size,
        calories: calories ?? 0,
        protein_g: protein_g ?? 0,
        carbs_g: carbs_g ?? 0,
        fats_g: fats_g ?? 0,
        fibre_g: fibre_g ?? 0,
      };

      console.log('Barcode nutrition result:', result);

      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 2) IMAGE ANALYSIS: keep using Lovable AI for photo-based estimates
    if (imageBase64) {
      const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
      if (!LOVABLE_API_KEY) {
        throw new Error('LOVABLE_API_KEY is not configured');
      }

      const prompt = `Analyze this food image and estimate the nutritional content. 

Return a JSON object with this exact structure (no markdown, just pure JSON):
{
  "food_name": "Name of the food/meal",
  "serving_size": "Estimated serving size",
  "calories": number (estimated calories),
  "protein_g": number (estimated protein in grams),
  "carbs_g": number (estimated carbohydrates in grams),
  "fats_g": number (estimated fat in grams),
  "fibre_g": number (estimated fiber in grams)
}

Be as accurate as possible based on the visual appearance and typical portion sizes.`;

      const messages = [
        {
          role: 'system',
          content:
            'You are a nutrition expert AI that analyzes food images. Always respond with valid JSON only, no markdown formatting.',
        },
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            {
              type: 'image_url',
              image_url: {
                url: imageBase64.startsWith('data:')
                  ? imageBase64
                  : `data:image/jpeg;base64,${imageBase64}`,
              },
            },
          ],
        },
      ];

      console.log('Sending image to Lovable AI...');

      const response = await fetch(
        'https://ai.gateway.lovable.dev/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'google/gemini-2.5-flash',
            messages,
          }),
        }
      );

      if (!response.ok) {
        if (response.status === 429) {
          return new Response(
            JSON.stringify({
              error: 'Rate limit exceeded. Please try again in a moment.',
            }),
            { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        if (response.status === 402) {
          return new Response(
            JSON.stringify({
              error: 'AI credits exhausted. Please add credits to continue.',
            }),
            { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const errorText = await response.text();
        console.error('AI Gateway error:', response.status, errorText);
        throw new Error(`AI Gateway error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;

      if (!content) {
        throw new Error('No response from AI');
      }

      console.log('AI Response:', content);

      let nutritionData;
      try {
        const cleanedContent = content
          .replace(/```json\n?/g, '')
          .replace(/```\n?/g, '')
          .trim();
        nutritionData = JSON.parse(cleanedContent);
      } catch (parseError) {
        console.error('Failed to parse AI response:', content);
        nutritionData = {
          error: 'Could not parse nutrition data',
          food_name: 'Unknown food',
          raw_response: content,
        };
      }

      return new Response(JSON.stringify(nutritionData), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Neither barcode nor image provided
    return new Response(
      JSON.stringify({ error: 'Either imageBase64 or barcode is required' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in analyze-food function:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
