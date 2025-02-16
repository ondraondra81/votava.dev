// src/components/ui/ErrorState.tsx
interface ErrorStateProps {
    message?: string
}

export function ErrorState({ message = 'Something went wrong' }: ErrorStateProps) {
    return (
        <div className="w-full p-4 bg-red-50 rounded-lg">
            <p className="text-red-700 text-center">{message}</p>
        </div>
    )
}