'use client';

import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface TechnologyInputProps {
    technologies: string[];
    onChange: (technologies: string[]) => void;
}

export function TechnologyInput({ technologies, onChange }: TechnologyInputProps) {
    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [availableTechnologies, setAvailableTechnologies] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);

    // Načtení dostupných technologií
    useEffect(() => {
        const fetchTechnologies = async () => {
            try {
                const response = await fetch('/api/admin/technologies');
                if (response.ok) {
                    const data = await response.json();
                    setAvailableTechnologies(data);
                }
            } catch (error) {
                console.error('Failed to fetch technologies:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTechnologies();
    }, []);

    // Filtrace našeptávání podle vstupu uživatele
    useEffect(() => {
        if (input.trim() === '') {
            setSuggestions([]);
            return;
        }

        const inputLower = input.toLowerCase();
        const filtered = availableTechnologies
            .filter(tech =>
                tech.toLowerCase().includes(inputLower) &&
                !technologies.includes(tech)
            )
            .slice(0, 5); // Omezení na max 5 návrhů

        setSuggestions(filtered);
        setActiveSuggestionIndex(-1);
    }, [input, availableTechnologies, technologies]);

    // Zavření našeptávače při kliknutí mimo
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node) &&
                inputRef.current && !inputRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        // Navigace v seznamu našeptávání šipkami
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveSuggestionIndex(prev =>
                prev < suggestions.length - 1 ? prev + 1 : prev
            );
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveSuggestionIndex(prev => (prev > 0 ? prev - 1 : prev));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (activeSuggestionIndex >= 0 && suggestions[activeSuggestionIndex]) {
                addTechnology(suggestions[activeSuggestionIndex]);
            } else if (input.trim()) {
                addTechnology(input.trim());
            }
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
        }
    };

    const addTechnology = (tech: string) => {
        if (tech && !technologies.includes(tech)) {
            onChange([...technologies, tech]);
            setInput('');
            setShowSuggestions(false);
        }
    };

    const removeTechnology = (indexToRemove: number) => {
        onChange(technologies.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">
                Technologies
            </label>
            <div className="mt-1">
                <div className="flex flex-wrap gap-2 mb-2">
                    {technologies.map((tech, index) => (
                        <span
                            key={index}
                            className="inline-flex items-center bg-red-50 text-red-700 rounded-md px-2 py-1 text-sm"
                        >
                            {tech}
                            <button
                                type="button"
                                onClick={() => removeTechnology(index)}
                                className="ml-1 hover:text-red-800"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </span>
                    ))}
                </div>
                <div className="flex gap-2 relative">
                    <div className="relative w-full">
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => {
                                setInput(e.target.value);
                                setShowSuggestions(true);
                            }}
                            onFocus={() => setShowSuggestions(true)}
                            onKeyDown={handleKeyDown}
                            className="block w-full rounded-md border border-gray-300 bg-white"
                            placeholder="Add technology and press Enter"
                        />

                        {showSuggestions && suggestions.length > 0 && (
                            <div
                                ref={suggestionsRef}
                                className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                                {suggestions.map((suggestion, index) => (
                                    <div
                                        key={index}
                                        className={`px-4 py-2 cursor-pointer ${
                                            index === activeSuggestionIndex
                                                ? 'bg-red-100 text-red-900'
                                                : 'hover:bg-gray-100'
                                        }`}
                                        onClick={() => addTechnology(suggestion)}
                                        onMouseEnter={() => setActiveSuggestionIndex(index)}
                                    >
                                        {suggestion}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={() => input.trim() && addTechnology(input.trim())}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                        Add
                    </button>
                </div>

                {!isLoading && availableTechnologies.length > 0 && (
                    <div className="mt-4">
                        <p className="text-sm text-gray-500 mb-2">Častá použití:</p>
                        <div className="flex flex-wrap gap-2">
                            {availableTechnologies
                                .filter(tech => !technologies.includes(tech))
                                .slice(0, 10)
                                .map((tech, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => addTechnology(tech)}
                                        className="px-2 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100"
                                    >
                                        {tech}
                                    </button>
                                ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}