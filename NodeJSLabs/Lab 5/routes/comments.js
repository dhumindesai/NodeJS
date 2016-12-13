

const express = require('express');
const router = express.Router();
const data = require("../data");
const commentsData = data.comments;

router.get("/recipe/:id", (req, res) => {
    commentsData.getAllCommentsByrecipeId(req.params.id).then((commentList) => {
        res.json(commentList);
    }, () => {
        // Something went wrong with the server!
        res.sendStatus(500);
    });
});

router.get("/:id", (req, res) => {
    commentsData.getCommentById(req.params.id).then((comment) => {
        res.json(comment);
    }, () => {
        // Something went wrong with the server!
        res.sendStatus(404)
        //res.send(""+error);
    });
});

router.post("/:id", (req, res) => {
    let commentInfo = req.body;

    if (!commentInfo) {
        res.status(400).json({ error: "You must provide data to create a comment" });
        return;
    }

    if (!commentInfo.comment) {
        res.status(400).json({ error: "You must provide some comment" });
        return;
    }

    if (!commentInfo.poster) {
        res.status(400).json({ error: "You must provide poster's name" });
        return;
    }

    commentsData.addCommentByRecipeId(req.params.id, commentInfo)
        .then((newComment) => {
            res.json(newComment);
        }, () => {
            res.sendStatus(500);
        });
});

router.put("/:rid/:cid", (req, res) => {
    let commentInfo = req.body;

    if (!commentInfo) {
        res.status(400).json({ error: "You must provide data to create a comment" });
        return;
    }

    updateCommentItems = Object.keys(commentInfo);
    updateCommentItems.forEach((item) => {
        if (item != 'comment' && item != 'poster') {
            res.status(400).json({ error: `Invalid update item requested : ${item}` });
            return;
        }
    });
    let getComment = commentsData.getCommentById(req.params.cid).then(() => {
        return commentsData.updateComment(req.params.rid, req.params.cid, commentInfo)
            .then((updatedComment) => {
                res.json(updatedComment);
            }, (error) => {
                //res.send(""+error);
                res.sendStatus(500);
            });
    }).catch((error) => {
        //res.send(""+error);
        res.status(404).json({ error: "Comment not found" });
    });

});

router.delete("/:id", (req, res) => {
    let comment = commentsData.getCommentById(req.params.id).then(() => {
        return commentsData.removeComment(req.params.id)
            .then(() => {
                res.sendStatus(200);
            }).catch((error) => {
                res.send(""+error);
                //res.sendStatus(500);
            });

    }).catch((error) => {
        res.send(""+error);
        //res.status(404).json({ error: "Comment not found" });
    });
});

/*
router.get("/", (req, res) => {
    classesData.getAllCourseCodes().then((codeList) => {
        res.json(codeList);
    }, () => {
        // Something went wrong with the server!
        res.sendStatus(500);
    });
});

router.get("/details", (req, res) => {
    classesData.getCourseDetailsByCode(req.query.code).then((info) => {
        res.json(info);
    }, (error) => {
        // Not found!
        res.sendStatus(404);
    });
});

router.post("/", (req, res) => {
    // Not implemented
    res.sendStatus(501);
});
*/
module.exports = router;
