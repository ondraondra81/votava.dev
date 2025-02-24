export const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('cs-CZ', {
        year: 'numeric',
        month: 'long'
    })
}

export const formatPeriod = (startDate?: string, endDate?: string, isPresent?: boolean) => {
    if (startDate === undefined) {
        return '';
    }

    const start = formatDate(startDate);
    if (isPresent) {
        return `${start} - současnost`
    }

    return endDate ? `${start} - ${formatDate(endDate)}` : start
}