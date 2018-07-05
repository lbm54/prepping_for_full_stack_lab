import { Router } from "express";
let router = Router();
import chirpStore from "../../../chirpstore";
import db from "../db";

router.get("/:id?", async (req, res) => {
  let id = req.params.id;
  let queryAll =
    "select u.name as name, c.text as body, c.id from chirps c join users u on c.userid = u.id";
  let querySingle = `select u.name as name, c.text as body, c.id from chirps c join users u on c.userid = u.id where c.id=${id}`;
  let result = id ? await db.select(querySingle) : await db.select(queryAll);
  res.send(result);
  // res.send((id) ? chirpStore.GetChirp(id) : chirpStore.GetChirps());
});

router.get("/mentions/:userid", async (req, res) => {
  let id = req.params.userid;
  let query = `CALL spUserMentions(${id})`;
  let result = await db.retrieveChirpsUserIsMentionedIn(query);
  res.send(result);
});

router.post("/", async (req, res) => {
  // chirpStore.CreateChirp(req.body);
  let name = req.body.name;
  let body = req.body.body;
  try {
    let userId = await db.getIdFromUsername(name);
    let query = `insert into chirps(userid, text) values(${userId}, '${body}')`;
    let chirpId = await db.insert(query);
    if (body.includes("@")) {
      let tokens = body.split(" ");
      tokens.forEach(token => {
        if (token.startsWith("@")) {
          let name = token.substr(1, token.length);
          db.getIdFromUsername(name).then(id => {
            if (id) {
              let query = `insert into mentions(userid, chirpid) values(${id}, ${chirpId})`;
              db.insert(query);
            }
          });
        }
      });
    }
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.post("/mentions", async (req, res) => {
  let userid = req.body.userid;
  let chirpid = req.body.chirpid;
  let query = `insert into mentions(userid, chirpid) values('${userid}', '${chirpid}'`;
  let result = await db.insert(query);
  res.send(result);
  res.sendStatus(200);
});

router.put("/:id", async (req, res) => {
  let id = req.params.id;
  let body = req.body.body;
  let query = `update chirps set text='${body}' where id=${id}`;
  let result = await db.insert(query);
  // res.send(result);
  // chirpStore.UpdateChirp(id, req.body);
  res.sendStatus(200);
});

router.delete("/:id", async (req, res) => {
  let id = req.params.id;
  let query = `delete from chirps where id=${id}`;
  let result = await db.insert(query);
  res.send(result);
  // chirpStore.DeleteChirp(id);
  res.sendStatus(200);
});

export default router;
