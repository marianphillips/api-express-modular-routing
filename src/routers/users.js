const express = require("express");
const router = express.Router();
const data = require("../../data");

router.get("/", (req, res) => {
  res.json({ users: data.users });
});

router.get("/:userId", (req, res) => {
  const user = data.users.find(
    (user) => user.id === parseInt(req.params.userId)
  );
  res.send(user);
});

router.post("/", (req, res) => {
  const newUser = {
    id: data.users.length + 1,
    email: req.body.email,
  };
  data.users.push(newUser);
  res.send(data.users);
});

router.delete("/:id", (req, res) => {
  const numberId = parseInt(req.params.id)
    let deletedUser = data.users.find(user => user.id === numberId)

  if(!deletedUser) {
      res.status(404)
      res.json({error: "user not found"})
      return
  }

  data.users = data.users.filter((user) => user.id !== parseInt(req.params.id));
  res.json(deletedUser);
});

router.put("/:id", (req, res) => {
    const numberId = parseInt(req.params.id)

  const existingUser = data.users.find(user => user.id === numberId);

  if(!existingUser) {
    res.status(404)
    res.json({error: "user does not exist"})
    return
  }

  if(!req.body.email) {
    res.status(404)
    res.json({error: "no email supplied"})
    return
  }

  
  existingUser.email = req.body.email;
  
  res.json({ user: existingUser });
});

module.exports = router;
