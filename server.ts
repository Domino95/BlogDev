import App from './app';
import Authentication from './controllers/authentication/authentication'
import Post from './controllers/post/post'
import Comment from './controllers/comment/comments'
const app = new App(
    [
        new Authentication(),
        new Post(),
        new Comment()
    ]
)

app.listen()
