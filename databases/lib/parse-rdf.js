'use strict';
const cheerio = require('cheerio');

module.exports = rdf => {
    const $ = cheerio.load(rdf);

    const book = {};

    book.id = +$('pgterms\\:ebook') // Unary plus casts the result as a number
    .attr('rdf:about') // Get the value of the rdf:about attribute
    .replace('ebooks/',''); // Stripe off the leading 'ebooks/' substring

    book.title = $('dcterms\\:title').text();
    
    book.authors = $('pgterms\\:agent pgterms\\:name').toArray().map(elem => $(elem).text());

    book.subjects = $('[rdf\\:resource$="/LCSH"]').parent().find('rdf\\:value').toArray().map(elem => $(elem).text());

    return book;
}