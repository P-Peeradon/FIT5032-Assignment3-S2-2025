export class Community {
    constructor({
        cid,
        name,
        abbrev,
        vision,
        owner,
        description,
        location,
        contact,
        organisation,
        address,
    } = {}) {
        this._cid = cid || 'XXX0000'; //City name code follows by 4 digits like.
        this._name = name || 'Unknown';
        this._abbrev = abbrev || '';
        this._owner = owner || 'Anonymous';
        this._vision = vision || '';
        this._description = description || [''];
        this._location = location || '';
        this._contact = contact || {};
        this._organisation = organisation || '';
        this._address = address || {};
    }

    get cid() {
        return this._cid;
    }

    get name() {
        return this._name;
    }

    get abbrev() {
        return this._abbrev;
    }

    get description() {
        return this._description;
    }

    get vision() {
        return this._vision;
    }

    get location() {
        return this._location;
    }

    get contact() {
        return this._contact;
    }

    get organisation() {
        return this._organisation;
    }

    get address() {
        return this._address;
    }
}
