import Service from '../models/service.model.js';

const getAll = async (req, res) => {
    const services = await Service.find();
    res.json(services);
};

const create = async (req, res) => {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json(service);
};

const update = async (req, res) => {
    const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
};

const remove = async (req, res) => {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
};

export default { getAll, create, update, remove };