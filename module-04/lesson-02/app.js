const http = require("http");
const fs = require("fs");


const server = http.createServer((req, res) => {
    console.log(req.url, req.method)

    let basePath = './views'

    switch (req.url) {
        case '/':
            basePath += '/home.html';
            break;
        case '/about':
            basePath += '/about.html'
            break;

        default:
            basePath += '/home.html'
    }

    fs.readFile(basePath, "utf-8", (err, data) => {
        if (err) {
            console.log(err)
        }

        res.end(data)
        // console.log(data)
    })

    // res.setHeader("Content-Type", "appl/plain");
    // res.write("<h1> Hello World </h1>");
    // res.end()
})

const port = 8080;
server.listen(port, () => {
    console.log(`Server listing on port ${port}`)
})










// -------------------------------------------
// const fs = require("fs");

// console.log("1")

// fs.writeFile("./test.txt", "Hello World", (err) => {
//     if (err) {
//         console.log(err)
//     }

//     console.log("success")
// })


// fs.readFile("./test.txt", "utf-8", (err, data) => {
//     if (err) {
//         console.log(err)
//     }

//     if (data) {
//         console.log(data)
//     }
// })

// console.log("2")