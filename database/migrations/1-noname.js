'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Users", deps: []
 * createTable "Posts", deps: [Users]
 *
 **/

var info = {
    "revision": 1,
    "name": "noname",
    "created": "2019-01-12T03:09:17.822Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Users",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email",
                    "validate": {
                        "isEmail": {
                            "msg": "올바르지 않은 이메일 입니다."
                        }
                    },
                    "unique": true,
                    "allowNull": false
                },
                "password": {
                    "type": Sequelize.STRING,
                    "field": "password",
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name",
                    "validate": {
                        "len": {
                            "args": [0, 30],
                            "msg": "이름이 너무 깁니다"
                        }
                    },
                    "allowNull": false
                },
                "isAdmin": {
                    "type": Sequelize.BOOLEAN,
                    "field": "isAdmin",
                    "defaultValue": false
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
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Posts",
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
                    "validate": {
                        "len": {
                            "args": [0, 255],
                            "msg": "포스트 제목이 너무 깁니다"
                        }
                    }
                },
                "contents": {
                    "type": Sequelize.STRING,
                    "field": "contents",
                    "validate": {
                        "len": {
                            "args": [0, 500],
                            "msg": "포스트는 최소 1자 이상 최대 500자 이하여야 합니다."
                        }
                    }
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
