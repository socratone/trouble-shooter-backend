const express = require('express');
const router = express.Router();
const { query } = require('../database/model');
const auth = require('../auth');

router.get('/home', async (req, res) => {
  try {
    const sql = `
      SELECT id, title, category, createdAt 
      FROM item ORDER BY createdAt DESC LIMIT 10`;
  
    const items = await query(sql);

    res.status(200).send(items);
  } catch (error) {
    res.status(500).send({ error: { message: error.message }});
  }
});

router.get('/troubles', async (req, res) => {
  try {
    const sql = `
      SELECT id, title, category, createdAt 
      FROM item WHERE category IN (
        'html', 'css', 'js', 'mysql', 'sqlite', 'mongodb', 'nodejs', 'webpack',
        'babel', 'jest', 'electron', 'aws'
      )
      ORDER BY createdAt DESC`;
  
    const items = await query(sql);

    res.status(200).send(items);
  } catch (error) {
    res.status(500).send({ error: { message: error.message }});
  }
});

router.get('/beginner', async (req, res) => {
  try {
    const sql = `
      SELECT id, title, category, createdAt 
      FROM item WHERE category IN (
        'basic'
      )
      ORDER BY createdAt DESC`;
  
    const items = await query(sql);

    res.status(200).send(items);
  } catch (error) {
    res.status(500).send({ error: { message: error.message }});
  }
});

router.get('/algorithm', async (req, res) => {
  try {
    const sql = `
      SELECT id, title, category, createdAt 
      FROM item WHERE category IN (
        'algorithm'
      )
      ORDER BY createdAt DESC`;
  
    const items = await query(sql);

    res.status(200).send(items);
  } catch (error) {
    res.status(500).send({ error: { message: error.message }});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sql = `
      SELECT id, title, category, createdAt, page 
      FROM item WHERE id = ?`;
  
    const items = await query(sql, [id]);

    if (items.length === 0) {
      return res.status(404).send({ error: { message: '해당 id가 없습니다.' }});
    }

    res.status(200).send(items[0]);
  } catch (error) {
    res.status(500).send({ error: { message: error.message }});
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { title, category, page } = req.body;

    const sql = `
      INSERT INTO item (title, category, createdAt, page) 
      VALUES (?, ?, NOW(), ?)`;

    const result = await query(sql, [title, category, page]);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: { message: error.message }});
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, page } = req.body;
    
    const sql = `
      UPDATE item SET title = ?, category = ?, page = ? WHERE id = ?`;

    const results = await query(sql, [title, category, page, id]);
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send({ error: { message: error.message }});
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const sql = 'DELETE FROM item WHERE id = ?';

    const results = await query(sql, [id]);
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send({ error: { message: error.message }});
  }
});

module.exports = router;