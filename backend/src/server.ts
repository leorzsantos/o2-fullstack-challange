import * as bodyParser from "body-parser";
import * as express from "express";
import * as path from "path";
import * as cors from "cors";
import { CommonRoutes } from './routes/common_routes';
import Swagger from '../swagger';
import env from '../environment';
import { ProdutosRoutes } from "./routes/produtos_routes";
import { TestRoutes } from "./routes/test_route";
import { MovimentacaoRoutes } from "./routes/movimentacao_routes";

class Server {

  public app: express.Application;

  private sw : Swagger = new Swagger();
  private test_routes: TestRoutes = new TestRoutes();
  private common_routes: CommonRoutes = new CommonRoutes();
  private produtos_routes: ProdutosRoutes = new ProdutosRoutes();
  private movimentacao_routes: MovimentacaoRoutes = new MovimentacaoRoutes();

  public static bootstrap(): Server {
    return new Server();
  }

  swaggerUi = require('swagger-ui-express');

  constructor() {
    this.app = express();
    this.config();
    this.app.use('/v1/api-docs', this.swaggerUi.serve, this.swaggerUi.setup(this.sw.SetSwagger()));
    this.test_routes.route(this.app);
    this.produtos_routes.route(this.app);
    this.movimentacao_routes.route(this.app);
    this.common_routes.route(this.app);
  }

  public config() {
    this.app.use(express.static(path.join(__dirname, "public")));
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));
    this.app.listen(env.getPort(), function () {
      console.log(`app listening on port ${env.getPort()}`)
    })
  }
}

export default new Server().app;