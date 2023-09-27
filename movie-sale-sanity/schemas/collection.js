export default {
    name: 'collection',
    title: 'Collection',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Collection Name',
            type: 'string'
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'name' },
            validation: Rule => Rule.required()
        },
        {
            name: 'price',
            type: 'string',
            title: 'Price',
            validation: Rule => Rule.required()
        },
        {
            name: 'items',
            title: 'Collection Items',
            type: 'array',
            of: [
                {name: 'movie', type: 'reference', to: [{type: 'movie'}]},
                {name: 'season', type: 'reference', to: [{type: 'season'}]},
                {name: 'tvShow', type: 'reference', to: [{type: 'tvShow'}]}
            ]
        },
        {
            name: 'posterImgUrl',
            title: 'Poster Image Url',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'review',
            title: 'Review about collection',
            type: 'text',
            rows: 20
        },
    ]
}