export interface Page {
    id: string,
    app: string
    seo: Seo,
    name: Array<string>,
    slug: string
}

export interface Seo {
    title: string,
    description: string,
    keywords: string
}

