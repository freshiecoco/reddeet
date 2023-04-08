const posts = {
    101: {
        id: 101,
        title: "Fishsticks",
        link: "https://www.smithsonianmag.com/innovation/surprising-success-story-fish-sticks-180977578/",
        description: "I actually really do not like fish sticks",
        creator: 1,
        subgroup: 'food',
        timestamp: 1643648446955,
        replies: [],
    },
    102: {
        id: 102,
        title: "Charlie the Unicorn",
        link: "https://www.youtube.com/watch?v=CsGYh8AacgY",
        description: "",
        creator: 2,
        subgroup: 'documentaries',
        timestamp: 1642611742010,
        replies: [9001, 9002, 9005],
    },
};

const comments = {
    9001: {
        id: 9001,
        post_id: 102,
        creator: 1,
        description: "lvl 1 comment: 11111",
        timestamp: 1642691742010,
        replies: [],
    },
    9002: {
        id: 9002,
        post_id: 102,
        creator: 1,
        description: "lvl 1 comment: 22222",
        timestamp: 1642691742010,
        replies: [9003, 9004],
    },
    9003: {
        id: 9003,
        post_id: 102,
        creator: 1,
        description: "lvl 2 comment: 11111",
        timestamp: 1642691742010,
        replies: [9006],
    },
    9004: {
        id: 9004,
        post_id: 102,
        creator: 1,
        description: "lvl 2 comment: 22222",
        timestamp: 1642691742010,
        replies: [],
    },
    9005: {
        id: 9005,
        post_id: 102,
        creator: 1,
        description: "lvl 1 comment: 33333",
        timestamp: 1642691742010,
        replies: [],
    },
    9006: {
        id: 9006,
        post_id: 102,
        creator: 1,
        description: "lvl 3 comment: 11111",
        timestamp: 1642691742010,
        replies: [],
    },
    
}

function getPost(id) {
    return posts[id];
}

function getComment(id) {
    return comments[id];
}

class CommentSection {
    constructor() {
        this.html = "";
    }

    displayReplies(comment) {
        this.html += `<div class="reply">`;
        if (comment.replies.length > 0) {
                this.html += "\n";
                this.html += displayComment(comment);
                comment.replies.forEach(reply => {
                this.displayReplies(getComment(reply));
            });
            this.html += "</div>\n";
        }
        else
        {
            this.html += displayComment(comment);
            this.html += "</div>\n";
        }        
    }

    displayPostReplies(post) {
        this.html += "<div>\n";
        if (post.replies) {
            post.replies.forEach(reply => {
                this.displayReplies(getComment(reply));
            });
        }
        
        this.html += "</div>";
    }
}

const displayComment = (comment) => {
    return comment.description; // fetch comment with that id, and return its description
}

const test = new CommentSection();
test.displayPostReplies(getPost(102));
console.log(test.html);
const testTag = document.getElementById("test");
testTag.innerHTML = test.html;