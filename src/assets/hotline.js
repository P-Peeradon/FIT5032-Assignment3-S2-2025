export class Hotline {
    constructor({ name, location, purpose, contact, tier } = {}) {
        this._name = name || '';
        // Tier 1: Emergency, related to loss of life and asset.
        // Tier 2: Not emergency but related to mental health issues or target any specialised groups such as for minorities, lgbt+, neurodivergent or loss.
        // Tier 3: General contact, anyone can contact.
        // Tier 4: No definition since 4 means death.
        this._tier = tier || 4;
        this._location = location || [''];
        this._purpose = purpose || 'Unknown';
        this._contact = contact || { tel: '0' };
    }

    get name() {
        return this._name;
    }

    get tier() {
        return this._tier;
    }

    get location() {
        return this._location;
    }

    get purpose() {
        return this._purpose;
    }

    get contact() {
        return this._contact;
    }

    getContact(channel) {
        if (this.contact[channel]) {
            return this._contact[channel];
        } else {
            return undefined;
        }
    }
}
