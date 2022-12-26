export type Option = {
    label: string,
    value: string
}

export type Props = {
    label?: string,
    options: Option[],
    columns?: number,
    values?: string[],
    defaultValues?: string[],
    onChange?: (options: Option[]) => void,
}