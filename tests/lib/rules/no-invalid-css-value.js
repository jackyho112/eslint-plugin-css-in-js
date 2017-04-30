/**
 * @fileoverview No invalid CSS value allowed
 * @author no-invalid-css-value
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-invalid-css-value"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-invalid-css-value", rule, {

    valid: [

        // give me some code that won't trigger a warning
    ],

    invalid: [
        {
            code: "{ height: \"superman\" }",
            errors: [{
                message: "Fill me in.",
                type: "Me too"
            }]
        }
    ]
});
