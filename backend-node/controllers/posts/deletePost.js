'use strict';

const deletePostQuery = require('../../bbdd/queries/posts/deletePostQuery');

const deletePost = async (req, res, next) => {
    try {
        await deletePostQuery(req.params.id);

        res.send({
            status: 'ok',
            data: {
                message: 'post eliminado',
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = deletePost;
