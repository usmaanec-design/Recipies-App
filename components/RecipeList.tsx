import React from 'react';
import { type Recipe } from '../types';
import RecipeCard from './RecipeCard';
import LoadingSpinner from './icons/LoadingSpinner';

interface RecipeListProps {
  recipes: Recipe[];
  isLoading: boolean;
  error: string | null;
  t: any;
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes, isLoading, error, t }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 bg-white rounded-lg shadow-md">
        <LoadingSpinner />
        <p className="mt-4 text-lg font-semibold text-slate-600">{t.loadingMessage}</p>
        <p className="text-slate-500">{t.loadingSubMessage}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-50 border border-red-200 text-red-700 rounded-lg shadow-sm">
        <h3 className="font-bold text-lg mb-2">{t.errorTitle}</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
        <div className="text-center p-8 bg-slate-100 border border-slate-200 rounded-lg">
            <h3 className="font-bold text-xl text-slate-700 mb-2">{t.initialStateTitle}</h3>
            <p className="text-slate-500">{t.initialStateMessage}</p>
        </div>
    );
  }

  return (
    <div className="space-y-8">
      {recipes.map((recipe, index) => (
        <RecipeCard key={`${recipe.recipeName}-${index}`} recipe={recipe} t={t} />
      ))}
    </div>
  );
};

export default RecipeList;