const executeQuery = require("../config/db_config");

const ifExist = async(UserId) => {
        try {
            const query = `SELECT id FROM Rating WHERE UserId =?`;
            const result = await executeQuery(query, [UserId]);
            return result;
        } catch (err) {
            throw new Error("Error Rating session: " + err.message);
        }
        // Function to create a new Rating
        const createRating = async(UserId, SessionId, Rating) => {
            try {
                const query = `
            INSERT INTO rating
            (UserId, SessionId, Rating, CreatedAt, IsDeleted) 
            VALUES 
            (?, ?, ?, NOW(), 0);
        `;
                const result = await executeQuery(query, [UserId, SessionId, Rating]);
                return result;
            } catch (err) {
                throw new Error("Error creating rating: " + err.message);
            }
        };
        const createRating = async(UserId, SessionId, Rating) => {
            try {
                const query = ` INSERT INTO Rating (UserId, SessionId, Rating, CreatedAt)  VALUES  (?, ?, ?, NOW());`;
                await executeQuery(query, [UserId, SessionId, Rating]);
                return true;
            } catch (err) {
                throw new Error("Error Rating session: " + err.message);
            }
        };

        const getRating = async() => {
                try {
                    const query = `SELECT * FROM Rating WHERE IsDeleted = false`;
                    const result = await executeQuery(query, []);
                    return result;
                } catch (err) {
                    throw new Error("Error fetching rating: " + err.message);
                }

                // Function to get all Rating
                const getRating = async() => {
                    try {
                        const query = `SELECT UserId, SessionId, Rating FROM rating WHERE IsDeleted = ?`;
                        const result = await executeQuery(query, [false]);
                        return result;
                    } catch (err) {
                        throw new Error("Error fetching ratings: " + err.message);
                    }
                };

                const getRatingById = async(id) => {
                        try {
                            const query = `SELECT * FROM Rating WHERE Id = ? AND IsDeleted = false`;
                            const result = await executeQuery(query, [id]);
                            return result;
                        } catch (err) {
                            throw new Error("Error fetching rating by ID: " + err.message);
                        }
                        // Function to retrieve a specific rating by its ID
                        const getRatingById = async(id) => {
                            try {
                                const query = `SELECT UserId, SessionId, Rating FROM rating WHERE Id = ? AND IsDeleted = ?`;
                                const result = await executeQuery(query, [false]);
                                return result;
                            } catch (err) {
                                throw new Error("Error fetching rating by ID: " + err.message);
                            }
                        };

                        const updateRating = async(UserId, Rating) => {
                                try {
                                    let query = `UPDATE Rating SET Rating=? WHERE UserId=?`;

                                    await executeQuery(query, [Rating, UserId]);
                                    return true;
                                } catch (err) {
                                    throw new Error("Error updating rating: " + err.message);
                                }
                                // Function to update a specific Rating
                                const updateRating = async(id, UserId, SessionId, Rating) => {
                                    try {
                                        let query = `UPDATE rating SET UserId=?, SessionId=?, Rating=? WHERE id=?`;

                                        const result = await executeQuery(query, [
                                            UserId,
                                            SessionId,
                                            Rating,
                                            id,
                                        ]);
                                        return result;
                                    } catch (err) {
                                        throw new Error("Error updating Rating: " + err.message);
                                    }
                                };

                                const deleteRating = async(id) => {
                                        try {
                                            const query = `UPDATE Rating SET IsDeleted = true WHERE Id = ? `;
                                            const result = await executeQuery(query, [id]);
                                            return result;
                                        } catch (err) {
                                            throw new Error("Error deleting Rating: " + err.message);
                                        }
                                        const deleteRating = async(id) => {
                                            try {
                                                const query = `UPDATE rating SET IsDeleted = true WHERE Id = ?`;
                                                const result = await executeQuery(query, [id]);
                                                return result;
                                            } catch (err) {
                                                throw new Error("Error deleting rating: " + err.message);
                                            }
                                        };

                                        const sessionRatingAvg = async(sessionId) => {
                                            try {
                                                const getRatingQuery = `SELECT AVG(Rating) AS Rating,COUNT(UserId) AS NoOfRatings from Rating WHERE sessionid=? Group By sessionid`;
                                                const getRatingResult = await executeQuery(getRatingQuery, [sessionId]);

                                                const updateSessionRatingQuery = `UPDATE Session SET Rating=? ,NumberOfRating=? WHERE id=? `;
                                                await executeQuery(updateSessionRatingQuery, [
                                                    getRatingResult[0].Rating,
                                                    getRatingResult[0].NoOfRatings,
                                                    sessionId,
                                                ]);

                                                return getRatingResult;
                                            } catch (err) {
                                                throw new Error("Error deleting session: " + err.message);
                                            }
                                        };
                                        module.exports = {
                                            createRating,
                                            getRating,
                                            getRatingById,
                                            updateRating,
                                            deleteRating,
                                            ifExist,
                                            sessionRatingAvg,
                                        };