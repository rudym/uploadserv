var jsfiles = ["./public/js/lib/jquery-2.1.3.min.js",
              "./public/js/bootstrap.min.js",
              "./public/js/lib/jquery.easing.min.js",
              "./public/js/lib/jquery.scrollTo.js",
              //"./public/js/lib/wow.min.js",
              "./node_modules/video.js/dist/video-js/video.js",
              "./public/js/main.js"]

module.exports = function(grunt) {

  // 1. All configuration goes here 
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      main: {
        src: './node_modules/video.js/dist/video-js/video-js.swf',
        dest: './public/img/video-js.swf',
      },
    },

    concat: {
      options: {
        separator: ';',
        stripBanners: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */',
      },
      dist: {
        src: jsfiles,
        dest: './public/js/app.js',
      },
    },

    uglify: {
      build: {
        src: './public/js/app.js',
        dest: './public/js/app.min.js'
      }
    },

    imagemin: {
      dynamic: {
        files: [{
            expand: true,
            cwd: './images/',
            src: ['**/*.{png,jpg,gif}'],
            dest: './public/img/'
        }]
      }
    },

    less: {
      dev: {
        options: {
          sourceMap: true,
          dumpLineNumbers: 'comments',
          relativeUrls: true
        },
        files: {
          'public/css/main.debug.css': 'public/css/main.less',
        }
      },
      production: {
        options: {
          cleancss: true,
          compress: true,
          relativeUrls: true
        },
        files: {
          'public/css/main.css': 'public/css/main.less',
        }
      }
    },

    jade: {
      options: {
        pretty: true,
        files: {
          "*": ["views/*.jade"]
        }
      },
      debug: {
        options: {
          locals: {
            livereload: true
          }
        }
      },
      publish: {
        options: {
          locals: {
            livereload: false
          }
        }
      }
    },

    web: {
      options: {
        port: 8001
      }
    },

    watch: {
      options: {
        livereload: true,
      },
      scripts: {
        files: jsfiles,
        tasks: ['concat', 'uglify'],
        options: {
          spawn: false,
        },
      },
      css: {
        files: ['public/css/*.less'],
        tasks: ['less'],
        options: {
          spawn: false,
        },
      },
      views: {
        files: ["views/*.jade"],
        tasks: ["jade:debug"],
        options: {
          spawn: false,
        },
      }
    },

    css: {
      options: {
        livereload: true,
      },
      files: ['public/css/*.less'],
      tasks: ['less'],
      options: {
          spawn: false,
      }
    }
  });

  // 3. Where we tell Grunt we plan to use this plug-in.
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-devtools');
  
  //less tasks
  //grunt.registerTask('default', ['less']);
  //grunt.registerTask('production', ['less:production']);
  //grunt.registerTask('dev', ['less:dev']);

  //jade tasks
  //grunt.registerTask('default', ['jade:debug']);
  //grunt.registerTask('publish', ['jade:publish']);

  // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
  //grunt.registerTask('default', ['copy', 'concat', 'uglify', 'imagemin']);
  grunt.registerTask('default', ['web', 'watch']);

  grunt.registerTask('web', function () {
    grunt.util.spawn(
      { cmd: 'node'
      , args: ['app.js']
      })

    grunt.task.run('watch')
  });

  //jade static works
  /*
  grunt.loadNpmTasks('grunt-jade-tasks');
  //grunt.loadNpmTasks('grunt-contrib-jade');

  grunt.registerTask('default', ['jade:debug', 'web']);
  grunt.registerTask('publish', ['jade:publish']);

  grunt.registerTask('web', 'Start web server...', function() {
    var options = this.options();

    var connect = require('connect')
    var serveStatic = require('serve-static');
    var http = require('http')

    var app = connect()
    app.use(serveStatic(__dirname));

    //create node.js http server and listen on port
    http.createServer(app).listen(options.port)
    console.log('http://localhost:%s', options.port);

    grunt.task.run(["watch:jade"]);
  });*/

};