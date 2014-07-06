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

    fs.readdir(__dirname + '/templates/markdownPartials', function (err, files) {

        files.forEach(function (file) {

            if (!markdownTest(file)) {
                return;
            }

            fs.readFile(__dirname + '/templates/markdownPartials/' + file, function (err, md) {
                var html;

                html = marked(md.toString());
                partialCallBack(basename(file, '.md'), html);

            });
        });

    });

};

markdownToPartial(function(name, partial) {

    Handlebars.registerPartial(name, partial);

    metalsmith(__dirname)
        .use(markdown())
        .use(templates('handlebars'))
        .build();

    });


markdownTest = function (file) {
    "use strict";
    return (/\.md|\.markdown/).test(extname(file));
};
