module.exports = {
    presets: [
        ['@vue/app', {
            polyfills: [
                'es6.array.sort',
                'es6.regexp.to-string',
                'es7.promise.finally'
            ]
        }]
    ],

}
