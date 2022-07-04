import { APIService } from './APIService.js'

export class UI {
    static activateURLInput() {
        document.getElementById('containerURLInput').classList.add('active');
        document.getElementById('btnDone').classList.add('active');
        document.getElementById('btnClose').classList.add('active');
        document.getElementById('btnGroupURL').classList.add('active');
    }

    static deactivateURLInput() {
        document.getElementById('containerURLInput').classList.remove('active');
        document.getElementById('btnDone').classList.remove('active');
        document.getElementById('btnClose').classList.remove('active');
        document.getElementById('btnGroupURL').classList.remove('active');
    }

    static showCards(cards) {
        const display = document.getElementById('displayCards');
        display.classList.add('active');
        document.getElementById('displayList').classList.remove('active');

        if (cards) {
            display.innerHTML = '';
            cards.forEach(card => display.append(card.element));
        }

        if (document.getElementById('displayFullPost').classList.contains('active')) {
            this.hideFullPost();
        }
    }

    static showList(rows) {
        const display = document.getElementById('displayList');
        display.classList.add('active');
        document.getElementById('displayCards').classList.remove('active');
        
        if (rows) {
            display.innerHTML = '';
            const tHead = document.createElement('div');
            tHead.classList = `thead`;
            tHead.innerHTML = `
                <div class="thead__title">Title</div>
                <div class="thead__summary">Summary</div>
                <div class="thead__created">Created:</div>
                <div class="thead__last__edited">Last edited:</div>
                <div class="thead__author">Author</div>
            `;

            const tBody = document.createElement('div');
            tBody.classList = `tbody`;
            rows.forEach(row => tBody.append(row.element));
            display.append(tHead, tBody);
        }

        if (document.getElementById('displayFullPost').classList.contains('active')) {
            this.hideFullPost();
        }
    }

    static showNewPostInput() {
        document.getElementById('displayNewPost').classList.add('active');
        document.getElementById('displayList').classList.remove('active');
        document.getElementById('displayCards').classList.remove('active');

        document.getElementById('btnPosts').classList.add('disabled');
        document.getElementById('btnShowAll').classList.add('disabled');

        if (document.getElementById('displayFullPost').classList.contains('active')) {
            this.hideFullPost();
        }
    }

    static hideNewPostInput() {
        document.getElementById('displayNewPost').classList.remove('active');
        document.getElementById('displayList').classList.remove('active');
        document.getElementById('displayCards').classList.remove('active');

        document.getElementById('btnPosts').classList.remove('disabled');
        document.getElementById('btnShowAll').classList.remove('disabled');
    }

    static showMessage(message) {
        document.getElementById('displayMessage').classList.add('active');
        document.getElementById('message').innerText = message;
    }
    
    static hideMessage() {
        document.getElementById('displayMessage').classList.remove('active');
    }

    static clearInputs() {
        document.getElementById('authorInput').value = '';
        document.getElementById('newPostTitleInput').value = '';
        document.getElementById('newPostSubtitleInput').value = '';
        document.getElementById('newPostSummaryInput').value = '';
        document.getElementById('newPostTextInput').value = '';
    }

    static showFullPost(post) {
        document.getElementById('displayList').classList.remove('active');
        document.getElementById('displayCards').classList.remove('active');

        const display = document.getElementById('displayFullPost');
        display.classList.add('active');

        display.innerHTML = `
            <div class="post__img"></div>
            <div class="post__content">
                <p class="post__subtitle">${post.subtitle}</p>
                <h3 class="post__heading">${post.title}</h3>
                <p class="post__text">${post.text}</p>
            </div>
            <div class="post__footer">
                <div class="post__author__container">
                    <p class="author">${post.author}</p>
                    <p class="post__created">
                        posted:
                        <span data-id="datePosted">${post.createdAtDate}</span>
                    </p>
                    <p class="post__edited">
                        edited:
                        <span data-id="datePosted">${post.createdAtDate}</span>
                    </p>
                </div>
            </div>   
        `;
    }

    static hideFullPost() {
        document.getElementById('displayFullPost').classList.remove('active');
    }
}