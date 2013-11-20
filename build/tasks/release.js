
module.exports = function(grunt) {
    "use strict";

    var semver = require('semver');

    grunt.registerTask('release', 'Releases a new version of Asimov', function(type) {

        // Merge defaults

        var options = this.options({
            file: grunt.config('pkgFile') || 'package.json',
            dryRun: grunt.option.flags().indexOf('--dry-run') !== -1,
            bump: true,
            add: false,
            commit: true,
            tag: true,
            push: true,
            pushTags: true,
            npm: false,
            npmtag: false,
            tagName: '<%= version %>',
            commitMessage: 'chore(relase): release v<%= version %>',
            tagMessage: 'tagging version <%= version %>'
        });

        // Determine the new version string

        var newVersion = semver.inc(
            grunt.file.readJSON(options.file).version,
            type || 'patch'
        );

        // If doing a dry run don't actually commit anything

        if (options.dryRun) {
            options.add = false;
            options.commit = false;
            options.tag = false;
            options.push = false;
            options.pushTags = false;
        }

        // Set the options for the grunt-release task

        grunt.config('release.options', options);

        // Set the new version for the changelog task

        grunt.config.set('changelog.options.version', newVersion);

        // Do the release!

        grunt.task.run('changelog');
        grunt.task.run('grunt-release');
    });
};
