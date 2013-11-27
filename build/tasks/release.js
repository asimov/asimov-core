
module.exports = function (grunt) {
    'use strict';

    grunt.registerTask('release', 'Releases a new version', function (type) {
        var options = this.options({
            dryRun: grunt.option.flags().indexOf('--dry-run') !== -1
        });

        grunt.task.run('bump-only:' + (type || 'patch'));
        grunt.task.run('changelog');

        if (!options.dryRun) {
            grunt.task.run('bump-commit');
        }
    });
};
