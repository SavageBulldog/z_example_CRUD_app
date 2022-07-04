import { UI } from './UI.js'
import { Post } from './Post.js'
import { Card } from './Card.js'
import { ListRow } from './ListRow.js'
import { APIService } from './APIService.js';

const btnDone = document.getElementById('btnDone');
const btnClose = document.getElementById('btnClose');
const btnPosts = document.getElementById('btnPosts');
const btnShowList = document.getElementById('btnShowAll');
const btnNewPost = document.getElementById('btnNewPost');
const btnPublishPost = document.getElementById('btnPublishPost');
const btnSavePost = document.getElementById('btnUpdatePost');
const btnExamplePosts = document.getElementById('btnExamplePosts');

let apiService = null;
let apiData = [];
let cards = []
let rows = [];
let examplePosts = false;

function init() {
    let url = document.getElementById('urlInput').value;

    if (url != '') {
        console.log('sucessful');
        apiService = new APIService(url);

        getApiData()
            .then(getList)
            .then(getCards)
            .then(editDeleteEvents)
            .then(readMoreEvent)
            .then(() => {
                if (apiData.length == 0) {
                    btnExamplePosts.classList.add('active');
                }
            })
            .catch(err => console.error(err));
    }
    console.warn('no URL!');
}

async function getApiData() {
    await apiService.GET('posts')
        .then(data => {
            apiData = data;
            console.log(data);
        })
        .catch(err => console.error(err)); 
}

function createExamplePosts() {
    examplePosts = true;
    const post1 = new Post(
        1,
        'A very interesting Title',
        'Interesting subtitle',
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores.',
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
        new Date(),
        new Date(),
        'Jane Does'
    );
    post1.createdAtDate = post1.getFullDate(post1.createdAt);
    post1.editedAtDate = post1.getFullDate(post1.editedAt);

    const post2 = new Post(
        2,
        `A title. That's it.`,
        'somewhat intersting subtitle',
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.',
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
        new Date(),
        new Date(),
        'John Does'
    );
    post2.createdAtDate = post2.getFullDate(post2.createdAt);
    post2.editedAtDate = post2.getFullDate(post2.editedAt);

    const post3 = new Post(
        3,
        `Another title, but it's longer this time.`,
        'another subtitle',
        'Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores .',
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
        new Date(),
        new Date(),
        'Jane Does'
    );
    post3.createdAtDate = post3.getFullDate(post3.createdAt);
    post3.editedAtDate = post3.getFullDate(post3.editedAt);

    let postArr = [];
    postArr.push(post1, post2, post3);
    console.log(postArr);

    postArr.forEach(el => {
        apiService.POST(el, 'posts')
            .then(data => console.log(data))
            .then(() => {
                getApiData()
                    .then(getList)
                    .then(getCards)
                    .then(UI.showCards)
                    .then(btnShowList.classList.remove('active'))
                    .catch(err => console.error(err));
            })
        .catch(err => console.error(err));
    })
}

function getCards() {
    let arr = [];
    apiData.forEach(data => {
        let card = new Card(data);
        arr.push(card);
        cards = arr;
    })
    UI.showCards(cards);
}

function getList() {
    let arr = [];
    apiData.forEach(data => {
        let row = new ListRow(data);
        arr.push(row);
        rows = arr;
    })
    UI.showList(rows);
}

function editDeleteEvents() {
    document.addEventListener('click', e => {
        if (e.target.dataset.id == 'btnDeletePost') {
            let selectedRow = e.target.parentNode.parentNode;
            let selectedId = Array.from(selectedRow.children).find(el => el.id == 'invisibleId').innerText;
    
            console.log(selectedRow);
            console.log(selectedId);

            UI.showMessage('Delete this post?');
            document.getElementById('btnOkMessage').addEventListener('click', () => {
                apiService.DELETE(selectedId, 'posts')
                    .then(() => {
                        getApiData()
                            .then(getCards)
                            .then(getList)
                            .then(() => {
                                if (apiData.length == 0) {
                                    btnExamplePosts.classList.add('active');
                                }
                            });
                    })
                    .catch(err => console.error(err));

                UI.hideMessage();
            }) 

            document.getElementById('btnCancelMessage').addEventListener('click', () => {
                UI.hideMessage();
            })
        }
    
        if (e.target.dataset.id == 'btnEditPost') {
            let selectedRow = e.target.parentNode.parentNode;
            let selectedId = Array.from(selectedRow.children).find(el => el.id == 'invisibleId').innerText;

            let selectedPost = apiData.find(post => post._id == selectedId);
            const {author, title, subtitle, summary, text} = selectedPost;
            
            document.getElementById('authorInput').value = author;
            document.getElementById('newPostTitleInput').value = title;
            document.getElementById('newPostSubtitleInput').value = subtitle;
            document.getElementById('newPostSummaryInput').value = summary;
            document.getElementById('newPostTextInput').value = text;

            UI.showNewPostInput();
            btnPublishPost.classList.remove('active');
            btnSavePost.classList.add('active');
            
            btnSavePost.addEventListener('click', () => {
                UI.hideNewPostInput();

                const update = new Post(
                    selectedPost.number,
                    document.getElementById('newPostTitleInput').value,
                    document.getElementById('newPostSubtitleInput').value,
                    document.getElementById('newPostSummaryInput').value,
                    document.getElementById('newPostTextInput').value,
                    selectedPost.createdAt,
                    new Date(),
                    selectedPost.author
                );

                console.log(update);
                update.createdAtDate = selectedPost.createdAtDate;
                update.editedAtDate = update.getFullDate(update.editedAt);

                apiService.PUT(update, selectedPost._id, 'posts')
                    .then(() => {
                        getApiData()
                            .then(getCards)
                            .then(getList);
                    })
                    .catch(err => console.error(err));
            })
        }
        return;
    })
}

function readMoreEvent() {
    document.addEventListener('click', e => {
        if (e.target.dataset.id == 'btnReadMore') {
            let clickedCardElement = e.target.parentNode.parentNode.parentNode;
            let selectedCard = cards.find(card => card.element == clickedCardElement)
            let selectedPost = apiData.find(post => post == selectedCard.post);

            UI.showFullPost(selectedPost);
            const imgDisplay = document.querySelector('.post__img');
            imgDisplay.style.backgroundImage = `url('/images/${selectedPost.number}.webp')`; 
        }

        return;
    })
}

btnDone.addEventListener('click', () => {
    UI.deactivateURLInput();
    init();
})

btnClose.addEventListener('click', () => {
    UI.deactivateURLInput();
})

document.getElementById('urlInput').addEventListener('click', () => {
    UI.activateURLInput();
})

btnExamplePosts.addEventListener('click', () => {
    createExamplePosts();
    btnExamplePosts.classList.remove('active');
})

btnNewPost.addEventListener('click', () => {
    UI.showNewPostInput();
    UI.clearInputs();
    btnPublishPost.classList.add('active');
    btnSavePost.classList.remove('active');
    btnShowList.classList.remove('active');
})

let postNumber = 4;

btnPublishPost.addEventListener('click', () => {
    UI.hideNewPostInput();

    const post = new Post(
        postNumber,
        document.getElementById('newPostTitleInput').value,
        document.getElementById('newPostSubtitleInput').value,
        document.getElementById('newPostSummaryInput').value,
        document.getElementById('newPostTextInput').value,
        new Date(),
        new Date(),
        document.getElementById('authorInput').value
    );
    post.createdAtDate = post.getFullDate(post.createdAt);
    post.editedAtDate = post.getFullDate(post.editedAt);
    console.log(post);

    UI.clearInputs();

    apiService.POST(post, 'posts')
        .then(() => {
            getApiData()
                .then(getList)
                .then(getCards)
                .then(UI.showCards)
                .then(btnShowList.classList.remove('active'))
                .then(postNumber++)
                .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
})

document.getElementById('btnCancel').addEventListener('click', () => {
    UI.hideNewPostInput();
    UI.showCards();
})

btnPosts.addEventListener('click', () => { 
    UI.showCards();
    btnShowList.classList.remove('active');
})

btnShowList.addEventListener('click', () => {
    if (btnShowList.classList.contains('active')) {
        UI.showCards();
        btnShowList.classList.remove('active');
        return;
    }
    UI.showList();
    btnShowList.classList.add('active');
})