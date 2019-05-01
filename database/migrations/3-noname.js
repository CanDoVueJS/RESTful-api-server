'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Memos", deps: []
 * changeColumn "name" on table "Users"
 * changeColumn "name" on table "Users"
 * changeColumn "email" on table "Users"
 *
 **/

var info = {
    "revision": 3,
    "name": "noname",
    "created": "2019-04-22T11:15:03.198Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Memos",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "title": {
                    "type": Sequelize.STRING,
                    "field": "title",
                    "allowNull": false
                },
                "content": {
                    "type": Sequelize.STRING,
                    "field": "content",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Users",
            "name",
            {
                "type": Sequelize.STRING,
                "field": "name",
                "validate": {},
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Users",
            "name",
            {
                "type": Sequelize.STRING,
                "field": "name",
                "validate": {},
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Users",
            "email",
            {
                "type": Sequelize.STRING,
                "field": "email",
                "validate": {
                    "isEmail": {
                        "msg": "올바르지 않은 이메일 입니다."
                    }
                },
                "unique": {
                    "args": true,
                    "msg": "이미 가입된 이메일 입니다."
                },
                "allowNull": false
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
