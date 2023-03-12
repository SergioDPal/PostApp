'use strict';

const getDB = require('../../getConnection');

const deleteVoteQuery = async (postId, tokenId) => {
    let connection;

    try {
        connection = await getDB();

        await connection.query(
            `
            DELETE  
            FROM votes
            WHERE id_post=? AND id_user=?
            `,
            [postId, tokenId]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = deleteVoteQuery;
