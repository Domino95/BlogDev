import App from './app';
import Authentication from './controllers/authentication/authentication'
import Post from './controllers/post/post'
const app = new App(
    [
        new Authentication(),
        new Post()
    ]
)

app.listen()
