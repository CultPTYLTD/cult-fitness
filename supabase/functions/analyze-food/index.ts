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
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    let prompt: string;
    let messages: any[];

    if (barcode) {
      // Barcode lookup - text-only request
      prompt = `You are a nutrition expert. Look up the nutritional information for the product with barcode: ${barcode}. 
      
Return a JSON object with this exact structure (no markdown, just pure JSON):
{
  "food_name": "Product name",
  "serving_size": "e.g., 100g or 1 serving (30g)",
  "calories": number,
  "protein_g": number,
  "carbs_g": number,
  "fats_g": number,
  "fibre_g": number
}

If you cannot identify the product, return:
{
  "error": "Could not identify product",
  "food_name": "Unknown product"
}`;
      
      messages = [
        { role: 'system', content: 'You are a nutrition database expert. Always respond with valid JSON only, no markdown formatting.' },
        { role: 'user', content: prompt }
      ];
    } else if (imageBase64) {
      // Image analysis
      prompt = `Analyze this food image and estimate the nutritional content. 

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

      messages = [
        { role: 'system', content: 'You are a nutrition expert AI that analyzes food images. Always respond with valid JSON only, no markdown formatting.' },
        { 
          role: 'user', 
          content: [
            { type: 'text', text: prompt },
            { 
              type: 'image_url', 
              image_url: { 
                url: imageBase64.startsWith('data:') ? imageBase64 : `data:image/jpeg;base64,${imageBase64}` 
              } 
            }
          ]
        }
      ];
    } else {
      return new Response(
        JSON.stringify({ error: 'Either imageBase64 or barcode is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Sending request to Lovable AI...');
    
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please add credits to continue.' }),
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

    // Parse the JSON response (handle possible markdown wrapping)
    let nutritionData;
    try {
      // Remove potential markdown code blocks
      const cleanedContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      nutritionData = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error('Failed to parse AI response:', content);
      nutritionData = {
        error: 'Could not parse nutrition data',
        food_name: 'Unknown food',
        raw_response: content
      };
    }

    return new Response(
      JSON.stringify(nutritionData),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in analyze-food function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});