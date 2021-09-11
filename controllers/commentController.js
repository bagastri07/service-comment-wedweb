const db = require("../models")
const Response = require('../_helper/Response')

const createComment = (req, res, next) => {
    db.Comment.create(req.body)
        .then((result) => {
            return Response(res, 200, true, 'Komentar berhasil ditambahkan', result)
        })
        .catch((err) => {
            return Response(res, 500, false, err)
        })
};

const getAllComment = (req, res, next) => {
    db.Comment.findAll({
        attributes: ["id", "name", "message", "createdAt"]
    })
        .then((data) => {
            return Response(res, 200, true, 'Data berhasil didapat', data)
        })
        .catch((err) => {
            return Response(res, 500, false, err)
        })
}


module.exports = {
  createComment, getAllComment
};