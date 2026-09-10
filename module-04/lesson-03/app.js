const http = require("http");
const fs = require("fs");


const PORT = 8080;

const server = http.createServer((req, res) => {
    console.log(req.url, req.method)

    let path = './views/'

    switch (req.url) {
        case '/':
            path += 'home.html';
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html")
            break;

        case '/about-me':
            res.statusCode = 301;
            res.setHeader("Location", "/about")
            break;


        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html")
            break;



        default:
            path += '404.html'
            res.setHeader("Content-Type", "text/html")
            res.statusCode = 404;
    }

    fs.readFile(path, 'utf-8', (err, data) => {
        res.end(data)
    })


    // console.log(path)
    // if (req.url === '/') {
    //     return res.end("<h1> Welcome to home page</h1>")
    // } else if (req.url === "/about") {
    //     return res.end("<h1>About page</h1>")
    // }

    // res.end("<h1> OOPS! page not found </h1>")
})


server.listen(PORT, () => {
    console.log(`Server listing on http://localhost:${PORT}`)
})