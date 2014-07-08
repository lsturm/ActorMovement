var metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdown'),
    templates = require('metalsmith-templates'),
    basename = require('path').basename,
    extname = require('path').extname,
    fs = require('fs'),
    marked = require('marked'),
    Handlebars = require('handlebars'),
    markdownTest,
    markdownToPartial;


markdownToPartial = function (partialCallBack) {
    "use strict";

    var html,
        partials = {};

    fs.readdir(__dirname + '/templates/markdownPartials', function (err, files) {
        files.forEach(function (file, index, files) {


            if (!markdownTest(file)) {
                return;
            }

            fs.readFile(__dirname + '/templates/markdownPartials/' + file, function (err, md) {

                html = marked(md.toString());
                partials[basename(file, '.md')] = html;
                    if(files.length - 1 === index) {
                        partialCallBack(partials);
                    }
            });

        });

    });

};

markdownToPartial(function(partials) {
    Object.keys(partials).forEach(function(partialName) {
        Handlebars.registerPartial(partialName, partials[partialName]);
    });

    metalsmith(__dirname)
        .use(markdown())
        .use(templates('handlebars'))
        .build();

    });


markdownTest = function (file) {
    "use strict";
    return (/\.md|\.markdown/).test(extname(file));
};
