'use strict';

const selectPostByIdQuery = require('../../bbdd/queries/posts/selectPostByIdQuery');

const getPost = async (req, res, next) => {
    const userId = req.user?.id;

    try {
        const { id } = req.params;

        // Info del post.
        const post = await selectPostByIdQuery(id, userId);

        res.send({
            status: 'ok',
            data: {
                message: 'datos post',
                post,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = getPost;
