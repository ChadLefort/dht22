System.config({
  defaultJSExtensions: true,
  transpiler: "typescript",
  paths: {
    "npm:*": "jspm_packages/npm/*",
    "github:*": "jspm_packages/github/*"
  },

  map: {
    "angular": "npm:angular@1.4.8",
    "angular-sails": "github:janpantel/angular-sails@1.1.4",
    "css": "github:systemjs/plugin-css@0.1.20",
    "erikflowers/weather-icons": "github:erikflowers/weather-icons@2.0.10",
    "highcharts": "github:highcharts/highcharts-dist@4.2.1",
    "highcharts-ng": "github:pablojim/highcharts-ng@0.0.11",
    "highcharts/highcharts-release": "github:highcharts/highcharts-dist@4.2.1",
    "janpantel/angular-sails": "github:janpantel/angular-sails@1.1.4",
    "jquery": "npm:jquery@2.2.0",
    "lodash": "npm:lodash@3.10.1",
    "moment": "npm:moment@2.11.1",
    "pablojim/highcharts-ng": "github:pablojim/highcharts-ng@0.0.11",
    "sails.io.js": "github:balderdashy/sails.io.js@0.12.0",
    "toastr": "npm:toastr@2.1.2",
    "twbs/bootstrap": "github:twbs/bootstrap@4.0.0-alpha.2",
    "typescript": "npm:typescript@1.7.5",
    "ui-router": "npm:ui-router@0.2.15",
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.2"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:twbs/bootstrap@4.0.0-alpha.2": {
      "jquery": "github:components/jquery@2.2.0"
    },
    "npm:angular@1.4.8": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:lodash@3.10.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:moment@2.11.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0"
    },
    "npm:toastr@2.1.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:ui-router@0.2.15": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    }
  }
});
