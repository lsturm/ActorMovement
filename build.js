var metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdown'),
    templates = require('metalsmith-templates'),
    basename = require('path').basename,
    dirname = require('path').dirname,
    extname = require('path').extname,
    fs = require('fs'),
    marked = require('marked'),
    Handlebars = require('handlebars'),
    markdownToMetadata,
    markdownTest,
    metaToHandlePartial,
    metaGlobal,
    markdownToPartial;


markdownToPartial = function (partialRegistrationFunc) {
    "use strict";
    var data,
        dir,
        html,
        str,
        globalPartials = {},
        metalMeta = {};


    fs.readdir(__dirname + '/templates/markdownPartials', function (err, files) {

        files.forEach(function (file) {

            if (!markdownTest(file)) {
                return;
            }

            html = marked(fs.readFileSync(__dirname + '/templates/markdownPartials/' + file).toString());
console.log(html);

            partialRegistrationFunc(file, html);
        });

    });

};

markdownToPartial(Handlebars.registerPartial);
/*
markdownToMetadata = function (options) {
    "use strict";
    options = options || {};
    var keys = options.keys || [];
    return function (files, metalsmith, done) {
        var data,
            dir,
            html,
            str,
            globalPartials = {},
            metalMeta = {};

        setImmediate(done);
        Object.keys(files).forEach(function (file) {

            if (!markdownTest(file) || (!files[file].globalPartial)) {
                return;
            }

            data = files[file];
            dir = dirname(file);
            html = basename(file, extname(file));

            str = marked(data.contents.toString(), options);
            data.contents = new Buffer(str);

            keys.forEach(function (key) {
                data[key] = marked(data[key], options);
            });
            delete files[file];
            if (!metalsmith.metadata().globalPartials) {
                globalPartials = {};
                metalMeta = {};
                globalPartials[html] = data.contents.toString();
                metalMeta.globalPartials = globalPartials;
                metalsmith.metadata(metalMeta);
            } else {
                metalMeta = metalsmith.metadata();
                globalPartials = metalMeta.globalPartials;
                globalPartials[html] = data.contents.toString();
                metalMeta.globalPartials = globalPartials;
                metalsmith.metadata(metalMeta);
            }

        });
    };
};
*/
metaToHandlePartial = function (options) {

    return function (files, metalsmith, done) {
/*
        console.log(metalsmith.metadata());
        console.log((metalsmith.metadata().globalPartials.classes));
        Handlebars.registerPartial('classes', metalsmith.metadata().globalPartials.classes);

*/
        done();
    };
};


metalsmith(__dirname)
    .use(markdown())
    .use(templates('handlebars'))
    .build();

/**
 * Check if a `file` is markdown.
 *
 * @param {String} file
 * @return {Boolean}
 */

markdownTest = function (file) {
    "use strict";
    return (/\.md|\.markdown/).test(extname(file));
};
