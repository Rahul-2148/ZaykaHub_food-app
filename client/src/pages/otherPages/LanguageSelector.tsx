import { useNavigate } from "react-router-dom";

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिन्दी" },
  { code: "bn", name: "বাংলা" },
  { code: "bho", name: "भोजपुरी" },
  { code: "gu", name: "ગુજરાતી" },
  { code: "mr", name: "मराठी" },
  { code: "ta", name: "தமிழ்" },
  { code: "te", name: "తెలుగు" },
  { code: "kn", name: "ಕನ್ನಡ" },
  { code: "ml", name: "മലയാളം" },
  { code: "pa", name: "ਪੰਜਾਬੀ" },
  { code: "or", name: "ଓଡ଼ିଆ" },
  { code: "sa", name: "संस्कृत" },
  { code: "si", name: "සිංහල" },
  { code: "ur", name: "اردو" },
  { code: "ne", name: "नेपाली" },
];

export default function LanguageSelector() {
  const navigate = useNavigate();

  const handleLanguageChange = (lang: string) => {
    localStorage.setItem("lang", lang);
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        Choose Your Language
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-3xl">
        {languages.map((lang) => (
          <div
            key={lang.code}
            className="cursor-pointer p-4 rounded-md text-lg font-medium text-center text-gray-800 dark:text-white bg-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            onClick={() => handleLanguageChange(lang.code)}
          >
            {lang.name}
          </div>
        ))}
      </div>
      <button
        className="mt-6 bg-gray-700 text-white py-2 px-6 rounded-md hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700 transition"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>
  );
}
