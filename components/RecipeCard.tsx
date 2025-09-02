import React from 'react';
import { type Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  t: any;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, t }) => {
  return (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-2xl">
      {recipe.imageUrl && (
        <img
          src={recipe.imageUrl}
          alt={`A delicious-looking plate of ${recipe.recipeName}`}
          className="w-full h-56 object-cover"
        />
      )}
      <div className="p-6 md:p-8">
        <h3 className="text-2xl font-bold text-emerald-800 mb-2">{recipe.recipeName}</h3>
        <p className="text-slate-600 mb-6 italic">{recipe.description}</p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold text-slate-700 border-b-2 border-emerald-200 pb-2 mb-3">{t.ingredientsTitle}</h4>
            <ul className="space-y-2 list-disc list-inside text-slate-600">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-lg font-semibold text-slate-700 border-b-2 border-emerald-200 pb-2 mb-3">{t.instructionsTitle}</h4>
            <ol className="space-y-3 list-decimal list-inside text-slate-700">
              {recipe.instructions.map((step, index) => (
                <li key={index} className="pl-2 rtl:pr-2 rtl:pl-0">
                    <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {t.recipeBy && (
            <p className="text-center text-sm text-slate-500 italic mt-6 pt-4 border-t border-slate-200">
                {t.recipeBy}
            </p>
        )}
      </div>
    </article>
  );
};

export default RecipeCard;