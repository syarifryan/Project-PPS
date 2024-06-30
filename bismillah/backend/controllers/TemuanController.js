import Temuan from "../models/TemuanModel.js";
import path from "path";
import fs from "fs";

export const getTemuan = async(req, res) => {
    try {
        const response = await Temuan.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getTemuanById = async(req, res) => {
    try {
        const response = await Temuan.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const saveTemuan = (req, res) => {
    if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" });
    const name = req.body.title;
    const identity = req.body.identity;
    const desc = req.body.desc;
    const location = req.body.location;
    const dateFound = req.body.date;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

    file.mv(`./public/images/${fileName}`, async(err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
            await Temuan.create({ name: name, identity: identity, desc: desc, location: location, dateFound: dateFound, image: fileName, url: url });
            res.status(201).json({ msg: "Temuan Created Successfully" });
        } catch (error) {
            console.log(error.message);
        }
    })
}

export const updateTemuan = async(req, res) => {
    const temuan = await Temuan.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!temuan) return res.status(404).json({ msg: "No Data Found" });

    let fileName = "";
    if (req.files === null) {
        fileName = temuan.image;
    } else {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png', '.jpg', '.jpeg'];

        if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
        if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

        const filepath = `./public/images/${temuan.image}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/images/${fileName}`, (err) => {
            if (err) return res.status(500).json({ msg: err.message });
        });
    }
    const name = req.body.title;
    const identity = req.body.identity;
    const desc = req.body.desc;
    const location = req.body.location;
    const dateFound = req.body.date;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    try {
        await Temuan.update({ name: name, identity: identity, desc: desc, location: location, dateFound: dateFound, image: fileName, url: url }, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Temuan Updated Successfully" });
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteTemuan = async(req, res) => {
    const temuans = await Temuan.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!temuans) return res.status(404).json({ msg: "No Data Found" });

    try {
        const filepath = `./public/images/${temuans.image}`;
        fs.unlinkSync(filepath);
        await Temuan.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Temuan Deleted Successfully" });
    } catch (error) {
        console.log(error.message);
    }
}
