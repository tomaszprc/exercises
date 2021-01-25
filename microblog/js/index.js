import {loadDefaultState , state} from "./model";
import {renderPosts} from "./views";
import {initEvents} from "./events";

let data = require("../data/posts.json");

loadDefaultState(data);
renderPosts(state.posts);
initEvents(true);