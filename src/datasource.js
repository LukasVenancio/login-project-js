const typeorm = require("typeorm")

const dataSource = new typeorm.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "12345678",
    database: "login_project",
    synchronize: true,
    logging: false,
    entities: [require("./entities/User")],
    migrations: [],
    subscribers: [],
})

module.exports = dataSource;