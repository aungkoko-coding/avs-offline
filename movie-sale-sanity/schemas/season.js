export default {
    name: 'season',
    title: 'Season',
    type: 'document',
    fields: [
        {
            name: 'tvShow',
            title: 'TV show',
            type: 'reference',
            to: [ {type: 'tvShow'} ]
        },
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
            options: { source: 'title'},
            validation: Rule => Rule.required()
        },
        {
            name: 'imdb',
            type: 'string',
            title: 'IMDb',
        },
        {
            name: 'price',
            type: 'string',
            title: 'Price',
            initialValue: '750',
            validation: Rule => Rule.required()
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
            name: 'approximateRuntime',
            title: 'Approximate runtime of each episode',
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
            name: 'posterImgUrl',
            title: 'Poster Image Url',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'review',
            title: 'Review about season',
            type: 'text',
            rows: 20
        },
        {
            name: 'trailerUrlIDs',
            title: 'Trailer Url IDs',
            type: 'array',
            of: [{type: 'string'}]
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