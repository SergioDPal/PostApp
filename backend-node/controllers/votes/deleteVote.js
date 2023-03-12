'use strict';

const deleteVoteQuery = require('../../bbdd/queries/votes/deleteVoteQuery');

const deleteVote = async (req, res, next) => {
    try {
        const { id: postId } = req.params;

        // Insertamos el nuevo post.
        await deleteVoteQuery(postId, req.user.id);

        res.send({
            status: 'ok',
            message: 'voto eliminado',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = deleteVote;
