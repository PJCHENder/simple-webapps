const express = require('express')
const router = express.Router({mergeParams: true})
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const passport = require('passport')
const Model = require('../../models')

/**
 * GET /v1.0/note/
 * 用來取得 User 的 Note
 */

router.get('/', jsonParser, (req, res, next) => {
  // Custom Passport Response
  passport.authenticate('jwt', (err, user, info) => {
    if (err) { return next(err) }

    // 如果找不到 User
    if (!user) {
      return res.status(401).json({
        status: 401,
        message: info.message
      })
    }

    // 如果有找到 User，找出使用者的 Note
    const query = Model.Note.findOne({user: user._id})

    query.exec((err, note) => {
      if (err) {
        return next(err)
      }

      // 如果找不到 Note
      if (!note) {
        return res.status(200).json({
          status: 400,
          message: 'Could not find the Note. Please create Note first.'
        })
      }

      return res.status(200).json({
        status: 200,
        message: 'get Note',
        note: note.noteContent,
        updated_at: note.updated_at
      })
    })
  })(req, res, next)/* /custom Passport Response */
})

/**
 * POST /v1.0/note/
 * 用來建立 User 的 Note
 */
router.post('/', jsonParser, (req, res, next) => {
  /* Custom Passport Response */
  passport.authenticate('jwt', (err, user, info) => {
    if (err) { return next(err) }

    // 如果找不到 User
    if (!user) {
      return res.status(401).json({
        status: 400,
        message: info.message
      })
    }

    // 如果找到 User ，但 Note 尚未建立
    const query = Model.Note.findOne({user: user._id})
    query.exec((err, note) => {
      if (err) {
        return next(err)
      }

      if (!note) {
        // 如果找不使用者的色票，則在資料庫中建立新的色票檔
        let newNote = new Model.Note({
          note: '',
          user: user._id
        })

        newNote.save(function (err, newNote) {
          if (err) {
            return next(err)
          }

          res.status(200).json({
            status: 200,
            message: 'Create New Note',
            newNote
          })
        })
      } else {
        // 如果使用者 Note 已存在
        return res.status(200).json({
          status: 200,
          message: 'Note Already Exists',
          note
        })
      }
    })
  })(req, res, next)/* /Custom Passport Response */
})

/**
 * PUT /v1.0/note/
 * 用來更新使用者的色票檔
 */
router.put('/', jsonParser, (req, res, next) => {
  /* Custom Passport Response */
  passport.authenticate('jwt', (err, user, info) => {
    if (err) { return next(err) }

    // 如果找不到 User
    if (!user) {
      return res.status(401).json({
        status: 401,
        message: info.message
      })
    }

    const query = Model.Note.findOne({user: user._id})
    query.exec((err, note) => {
      if (err) {
        return next(err)
      }
      // 找到 User ，但 Note 尚未建立
      if (!note) {
        return res.status(200).json({
          status: 400,
          message: 'Note not created yet'
        })
      }

      // 如果使用者 Note 已存在

      if (req.body.noteContent) {
        note.noteContent = req.body.noteContent
        note.save((err, note) => {
          if (err) {
            return next(err)
          }

          return res.status(200).json({
            status: 200,
            message: 'Note save successfully',
            updated_at: note.updated_at,
            note
          })
        })
      } else {
        return res.status(200).json({
          status: 400,
          message: 'Wrong format of note'
        })
      }
    })
  })(req, res, next)/* /Custom Passport Response */
})

module.exports = router
