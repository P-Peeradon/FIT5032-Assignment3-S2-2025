export class Community {
    constructor(name, abbrev, description, location, contact) {
        this.name = name;
        this.abbrev = abbrev;
        this.description = description;
        this.location = location;
        this.contact = contact;
        this.address = {};
    }

    // Pillar => connect, growth, reflect

    getName() {
        return this.name;
    }

    getAbbrev() {
        return this.abbrev;
    }

    getDescription() {
        return this.description;
    }

    getLocation() {
        return this.location;
    }

    getContact() {
        return this.contact;
    }
}

// This is weak entity as it depends on two classes, user and community.
// Deleting user mean deleting all membership state.
// ON DELETE CASCADE;
export class Membership {
    constructor(uid, username, communityName) {
        this.uid = uid;
        this.username = username;
        this.communityName = communityName;
    }

    getUID() {
        return this.uid;
    }

    getUsername() {
        return this.username;
    }

    getCommunityName() {
        return this.communityName;
    }
}
