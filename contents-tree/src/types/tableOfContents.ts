export type DataType = {
    id: string,
    name: string,
    level: number,
    parent_id: string,
    content: string
}

export type ResponseType = {
    content: {
        document: DataType[]
    }
}
