exports.s3Upload = async (req, res, next) => {
    try {
        console.log(req.file);
        res.json({imageUrl: req.file.location});
    } catch (e) {
        next(e);
    }
}