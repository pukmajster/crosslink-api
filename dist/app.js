"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_notifier_1 = __importDefault(require("node-notifier"));
const path_1 = __importDefault(require("path"));
const app = express_1.default();
const port = 3000;
app.use(express_1.default.static(path_1.default.resolve('./public')));
app.get('/', (req, res) => {
    res.send('The sedulous hyena ate the antelope!');
});
app.listen(port, () => {
    node_notifier_1.default.notify({
        title: 'crosslink-api live!',
        message: `crosslink-api is listening on ${port}`,
        icon: path_1.default.join(__dirname, '/crosslink.png'),
        sound: false,
        wait: false
    });
    console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=app.js.map