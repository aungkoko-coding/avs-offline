export default {
    name: 'popular',
    title: 'Popular',
    type: 'document',
    fields: [
        {
            name: 'example',
            title: 'Note this is a search purpose only',
            type: 'array',
            of: [
                {name: 'movie', type: 'reference', to: [{type: 'movie'}]},
                {name: 'season', type: 'reference', to: [{type: 'season'}]},
                {name: 'collection', type: 'reference', to: [{type: 'collection'}]}
            ]
        },
        {
            name: 'title',
            title: 'Title of movie or season or collection',
            type: 'string'
        },
        {
            name: 'type',
            title: 'Type of popular(movie or season or collection',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'posterImgUrl',
            title: 'Poster Image Url',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'posterImage',
            title: 'Poster image',
            type: 'image',
            options: { hotspot: true }
        },
        {
            name: 'imdb',
            title: 'IMDb',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug(must be same as slug of item in movie or season)',
            type: 'slug',
            options: { source: 'title' },
            validation: Rule => Rule.required()
        },
    ]
}