export default {
    name: 'promotion',
    title: 'Promotion',
    type: 'document', 
    fields: [
        {
            name: 'discount',
            title: 'Discount percent',
            type: 'string'
        },
        {
            name: 'from',
            title: 'From',
            type: 'date'
        },
        {
            name: 'to',
            title: 'To',
            type: 'date'
        },
        {
            name: 'posterImage',
            title: 'Poster image',
            type: 'image',
            options: { hotspot: true },
            validation: Rule => Rule.required()
        },
    ]
}