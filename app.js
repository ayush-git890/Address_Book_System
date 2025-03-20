class Contact {
    constructor(firstName, lastName, address, city, state, zip, phone, email) {
        if (!Contact.validateName(firstName) || !Contact.validateName(lastName)) {
            throw new Error('First name and last name must start with a capital letter and be at least 3 characters long.');
        }
        if (!Contact.validateAddress(address) || !Contact.validateAddress(city) || !Contact.validateAddress(state)) {
            throw new Error('Address, city, and state must be at least 4 characters long.');
        }
        if (!Contact.validateZip(zip)) {
            throw new Error('Invalid ZIP code. It should be a 6-digit number.');
        }
        if (!Contact.validatePhone(phone)) {
            throw new Error('Invalid phone number. It should be a 10-digit number.');
        }
        if (!Contact.validateEmail(email)) {
            throw new Error('Invalid email format.');
        }

        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phone = phone;
        this.email = email;
    }

    static validateName(name) {
        return /^[A-Z][a-zA-Z]{2,}$/.test(name);
    }

    static validateAddress(value) {
        return /^.{4,}$/.test(value);
    }

    static validateZip(zip) {
        return /^\d{6}$/.test(zip);
    }

    static validatePhone(phone) {
        return /^\d{10}$/.test(phone);
    }

    static validateEmail(email) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    }
}

class AddressBook {
    constructor() {
        this.contacts = [];
    }

    addContact(firstName, lastName, address, city, state, zip, phone, email) {
        if (this.contacts.some(c => c.firstName === firstName && c.lastName === lastName)) {
            console.error('Duplicate contact entry detected. Contact not added.');
            return;
        }
        try {
            const contact = new Contact(firstName, lastName, address, city, state, zip, phone, email);
            this.contacts.push(contact);
            console.log('Contact added successfully:', contact);
        } catch (error) {
            console.error('Error adding contact:', error.message);
        }
    }

    displayContacts() {
        return this.contacts.map(contact => contact);
    }

    findAndEditContact(name, updatedDetails) {
        const contact = this.contacts.find(c => c.firstName === name || c.lastName === name);
        if (contact) {
            Object.assign(contact, updatedDetails);
            console.log('Contact updated successfully:', contact);
        } else {
            console.error('Contact not found.');
        }
    }

    findAndDeleteContact(name) {
        const index = this.contacts.findIndex(c => c.firstName === name || c.lastName === name);
        if (index !== -1) {
            this.contacts.splice(index, 1);
            console.log(`Contact '${name}' deleted successfully.`);
        } else {
            console.error('Contact not found.');
        }
    }

    getContactCount() {
        return this.contacts.length;
    }

    searchByCityOrState(location) {
        return this.contacts.filter(contact => contact.city === location || contact.state === location);
    }
}

const addressBook = new AddressBook();

addressBook.addContact("Ayush", "Agarwal", "Vijay Nagar", "Agra", "Uttar Pradesh", "282004", "9876543210", "ayushofficial4208@gmail.com");
addressBook.addContact("Mukul", "Singh", "Civil Lines", "Aligarh", "Uttar Pradesh", "202001", "8765432109", "mukul@gmail.com");
addressBook.addContact("Ajay", "Tyagi", "Sector 62", "Noida", "Uttar Pradesh", "201301", "7654321098", "ajay@gmail.com");
addressBook.addContact("Aditya", "Chauhan", "Raj Nagar", "Ghaziabad", "Uttar Pradesh", "201002", "6543210987", "aditya@gmail.com");

console.log(JSON.stringify(addressBook.contacts, null, 2));

addressBook.findAndEditContact("Ayush", { city: "Mathura", phone: "9123456789" });
console.log(JSON.stringify(addressBook.contacts, null, 2));

addressBook.findAndDeleteContact("Mukul");
console.log(JSON.stringify(addressBook.contacts, null, 2));

console.log("Number of contacts in address book:", addressBook.getContactCount());

console.log("Contacts in Agra:", addressBook.searchByCityOrState("Agra"));
console.log("Contacts in Uttar Pradesh:", addressBook.searchByCityOrState("Uttar Pradesh"));
