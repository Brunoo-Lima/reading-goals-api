interface ISuggestionsProps {
  onSuggestion: (suggestion: string) => void;
}

export const Suggestions = ({ onSuggestion }: ISuggestionsProps) => {
  const suggestions = [
    'Recomende um livro de fantasia',
    'Quero adicionar um novo livro',
    'Como esta meu progresso?',
    'Qual livro devo ler em seguida?',
  ];

  return (
    <div className="px-4 pb-2">
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => onSuggestion(suggestion)}
            className="px-3 py-1.5 text-sm rounded-full bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};
