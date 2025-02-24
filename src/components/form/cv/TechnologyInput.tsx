'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface TechnologyInputProps {
    technologies: string[];
    onChange: (technologies: string[]) => void;
}

export function TechnologyInput({ technologies, onChange }: TechnologyInputProps) {
    const [input, setInput] = useState('');

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTechnology();
        }
    };

    const addTechnology = () => {
        const tech = input.trim();
        if (tech && !technologies.includes(tech)) {
            onChange([...technologies, tech]);
            setInput('');
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
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="block w-full rounded-md border border-gray-300 bg-white"
                        placeholder="Add technology and press Enter"
                    />
                    <button
                        type="button"
                        onClick={addTechnology}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}