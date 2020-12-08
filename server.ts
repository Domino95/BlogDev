import App from './app';
import Authentication from './controllers/authentication/authentication'

const app = new App(
    [
        new Authentication()
    ]
)

app.listen()
