'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Comments", deps: [Posts, Users]
 * changeColumn "title" on table "Posts"
 * changeColumn "title" on table "Posts"
 * changeColumn "title" on table "Posts"
 * changeColumn "contents" on table "Posts"
 * changeColumn "contents" on table "Posts"
 * changeColumn "contents" on table "Posts"
 *
 **/

var info = {
    "revision": 2,
    "name": "noname",
    "created": "2019-01-29T12:21:36.563Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Comments",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "contents": {
                    "type": Sequelize.STRING,
                    "field": "contents",
                    "validate": {
                        "len": {
                            "args": [1, 255],
                            "msg": "댓글은 최소 1자 이상 최대 255자 이하여야 합니다."
                        }
                    },
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.TIME,
                    "field": "createdAt",
                    "defaultValue": Sequelize.Literal
                },
                "updatedAt": {
                    "type": Sequelize.TIME,
                    "field": "updatedAt",
                    "defaultValue": Sequelize.Literal
                },
                "PostId": {
                    "type": Sequelize.INTEGER,
                    "field": "PostId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Posts",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "field": "UserId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Posts",
            "title",
            {
                "type": Sequelize.STRING,
                "field": "title",
                "validate": {
                    "len": {
                        "args": [1, 255],
                        "msg": "게시물의 제목은 최소 1자 이상 최대 255자 이하여야 합니다."
                    }
                },
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Posts",
            "title",
            {
                "type": Sequelize.STRING,
                "field": "title",
                "validate": {
                    "len": {
                        "args": [1, 255],
                        "msg": "게시물의 제목은 최소 1자 이상 최대 255자 이하여야 합니다."
                    }
                },
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Posts",
            "title",
            {
                "type": Sequelize.STRING,
                "field": "title",
                "validate": {
                    "len": {
                        "args": [1, 255],
                        "msg": "게시물의 제목은 최소 1자 이상 최대 255자 이하여야 합니다."
                    }
                },
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Posts",
            "contents",
            {
                "type": Sequelize.STRING,
                "field": "contents",
                "validate": {
                    "len": {
                        "args": [1, 500],
                        "msg": "게시물의 내용은 최소 1자 이상 최대 500자 이하여야 합니다."
                    }
                },
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Posts",
            "contents",
            {
                "type": Sequelize.STRING,
                "field": "contents",
                "validate": {
                    "len": {
                        "args": [1, 500],
                        "msg": "게시물의 내용은 최소 1자 이상 최대 500자 이하여야 합니다."
                    }
                },
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Posts",
            "contents",
            {
                "type": Sequelize.STRING,
                "field": "contents",
                "validate": {
                    "len": {
                        "args": [1, 500],
                        "msg": "게시물의 내용은 최소 1자 이상 최대 500자 이하여야 합니다."
                    }
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
