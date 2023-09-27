export default {
    name: 'movie',
    title: 'Movie',
    type: 'document',
    fields: [
        {
            name: 'title',
            type: 'string',
            title: 'Title',
            validation: Rule => Rule.required()
        },
        {
            name: 'slug',
            type: 'slug',
            title: 'Slug',
            options: { source: 'title' },
            validation: Rule => Rule.required()
        },
        {
            name: 'price',
            type: 'string',
            title: 'Price',
            initialValue: '250',
            validation: Rule => Rule.required()
        },
        {
            name: 'imdb',
            type: 'string',
            title: 'IMDb',
        },
        {
            name: 'rating',
            type: 'string',
            title: 'Rating',
        },
        {
            name: 'genres',
            title: 'Genres',
            type: 'array',
            of: [
                {type: 'string'}
            ],
            validation: Rule => Rule.required()
        },
        {
            name: 'country',
            title: 'Country',
            type: 'string',
            initialValue: 'USA'
        },
        {
            name: 'releaseDate',
            title: 'Release date',
            type: 'string',
        },
        {
            name: 'tomato',
            title: 'Rotten tomato',
            type: 'number',
        },
        {
            name: 'audienceScore',
            title: 'Audience score',
            type: 'number',
        },
        {
            name: 'runtime',
            title: 'Runtime',
            type: 'string',
        },
        {
            name: 'language',
            title: 'Language',
            type: 'string',
            initialValue: 'English',
            validation: Rule => Rule.required()
        },
        {
            name: 'quality',
            title: 'Video quality',
            type: 'string',
            initialValue: '720p'
        },
        {
            name: 'trailerUrlIDs',
            title: 'Trailer Url IDs',
            type: 'array',
            of: [{type: 'string'}]
        },
        {
            name: 'posterImgUrl',
            title: 'Poster Image Url',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'review',
            title: 'Review about movie',
            type: 'text',
            rows: 20
        },
        {
            name: 'extraPosterImages',
            title: 'Extra poster images',
            type: 'array',
            options: { hostspot: true },
            of: [
                { type: 'image' }
            ]
        }
    ]
}