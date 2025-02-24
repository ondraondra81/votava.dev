'use client'

interface MonthYearPickerProps {
    value?: string
    onChangeAction: (value: string | null) => Promise<void>
    disabled?: boolean
    required?: boolean
}

export function MonthYearPicker({ value, onChangeAction, disabled, required }: MonthYearPickerProps) {
    // Hodnota je ve formátu YYYY-MM
    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) {
            await onChangeAction(null)
            return
        }
        await onChangeAction(e.target.value + '-01') // Přidáme první den v měsíci pro kompatibilitu s DateTime
    }

    return (
        <input
            type="month"
            value={value ? value.substring(0, 7) : ''} // Ořežeme den z data
            onChange={handleChange}
            disabled={disabled}
            required={required}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white"
        />
    )
}