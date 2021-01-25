export const state = {
    posts: []
}

const loadDefaultState = (data) => {
    if (data.length > 0)
    {
        data.map(post => {
            return state.posts.push(post);
        })
    }
}

const addPost = (post) => {
    return state.posts.push(post);
}

const removePost = (id) => {
    const splitID = id.split('-')[1]
    const index = state.posts.map((item, index) => index).indexOf(parseInt(splitID));
    return state.posts.splice(index, 1);
}

const voteOption = (id, type) => {
    const object = state.posts[id];
    
    if (type == "plus")
    {
       return object.vote.plus += 1;

    }
    else if (type == "minus")
    {
        return object.vote.minus += 1;
    }
}

export {
    loadDefaultState,
    addPost,
    removePost,
    voteOption
}