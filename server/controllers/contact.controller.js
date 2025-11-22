import Contact from '../models/contact.model.js'

const addContact = async (req, res) => {
    try {
        const contact = new Contact(req.body)
        await contact.save()
        res.status(201).json(contact)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find()
        res.json(contacts)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id)
        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' })
        }
        res.json(contact)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const updateContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' })
        }
        res.json(contact)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const deleteContactById = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(404).json({ error: "Contact not found" });
        }
        res.json({ message: "Contact deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteContactAll = async (req, res) => {
    try {
        await Contact.deleteMany({})
        res.json({ message: 'All contact deleted successfully' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export default {
    add: addContact,
    getAll: getAllContacts,
    getById: getContactById,
    update: updateContact,
    deleteById: deleteContactById,
    deleteAll: deleteContactAll
}
