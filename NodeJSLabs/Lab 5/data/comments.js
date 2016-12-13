
const mongoCollections = require("../config/mongoCollections");
const recipes = mongoCollections.recipes;
const recipeFunctions = require("./recipes");
const uuid = require('node-uuid');

// function to add a new class in the classes collection
module.exports.getAllCommentsByrecipeId = (id) => {
  return recipeFunctions.getRecipeById(id).then((currentRecipe) => {
      let commentsList = [];
      currentRecipe.comments.forEach((comm) => {
          let eachComment = {};
          eachComment._id = comm._id;
          eachComment.recipeId = id;
          eachComment.reciipeTitle = currentRecipe.title;
          eachComment.comment = comm.comment;
          eachComment.poster = comm.poster;
          commentsList.push(eachComment);
      });
      return commentsList;
  });
}

module.exports.getCommentById = (id) => {

  return recipes().then((recipeCollection) => {
    return recipeCollection.findOne({"comments._id": id}).then((recipe) => {
      let commentsList = recipe.comments;
      let commentFilter = (list) => {
          let setComment = {};
          list.forEach((com) => {
              if (com._id == id) {
                  setComment = com;
              } 
          });
          return setComment;
      };
      let useComment = commentFilter(commentsList);

      let sendComment = {};
      sendComment._id = id;
      sendComment.recipeId = recipe._id;
      sendComment.reciipeTitle = recipe.title;
      sendComment.comment = useComment.comment;
      sendComment.poster = useComment.poster;

      return sendComment;
    });
  });
}

module.exports.addCommentByRecipeId = (id, newComment) => {
    return recipes().then((recipeCollection) => {
        let newCommentData = {
            _id: uuid.v4(),
            poster: newComment.poster,
            comment: newComment.comment
        };

        return recipeCollection.update({_id: id}, {$push: {"comments": newCommentData}})
        .then(() => {
            return this.getCommentById(newCommentData._id);
        });
    });
}

module.exports.updateComment = (rid, cid, updateComment) => {
    return recipes().then((recipeCollection) => {
        let updatedCommentData = {};

        if (updateComment.comment) {
            updatedCommentData['comments.$.comment'] = updateComment.comment
        }
        if (updateComment.poster) {
            updatedCommentData['comments.$.poster'] = updateComment.poster;
        }
        
        let updateCommand = { 
            $set: updatedCommentData
        };

        return recipeCollection.update({ _id: rid, 'comments._id': cid }, updateCommand).then(() => {
            return recipeFunctions.getRecipeById(rid);
        });
    });
}

module.exports.removeComment = (id) => {
    return recipes().then((recipeCollection) => {
        return recipeCollection.findOne({"comments._id": id}).then((currentRecipe) => {
            return recipeCollection.update({ _id: currentRecipe._id}, {$pull: {"comments":{_id: id}}}).then(() => {
                return recipeFunctions.getRecipeById(currentRecipe._id);
            });
        });
    });
}








  /*return recipes().then((recipeCollection) => {
      //return recipeCollection.findOne({"comments._id": id})
      return recipeCollection.findOne({_id: id})
      .then((currentRecipe) => {
        
          let commentsList = currentRecipe.comments;
          let useComment = (commentsList) => {
              commentsList.forEach((comment) => {
                  if (comment._id == id) {
                      return comment;
                  } 
              });
          };
          let sendComment = {};
          sendComment._id = id;
          sendComment.recipeId = currentrecipe._id;
          sendComment.reciipeTitle = currentrecipe.title;
          sendComment.comment = useComment.comment;
          eachComment.poster = useComment.poster;
          
          return currentRecipe;
      });
  });*/

/*
module.exports.addCommentByRecipeId = (id, newComment) => {
        return comments().then((commentCollection) => {
            let newCommentData = {
                _id: uuid.v4(),
                poster: newComment.poster,
                comment: newComment.comment
            };

            return recipeCollection.update({_id: id}, {$push: {"comments": newCommentData}})
            .then(() => {
                return this.getCommentById(newCommentData._id);
            });
        });
    }
/*
// function to add a new class in the classes collection
module.exports.addClass = (code, name, prof, desc) => {
  if (!code)
      return Promise.reject("You must provide a course code for the class");
  if (!name)
      return Promise.reject("You must provide a course name for the class");
  if (!prof)
      return Promise.reject("You must provide name of the professor for the class");
  if (!desc)
      return Promise.reject("You must provide a description for the class");
  if (desc.length === 0)
      return Promise.reject("You must provide a valid description about the class");
  
  return classes()
  .then((classesCollection) => {
    let newClass = {
        _id: uuid.v4(),
        code: code,
        name: name,
        prof: prof,
        desc: desc
    };

    return classesCollection.insertOne(newClass)
    .then((newInsertInformation) => {
      return newInsertInformation.insertedId;
    })
    .then((newId) => {
      return this.getClassById(newId);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
  })
  .catch((error) => {
    return Promise.reject(error);
  });
};

// function to get the list of all course codes from the classes collection
module.exports.getAllCourseCodes = () => {
  return classes()
  .then((classesCollection) => {
    return new Promise((fullfill, reject) => {
        let courseCodeList = [];
        let cursor = classesCollection.find();
        cursor.each((err, course) => {
            if(course === null)
                fullfill(courseCodeList);
            else
                courseCodeList.push(course['code']);
        });
    });
  })
  .catch((error) => {
    return Promise.reject(error);
  });
};

// function to get the list of all classes from the classes collection
module.exports.getAllClasses = () => {
  return classes()
  .then((classesCollection) => {
    return new Promise((fullfill, reject) => {
        let classList = [];
        let cursor = classesCollection.find();
        cursor.each((err, course) => {
            if(course === null)
                fullfill(classList);
            else
                classList.push(course);
        });
    });
  })
  .catch((error) => {
    return Promise.reject(error);
  });
};

// function to get the class from the classes collection based on id
module.exports.getClassById = (id) => {
  if (!id)
      return Promise.reject("You must provide an id to search for");

  return classes()
  .then((classesCollection) => {
      return classesCollection.findOne({_id: id});
  })
  .then((course) => {
    return new Promise((fullfill, reject) => {
      if(course === null)
        reject("No class exists for the provided id");
      else
        fullfill(course);
    });
  })
  .catch((error) => {
    return Promise.reject(error);
  });
};

// function to get the course details from the classes collection based on course code
module.exports.getCourseDetailsByCode = (course_code) => {
  if (!course_code)
      return Promise.reject("You must provide a course code to search for");

  return classes()
  .then((classesCollection) => {
      return classesCollection.findOne({code: course_code});
  })
  .then((course) => {
    return new Promise((fullfill, reject) => {
      details = {};

      if(course === null)
        reject("No class exists for the provided course code");
      else
        details['name'] = course['name'];
        details['professor'] = course['prof'];
        details['description'] = course['desc'];
        fullfill(details);
    });
  })
  .catch((error) => {
    return Promise.reject(error);
  });
};

// function to remove a class from the classes collection based on id
module.exports.removeClass = (id) => {
  if (!id)
      return Promise.reject("You must provide an id for the class to be removed");

  return classes()
  .then((classesCollection) => {
      return classesCollection.removeOne({_id: id})
      .then((deletionInfo) => {
        return new Promise((fullfill, reject) => {
          if (deletionInfo.deletedCount === 0)
              reject(`Could not delete class with id of ${id}`);
          else
              fullfill(id);
        });
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  })
  .catch((error) => {
    return Promise.reject(error);
  });
};
*/