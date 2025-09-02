import { GoogleGenAI, Type, HarmCategory, HarmBlockThreshold } from "@google/genai";
import { type Recipe } from '../types';
import { type Language } from "../translations";

const apiKey = process.env.API_KEY;

if (!apiKey) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey });

const recipeSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        recipeName: {
          type: Type.STRING,
          description: "The name of the recipe.",
        },
        description: {
            type: Type.STRING,
            description: "A short, enticing description of the dish."
        },
        ingredients: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING,
            description: "A required ingredient for the recipe, including quantity."
          },
          description: "A list of all ingredients required for the recipe.",
        },
        instructions: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
              description: "A single step in the cooking instructions."
            },
            description: "The step-by-step instructions to prepare the dish.",
        }
      },
      required: ["recipeName", "description", "ingredients", "instructions"],
    },
};

const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
];


const getPrompt = (ingredients: string, language: Language): string => {
    if (language === 'ur') {
        return `
        آپ ایک ماہر شیف ہیں۔ درج ذیل اجزاء کی بنیاد پر، 3 تخلیقی اور مزیدار ترکیبیں بنائیں۔
        یقینی بنائیں کہ ترکیبیں بنیادی طور پر فراہم کردہ اجزاء کا استعمال کرتی ہیں لیکن عام پینٹری اسٹیپلز (جیسے نمک، کالی مرچ، تیل، پانی، آٹا) شامل کرنے کے لیے آزاد محسوس کریں۔
        پورا جواب اردو زبان میں دیں۔
        
        دستیاب اجزاء: ${ingredients}

        آؤٹ پٹ کو ایک صاف، منظم JSON فارمیٹ میں فراہم کریں۔
        `;
    }

    return `
    You are an expert chef. Based on the following ingredients, generate 3 creative and delicious recipes. 
    Ensure the recipes primarily use the provided ingredients but feel free to add common pantry staples (like salt, pepper, oil, water, flour).
    Provide the response entirely in English.
    
    Ingredients available: ${ingredients}

    Provide the output in a clean, structured JSON format.
    `;
};


export const generateRecipes = async (ingredients: string, language: Language): Promise<Recipe[]> => {
    
    const prompt = getPrompt(ingredients, language);

    try {
        // FIX: Moved `safetySettings` into the `config` object as it's a generation configuration parameter.
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: recipeSchema,
                safetySettings,
            },
        });
        
        if (response.candidates?.[0]?.finishReason === 'SAFETY') {
            throw new Error('REASON_SAFETY');
        }
        
        const jsonText = response.text?.trim();

        if (!jsonText) {
            console.error("Gemini API returned an empty response text.", response);
            throw new Error('EMPTY_RESPONSE');
        }

        const recipesData = JSON.parse(jsonText) as Omit<Recipe, 'imageUrl'>[];

        // Now, generate an image for each recipe
        const recipesWithImages = await Promise.all(
            recipesData.map(async (recipe) => {
                const imagePrompt = `A professional, delicious-looking studio photograph of ${recipe.recipeName}, plated beautifully.`;
                
                const imageResponse = await ai.models.generateImages({
                    model: 'imagen-4.0-generate-001',
                    prompt: imagePrompt,
                    config: {
                      numberOfImages: 1,
                      outputMimeType: 'image/jpeg',
                      aspectRatio: '16:9',
                    },
                });

                const base64ImageBytes: string = imageResponse.generatedImages[0].image.imageBytes;
                const imageUrl = `data:image/jpeg;base64,${base64ImageBytes}`;
                
                return { ...recipe, imageUrl };
            })
        );

        return recipesWithImages;

    } catch (error) {
        console.error("Error generating recipes or images from Gemini API:", error);
        if (error instanceof Error) {
            if (error.message.includes('API key not valid')) {
                throw new Error('INVALID_API_KEY');
            }
            if (error.message.includes('quota')) {
                throw new Error('QUOTA_EXCEEDED');
            }
            if (['REASON_SAFETY', 'EMPTY_RESPONSE'].includes(error.message)) {
                throw error;
            }
        }
        throw new Error("API_ERROR");
    }
};