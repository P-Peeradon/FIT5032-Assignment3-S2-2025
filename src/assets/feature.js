export class Feature {
    constructor({ title, pillar, description } = {}) {
        this._title = title || 'Untitled';
        this._pillar = pillar || 'UNKNOWN';
        this._description = description || '';
    }

    // Pillar => connect, grow, reflect

    get title() {
        return this._title;
    }

    get pillar() {
        return this._pillar;
    }

    get description() {
        return this._description;
    }
}
