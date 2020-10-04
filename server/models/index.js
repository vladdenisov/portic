module.exports = mongoose => ({

    snippets: require('./Snippet.model')(mongoose),

});