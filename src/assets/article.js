export class Article {
    constructor({
        code = 'XXX00000', //City where the institute is established and random five digits
        topic = 'Untitled',
        purpose = '',
        sections = [new Section()], // Section = subtitle and paragraphs
        author = 'Anonymous',
        institute = '',
    }) {
        this._code = code;
        this._topic = topic;
        this._purpose = purpose;
        this._sections = sections;
        this._author = author;
        this._institute = institute;
    }

    getCode() {
        return this._code;
    }

    getTitle() {
        return this._title;
    }

    getPurpose() {
        return this._purpose;
    }

    getSections() {
        return this._sections;
    }

    getSpecificSection(subtitle) {
        return this._sections.find((section) => section.getSubtitle() === subtitle);
    }

    getAuthor() {
        return this._author;
    }

    getInstitute() {
        return this._institute;
    }
}

export class Section {
    constructor({ subtitle = '', paragraphs = [''] }) {
        this._subtitle = subtitle;
        this._paragraphs = paragraphs;
    }

    getSubtitle() {
        return this._subtitle;
    }

    getParagraphs() {
        return this._paragraphs;
    }
}
