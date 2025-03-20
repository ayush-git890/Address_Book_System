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
        try {
            const contact = new Contact(firstName, lastName, address, city, state, zip, phone, email);
            this.contacts.push(contact);
            console.log('Contact added successfully:', contact);
        } catch (error) {
            console.error('Error adding contact:', error.message);
        }
    }

    displayContacts() {
        return this.contacts.map(contact => JSON.stringify(contact, null, 2));
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
}

const addressBook = new AddressBook();

console.log(JSON.stringify(addressBook.contacts));
addressBook.addContact("Ayush", "Agarwal", "Agra", "Agra", "Uttar Pradesh", "282001", "9876543210", "ayushofficial4208@gmail.com");
addressBook.addContact("Mukul", "Singh", "Delhi", "New Delhi", "Delhi", "110001", "9123456789", "mukul.singh@example.com");
addressBook.addContact("Ajay", "Tyagi", "Noida", "Noida", "Uttar Pradesh", "201301", "9234567890", "ajay.tyagi@example.com");
addressBook.addContact("Aditya", "Chauhan", "Lucknow", "Lucknow", "Uttar Pradesh", "226001", "9345678901", "aditya.chauhan@example.com");

console.log(JSON.stringify(addressBook.contacts, null, 2));
console.log();

addressBook.findAndEditContact("Ajay", { city: "Ghaziabad", phone: "9988776655" });
console.log(JSON.stringify(addressBook.contacts, null, 2));

addressBook.findAndDeleteContact("Mukul");
console.log(JSON.stringify(addressBook.contacts, null, 2));