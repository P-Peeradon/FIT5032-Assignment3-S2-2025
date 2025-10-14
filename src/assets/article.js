export class Article {
    constructor({
        code, //City where the institute is established and random five digits
        topic,
        purpose,
        sections, // Section = subtitle and paragraphs
        author,
        institute,
    }) {
        this._code = code;
        this._topic = topic;
        this._purpose = purpose;
        this._sections = sections || [new Section()];
        this._author = author || 'Anonymous';
        this._institute = institute || '';
    }

    get code() {
        return this._code;
    }

    get topic() {
        return this._topic;
    }

    get purpose() {
        return this._purpose;
    }

    get sections() {
        return this._sections;
    }

    get author() {
        return this._author;
    }

    get institute() {
        return this._institute;
    }

    getSpecificSection(subtitle) {
        return this._sections.find((section) => section.getSubtitle() === subtitle);
    }
}

export class Section {
    constructor({ subtitle, paragraphs }) {
        this._subtitle = subtitle || '';
        this._paragraphs = paragraphs || [''];
    }

    getSubtitle() {
        return this._subtitle;
    }

    getParagraphs() {
        return this._paragraphs;
    }
}
