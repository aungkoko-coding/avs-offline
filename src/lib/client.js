import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// const oldSanity = '037fkido';

export const client = sanityClient({
    projectId: 'k26he4s5',
    dataset: 'production',
    apiVersion: '2022-11-26',
    useCdn: true
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);