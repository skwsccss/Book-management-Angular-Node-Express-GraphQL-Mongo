var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var {
    GraphQLID,
    GraphQLString,
    GraphQLInt
} = require('graphql');
var GraphQLDate = require('graphql-date');
var BookModel = require('../models/book');

var bookType = new GraphQLObjectType({
    name: 'book',
    fields: function () {
        return {
            _id: {
                type: GraphQLString
            },
            isbn: {
                type: GraphQLString
            },
            title: {
                type: GraphQLString
            },
            author: {
                type: GraphQLString
            },
            description: {
                type: GraphQLString
            },
            published_year: {
                type: GraphQLInt
            },
            publisher: {
                type: GraphQLString
            },
            updated_date: {
                type: GraphQLDate
            }
        }
    }
});

var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
        return {
            books: {
                type: new GraphQLList(bookType),
                resolve: async function () {
                    const books = await BookModel.find({})
                    if (!book) {
                        throw new Error('Error');
                    }
                    return books
                }
            },
            book: {
                type: bookType,
                args: {
                    id: {
                        name: '_id',
                        type: GraphQLString
                    }
                },
                resolve: async (root, params) => {
                    const bookDetails = await BookModel.findOne({ _id: params.id })
                    if (!bookDetails) {
                        throw new Error('Error')
                    }
                    return bookDetails
                }
            }
        }
    }
});

var mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => {
        return {
            addBook: {
                type: bookType,
                args: {
                    isbn: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    title: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    author: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    description: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    published_year: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    publisher: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve: async (root, params) => {
                    let bookModel = new BookModel(params);
                    let newBook = await bookModel.save();
                    if (!newBook) {
                        throw new Error('Error');
                    }
                    return newBook
                }
            },
            updateBook: {
                type: bookType,
                args: {
                    id: {
                        name: 'id',
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    isbn: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    title: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    author: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    description: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    published_year: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    publisher: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(root, params) {
                    let { isbn, title, author, description, published_year, publisher } = params;
                    return BookModel.findByIdAndUpdate(params.id, {
                        isbn: isbn, title: title, author: author,
                        description: description, publisher: publisher,
                        published_year: published_year, updated_date: new Date()
                    }, (err) => {
                        if (err) return next(err);
                    });
                }
            },
            removeBook: {
                type: bookType,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                async resolve(root, params) {
                    let remBook = await BookModel.findByIdAndRemove(params.id);
                    if (!remBook) {
                        throw new Error('Error')
                    }
                    return remBook;
                }
            }
        }
    }
})

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation })