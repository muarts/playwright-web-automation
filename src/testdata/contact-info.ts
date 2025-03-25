export class ContactInfo {
    private firstName: string;
    private lastName: string;
    private dateOfBirth: string;
    private email: string;
    private phone: string;
    private streetAddressOne: string;
    private streetAddressTwo: string;
    private city: string;
    private stateProvince: string;
    private postalCode: string;
    private country: string;

    private constructor() {}

    static builder(): ContactInfo {
        return new ContactInfo();
    }

    getFirstName(): string {
        return this.firstName;
    }

    getLastName(): string {
        return this.lastName;
    }

    getDateOfBirth(): string {
        return this.dateOfBirth;
    }

    getEmail(): string {
        return this.email;
    }

    getPhone(): string {
        return this.phone;
    }

    getStreetAddressOne(): string {
        return this.streetAddressOne;
    }

    getStreetAddressTwo(): string {
        return this.streetAddressTwo;
    }

    getCity(): string {
        return this.city;
    }

    getStateProvince(): string {
        return this.stateProvince;
    }

    getPostalCode(): string {
        return this.postalCode;
    }

    getCountry(): string {
        return this.country;
    }

    setFirstName(value: string): ContactInfo {
        this.firstName = value;
        return this;
    }

    setLastName(value: string): ContactInfo {
        this.lastName = value;
        return this;
    }

    setDateOfBirth(value: string): ContactInfo {
        this.dateOfBirth = value;
        return this;
    }

    setEmail(value: string): ContactInfo {
        this.email = value;
        return this;
    }

    setPhone(value: string): ContactInfo {
        this.phone = value;
        return this;
    }

    setStreetAddressOne(value: string): ContactInfo {
        this.streetAddressOne = value;
        return this;
    }

    setStreetAddressTwo(value: string): ContactInfo {
        this.streetAddressTwo = value;
        return this;
    }

    setCity(value: string): ContactInfo {
        this.city = value;
        return this;
    }

    setStateProvince(value: string): ContactInfo {
        this.stateProvince = value;
        return this;
    }

    setPostalCode(value: string): ContactInfo {
        this.postalCode = value;
        return this;
    }

    setCountry(value: string): ContactInfo {
        this.country = value;
        return this;
    }
}

export default ContactInfo;
