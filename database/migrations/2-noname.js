'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "updatedAt" on table "Users"
 * changeColumn "createdAt" on table "Posts"
 * changeColumn "updatedAt" on table "Posts"
 * changeColumn "updatedAt" on table "Posts"
 * changeColumn "updatedAt" on table "Posts"
 * changeColumn "createdAt" on table "Posts"
 * changeColumn "createdAt" on table "Posts"
 * changeColumn "updatedAt" on table "Users"
 * changeColumn "updatedAt" on table "Users"
 * changeColumn "createdAt" on table "Users"
 * changeColumn "createdAt" on table "Users"
 * changeColumn "createdAt" on table "Users"
 *
 **/

var info = {
    "revision": 2,
    "name": "noname",
    "created": "2019-01-12T03:03:16.185Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "changeColumn",
        params: [
            "Users",
            "updatedAt",
            {
                "type": Sequelize.TIME,
                "field": "updatedAt",
                "defaultValue": Sequelize.Literal
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Posts",
            "createdAt",
            {
                "type": Sequelize.TIME,
                "field": "createdAt",
                "defaultValue": Sequelize.Literal
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Posts",
            "updatedAt",
            {
                "type": Sequelize.TIME,
                "field": "updatedAt",
                "defaultValue": Sequelize.Literal
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Posts",
            "updatedAt",
            {
                "type": Sequelize.TIME,
                "field": "updatedAt",
                "defaultValue": Sequelize.Literal
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Posts",
            "updatedAt",
            {
                "type": Sequelize.TIME,
                "field": "updatedAt",
                "defaultValue": Sequelize.Literal
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Posts",
            "createdAt",
            {
                "type": Sequelize.TIME,
                "field": "createdAt",
                "defaultValue": Sequelize.Literal
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Posts",
            "createdAt",
            {
                "type": Sequelize.TIME,
                "field": "createdAt",
                "defaultValue": Sequelize.Literal
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Users",
            "updatedAt",
            {
                "type": Sequelize.TIME,
                "field": "updatedAt",
                "defaultValue": Sequelize.Literal
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Users",
            "updatedAt",
            {
                "type": Sequelize.TIME,
                "field": "updatedAt",
                "defaultValue": Sequelize.Literal
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Users",
            "createdAt",
            {
                "type": Sequelize.TIME,
                "field": "createdAt",
                "defaultValue": Sequelize.Literal
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Users",
            "createdAt",
            {
                "type": Sequelize.TIME,
                "field": "createdAt",
                "defaultValue": Sequelize.Literal
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Users",
            "createdAt",
            {
                "type": Sequelize.TIME,
                "field": "createdAt",
                "defaultValue": Sequelize.Literal
            }
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
