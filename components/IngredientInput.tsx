import React from 'react';

interface IngredientInputProps {
  ingredients: string;
  onIngredientsChange: (value: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  t: any;
}

const IngredientInput: React.FC<IngredientInputProps> = ({ ingredients, onIngredientsChange, onGenerate, isLoading, t }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={ingredients}
        onChange={(e) => onIngredientsChange(e.target.value)}
        placeholder={t.ingredientPlaceholder}
        rows={4}
        className="w-full p-4 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow duration-200"
        disabled={isLoading}
      />
      <button
        type="submit"
        className="w-full flex items-center justify-center bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors duration-300"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white rtl:ml-3 rtl:-mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {t.generatingButton}
          </>
        ) : (
          t.generateButton
        )}
      </button>
    </form>
  );
};

export default IngredientInput;