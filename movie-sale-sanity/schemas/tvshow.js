export default {
    name: 'tvShow',
    title: 'TV Show',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title' },
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
            options: { hotspot: true },
        },
        // {
        //     name: 'seasons',
        //     title: 'Seasons',
        //     type: 'array',
        //     of: [
        //         { type: 'season' }
        //     ],
        //     validation: Rule => Rule.required()
        // }
    ]
}