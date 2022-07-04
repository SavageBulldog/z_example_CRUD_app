export class Post {
    constructor(number, title, subtitle, summary, text, createdAt, editedAt, author) {
        this.number = number;
        this.title = title;
        this.subtitle = subtitle;
        this.summary = summary;
        this.text = text;
        this.createdAt = createdAt;
        this.editedAt = editedAt;
        this.createdAtDate = createdAt;
        this.editedAtDate = editedAt;

        this.author = author;
    }

    getFullDate(dateObj) {
        function twoDigits(num) {
            return num.toString().padStart(2, '0');
        }

        let year = dateObj.getFullYear();
        let month = twoDigits(dateObj.getMonth() + 1);
        let day = twoDigits(dateObj.getDate());

        let date = `${day}-${month}-${year}`;
        return date;
    }
}