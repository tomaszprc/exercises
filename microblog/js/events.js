import {postsContainerElement,formElement, postSuccessElement} from "./static";
import {state, addPost, removePost, voteOption} from "./model";
import { renderPosts}  from "./views";

const addPostAction = () => {
    formElement.addEventListener("submit", function(e){
        e.preventDefault();

        if (this.title.value && this.description.value)
        {
            const postObject = {
                id: state.posts.length + 1,
                title: this.title.value,
                description: this.description.value,
                vote: {
                    plus: 0,
                    minus:0
                }
            }
            addPost(postObject);
            postsContainerElement.innerHTML = "";
            renderPosts(state.posts);
            postSuccessElement.classList.add('show')
            
            this.title.value = ""
            this.description.value = "";

            setTimeout(() => {
                postSuccessElement.classList.remove('show')
            }, 1500);
            }
        else
        {
            alert("Validate error")
        }
    })
}

export const removeButtonAction = (element) => {

    if (!element) return;
    element.addEventListener("click", function(){
        const postElement = this.closest('.blog-tile-js');
        const postID = postElement.id;
        removePost(postID);
        postsContainerElement.innerHTML = "";
        renderPosts(state.posts);
    })
}

export const voteButton = (element, type, index) => {

    if (!element) return;
    element.addEventListener("click", function(){
        voteOption(index, type);
        postsContainerElement.innerHTML = "";
        renderPosts(state.posts);
    })
}

export const initEvents = function() {
    addPostAction();
    removeButtonAction();
}