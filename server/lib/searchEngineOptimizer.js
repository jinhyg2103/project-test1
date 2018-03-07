'use strict';
// Library
var async = require('async');
var fs = require('fs');
var xmlBuilder = require('xmlbuilder');

module.exports = {
    create_sitemap: function(){
        var url = "http://researcherfarm.com";
        var outputPath = "./src/build/sitemap.xml";

        var xmlData = xmlBuilder.create('urlset')
            .att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9')
            .att('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance')
            .att('xmlns:xhtml', 'http://www.w3.org/1999/xhtml')
            .att('xsi:schemaLocation', 'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd')
            .ele('url')
            .ele('loc', url).up()
            .ele('lastmod', new Date().toISOString()).up()
            .ele('changefreq', 'weekly').up()
            .ele('priority', '1.0000').up().up()

        async.waterfall([
            function(callback){
                Schemas.job().find().lean().exec(function(err, list){
                    async.each(list, function(doc, callback){
                        var date = new Date(doc.date.updated_at).toISOString();
                        xmlData.ele('url')
                            .ele('loc', url + "/jobs/" + doc._id).up()
                            .ele('lastmod', date).up()
                            .ele('changefreq', 'weekly').up()
                            .ele('priority', '0.7000').up().up();
                        callback();
                    }, function(err){
                        callback(null);
                    });
                });
            },
            function(callback){
                Schemas.forum_content().find().lean().exec(function(err, list){
                    async.each(list, function(doc, callback){
                        var date = new Date(doc.date.updated_at).toISOString();
                        xmlData.ele('url')
                            .ele('loc', url + "/forum/" + doc._id).up()
                            .ele('lastmod', date).up()
                            .ele('changefreq', 'weekly').up()
                            .ele('priority', '0.7000').up().up();
                        callback();
                    }, function(err){
                        callback(null);
                    });
                });
            }
        ], function(err){
            xmlData.end();
            fs.writeFile(outputPath, xmlData, function (err) {
                console.log("searchEngineOptimizer - create sitemap finish");
                console.log(err);
            });
        });
    }
};