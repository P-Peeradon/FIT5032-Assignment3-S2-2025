export class Feature {
    constructor(title, pillar, description) {
        this.title = title;
        this.pillar = pillar;
        this.description = description;
    }

    // Pillar => connect, growth, reflect

    getTitle() {
        return this.title;
    }

    getPillar() {
        return this.pillar;
    }

    getDescription() {
        return this.description;
    }
}
