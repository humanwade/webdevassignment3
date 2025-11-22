import ContactInfo from '../models/contactInfo.model.js';

export const getInfo = async (req, res) => {
  const info = await ContactInfo.findOne();
  res.json(info);
};

export const saveInfo = async (req, res) => {
  try {
    const data = req.body;
    let info = await ContactInfo.findOne();

    if (info) {
      info.phone = data.phone;
      info.email = data.email;
      info.linkedin = data.linkedin;
      await info.save();
    } else {
      info = new ContactInfo(data);
      await info.save();
    }

    res.status(200).json(info);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
