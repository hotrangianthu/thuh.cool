"use strict";

const { THEME }    = require("./theme");
const templates    = require("./slide_templates");
const diagrams     = require("./diagram_templates");

module.exports = { THEME, ...templates, ...diagrams };
