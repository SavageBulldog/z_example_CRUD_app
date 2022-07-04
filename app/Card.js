export class Card {
    constructor(post, img) {
        this.post = post;

        this.element = this.#createCard(this.#cardContent());
    }

    #createCard(content) {
        const card = document.createElement('div');
        card.classList = `card card${this.post.number}`;

        const cardImg = document.createElement('div');
        cardImg.classList = `card__img`;
        cardImg.style.backgroundImage = `url('/images/${this.post.number}.webp')`; 

        card.append(cardImg, content);
        return card;
    }

    #cardContent() {
        const cardContent = document.createElement('div');
        cardContent.classList = `card__content`;

        const button = document.createElement('button');
        button.classList = `btn`;
        button.innerHTML = `
            read more
            <span class="material-icons-outlined">trending_flat</span>
        `;

        cardContent.innerHTML = `
            <p class="card__subtitle">${this.post.subtitle}</p>
            <h3 class="card__heading">${this.post.title}</h3>
            <p class="card__text">${this.post.summary}</p>
            <div class="card__footer">
                <div class="card__author__container">
                    <p class="date__created">${this.post.createdAtDate}</p>
                    <p class="author">${this.post.author}</p>
                </div>
                <button class="btn active" data-id="btnReadMore">
                    read more
                    <span class="material-icons-outlined">trending_flat</span>
                </button>
            </div>
        `;
        return cardContent;
    }
}




// export class Card {
//     constructor(image, subtitle, title, text, date, author) {
//         this.image = image;
//         this.subtitle = subtitle;
//         this.title = title;
//         this.text = text;
//         this.date = date;
//         this.author = author;

//         // this.post = post;


//         this.button = this.#cardButton();
//         this.element = this.#createCard(this.#cardContent());
//     }

//     #createCard(content) {
//         const cardImg = document.createElement('div');
//         cardImg.classList = `card__img`;
//         cardImg.style.backgroundImage = `"url(${this.image})"`;

//         const card = document.createElement('div');
//         card.classList = `card`;
//         card.append(cardImg, content);
//         return card;
//     }

//     #cardContent() {
//         const cardContent = document.createElement('div');
//         cardContent.classList = `card__content`;

//         cardContent.innerHTML = `
//             <p class="card__subtitle">${this.subtitle}</p>
//             <h3 class="card__heading">${this.title}</h3>
//             <p class="card__text">${this.text}</p>
//             <div class="card__footer">
//                 <div class="card__author__container">
//                     <p class="date__created">${this.date}</p>
//                     <p class="author">${this.author}</p>
//                 </div>
//                 ${this.button}
//             </div>
//         `;
//     }

//     #cardButton() {
//         const button = document.createElement('button');
//         button.classList = `btn`;
//         button.innerHTML = `
//             read more
//             <span class="material-icons-outlined">trending_flat</span>
//         `;
//         return button;
//     }
// }