import React, { useState, useCallback, useEffect } from 'react';
import { type Recipe } from './types';
import { generateRecipes } from './services/geminiService';
import IngredientInput from './components/IngredientInput';
import RecipeList from './components/RecipeList';
import Header from './components/Header';
import Footer from './components/Footer';
import SplashScreen from './components/SplashScreen';
import { translations, type Language } from './translations';
import ApiKeyStatus from './components/ApiKeyStatus';

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [language, setLanguage] = useState<Language>('en');
  const [ingredients, setIngredients] = useState<string>('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const t = translations[language];
  const splash_t = translations['ur'];

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ur' ? 'rtl' : 'ltr';
  }, [language]);

  const handleGenerateRecipes = useCallback(async () => {
    if (!ingredients.trim()) {
      setError(t.error_enterIngredients);
      return;
    }

    setIsLoading(true);
    setError(null);
    setRecipes([]);

    try {
      const generatedRecipes = await generateRecipes(ingredients, language);
      setRecipes(generatedRecipes);
    } catch (err) {
      console.error("Error in handleGenerateRecipes:", err);
      if (err instanceof Error) {
          switch (err.message) {
              case 'INVALID_API_KEY':
                  setError(t.error_invalidApiKey);
                  break;
              case 'QUOTA_EXCEEDED':
                  setError(t.error_quotaExceeded);
                  break;
              case 'REASON_SAFETY':
                  setError(t.error_safety);
                  break;
              case 'EMPTY_RESPONSE':
                   setError(t.error_emptyResponse);
                   break;
              default:
                  setError(t.error_api);
          }
      } else {
          setError(t.error_api);
      }
    } finally {
      setIsLoading(false);
    }
  }, [ingredients, language, t]);
  
  const handleEnterApp = () => {
    setShowSplash(false);
  };

  const appClassName = `flex flex-col min-h-screen bg-slate-50 text-slate-800 ${
    language === 'ur' ? 'font-urdu' : 'font-sans'
  }`;

  if (showSplash) {
    return <SplashScreen onEnter={handleEnterApp} t={splash_t} />;
  }

  return (
    <div className={appClassName}>
      <Header 
        language={language}
        setLanguage={setLanguage}
        t={t}
      />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <section id="generator" className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-700 text-center mb-2">{t.tagline}</h2>
            <p className="text-center text-slate-500 mb-6">{t.description}</p>
            {t.authorCreditMain && <p className="text-center text-slate-600 font-semibold mb-8">{t.authorCreditMain}</p>}
            <IngredientInput
              ingredients={ingredients}
              onIngredientsChange={setIngredients}
              onGenerate={handleGenerateRecipes}
              isLoading={isLoading}
              t={t}
            />
          </section>
          
          <section id="recipes">
            <RecipeList 
              recipes={recipes}
              isLoading={isLoading}
              error={error}
              t={t}
            />
          </section>
        </div>
      </main>
      <Footer t={t} />
      <ApiKeyStatus apiKey={process.env.API_KEY} />
    </div>
  );
};

export default App;