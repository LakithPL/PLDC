import express from 'express'
import Post from '../models/post.js'

const router = express()

//Get
router.get('/', async (req, res) => {
    try{
        const posts = await Post.find()
        res.json(posts)
    } catch(err) {
        res.status(500).json({ message: err.message})
    }
})
//Get one
router.get('/:id', getPost, (req, res) => {
    res.json(res.post)
})
//Post
router.post('/', async (req, res) => {
    const post = new Post({
        postHeader: req.body.postHeader,
        postBody: req.body.postBody
    })

    try{
        const newPost = post.save()
        res.status(201).json(newPost)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
//Patch
router.patch('/:id', getPost, async (req, res) => {
    if(req.body.postHeader != null){
        res.post.postHeader = req.body.postHeader
    }
    if(req.body.postBody != null){
        res.post.postBody = req.body.postBody
    }

    try{

        const updatePost =  await res.post.save()
        res.json(updatePost)

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
//Delete
router.delete('/:id', getPost, async (req, res) => {
    try{
        await res.post.remove()
        res.json({ message: 'Post has been removed' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getPost (req, res, next) {
    let post
    try{
        post = await Post.findById(req.params.id)
        if(post == null){
            return res.status(404).json({ message: 'Cannot find Posts' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.post = post
    next()
}

export default router