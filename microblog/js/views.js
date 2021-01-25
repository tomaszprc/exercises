import {postsContainerElement, countElement} from "./static";
import * as events from "./events";

const _renderTile = (post, index) => {
    return `
    <div id="post-${index}" class="blog__tile blog-tile-js">
        <div class="blog__tile-title">
            ${post.title}
        </div>

        <div class="blog__tile-description">
            ${post.description}
        </div>

        <div class="blog__tile-menu">
            <div class="blog__tile-remove remove-button-js">
                Remove
            </div>
            
            <div class="blog__tile-vote vote-js">
            (${post.vote.plus}) <span class="cursor-pointer vote-plus-js">+</span> (${post.vote.minus}) <span class="cursor-pointer vote-minus-js">-</span>
            </div>
        </div>
    </div>
    `
}

const renderPosts = (posts) => {
    posts.map((post, index) => {
        postsContainerElement.insertAdjacentHTML("beforeend", _renderTile(post,index));
        let element = document.querySelector(`#${'post-'+index}`);
        let buttonElement = element.querySelector('.remove-button-js');
        let votePlus = element.querySelector('.vote-plus-js');
        let voteMinus = element.querySelector('.vote-minus-js');
        
        events.voteButton(votePlus, "plus", index);
        events.voteButton(voteMinus, "minus", index);
        events.removeButtonAction(buttonElement);
    })

    countElement.textContent = posts.length;
}


export {
    renderPosts,
}