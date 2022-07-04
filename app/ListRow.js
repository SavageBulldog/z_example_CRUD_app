export class ListRow {
    constructor(post) {
        this.post = post;
        this.element = this.createRow();
    }

    createRow() {
        const row = document.createElement('div');
        row.classList = `row`;

        row.innerHTML = `
            <p class="title" id="rowTitle">${this.post.title}</p>
            <p id="rowText">${this.post.summary}</p>
            <p id="rowCreatedAt">${this.post.createdAtDate}</p>
            <p id="rowEditedAt">${this.post.editedAtDate}</p>
            <p id="rowAuthor">${this.post.author}</p>
            <div class="btn-group">
                <span class="material-icons-outlined" data-id="btnEditPost">edit_note</span>
                <span class="material-icons-outlined" data-id="btnDeletePost">delete</span>
            </div>
            <div id="invisibleId">${this.post._id}</div>
        `;

        return row;
    }
}