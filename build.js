var metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdown'),
    templates = require('metalsmith-templates'),
    extname = require('path').extname,
    basename = require('path').basename,
    fs = require('fs'),
    marked = require('marked'),
    Handlebars = require('handlebars'),
    markdownToMetadata,
    markdownTest,
    metaToHandlePartial,
    metaGlobal,
    markdownToPartial;


markdownToPartial = function (partialCallBack) {
    "use strict";
    var data,
        dir,
        str;


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

        console.log(Handlebars);
    });


markdownTest = function (file) {
    "use strict";
    return (/\.md|\.markdown/).test(extname(file));
};
