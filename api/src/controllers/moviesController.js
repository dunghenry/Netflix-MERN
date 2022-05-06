const Movie = require('../models/Movie');
const logEvents = require('../helpers/logEvents');
const moviesController = {
    getAllMovies: async (req, res) => {
        try {
            const movies = await Movie.find({});
            return res.status(200).json(movies.reverse());
        } catch (error) {
            await logEvents(error.message, module.filename);
            return res.status(500).json(error.message);
        }
    },
    getMovie: async (req, res) => {
        try {
            const movie = await Movie.findById({ _id: req.params.id });
            if (!movie) return res.status(400).json("Movie not found!");
            return res.status(200).json(movie);
        } catch (error) {
            await logEvents(error.message, module.filename);
            return res.status(500).json(error.message);
        }
    },
    getRandomMovie: async (req, res) => {
        const type = req.query.type;
        let movie;
        try {
            if (type === 'series') {
                movie = await Movie.aggregate([
                    { $match: { isSeries: true } },
                    { $sample: { size: 1}}
                ])
            }
            else {
                movie = await Movie.aggregate([
                    { $match: { isSeries: false } },
                    { $sample: { size: 1}}
                ])
            }
            return res.status(200).json(movie);
        } catch (error) {
            await logEvents(error.message, module.filename);
            return res.status(500).json(error.message);
        }
    },
    createMovie: async (req, res) => {
        if (!req.body.title) return res.status(400).json("Missing title movie!");
        try {
            const movie = await Movie.findOne({ title: req.body.title });
            if (movie) return res.status(400).json("Movie already exists!");
            const newMovie = new Movie(req.body);
            const savedMovie = await newMovie.save();
            return res.status(200).json(savedMovie);
        } catch (error) {
            await logEvents(error.message, module.filename);
            return res.status(500).json(error.message);
        }
    },
    updateMovie: async(req, res) => {
        if (!req.body.title) return res.status(400).json("Missing title movie!");
        try {
            const movie = await Movie.findById({ _id: req.params.id });
            if (!movie) return res.status(404).json("Movie not found!");
            const movieUpdate = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
            return res.status(200).json(movieUpdate)
        } catch (error) {
            await logEvents(error.message, module.filename);
            return res.status(500).json(error.message);
        }
    },
    deleteMovie: async (req, res) => {
         try {
            const movie = await Movie.findById({ _id: req.params.id });
            if (!movie) return res.status(404).json("Movie not found!");
            await Movie.findByIdAndDelete(req.params.id);
            return res.status(200).json("Deleted movie successfully!");
        } catch (error) {
            await logEvents(error.message, module.filename);
            return res.status(500).json(error.message);
        }
    }
}

module.exports = moviesController;