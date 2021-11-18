import express from 'express'
import Covid from '../models/covidData.js'

const router = express()

//Get
router.get('/', async (req, res) => {
    try{
        const covid = await Covid.find()
        res.json(covid)
    } catch(err) {
        res.status(500).json({ message: err.message})
    }
})

//Get one
router.get('/:id', getCovid, (req, res) => {
    res.json(res.covid)
})

//Post
router.post('/', async (req, res) => {
    const covid = new Covid({
        local_new_cases: req.body.local_new_cases,
        local_total_cases: req.body.local_total_cases,
        local_total_number_of_individuals_in_hospitals: req.body.local_total_number_of_individuals_in_hospitals,
        local_deaths: req.body.local_deaths,
        local_new_deaths: req.body.local_new_deaths,
        local_recovered: req.body.local_recovered,
        local_active_cases: req.body.local_active_cases,
        total_pcr_testing_count: req.body.total_pcr_testing_count
    })

    try{
        const newCovid = covid.save()
        res.status(201).json(newCovid)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//Patch
router.patch('/:id', getCovid, async (req, res) => {
    if(req.body.local_new_cases != null){
        res.body.local_new_cases = req.body.local_new_cases
    }
    if(req.body.local_total_cases != null){
        res.body.local_total_cases = req.body.local_total_cases
    }
    if(req.body.local_total_number_of_individuals_in_hospitals != null){
        res.body.local_total_number_of_individuals_in_hospitals = req.body.local_total_number_of_individuals_in_hospitals
    }
    if(req.body.local_deaths != null){
        res.body.local_deaths = req.body.local_deaths
    }
    if(req.body.local_new_deaths != null){
        res.body.local_new_deaths = req.body.local_new_deaths
    }
    if(req.body.local_recovered != null){
        res.body.local_recovered = req.body.local_recovered
    }
    if(req.body.local_active_cases != null){
        res.body.local_active_cases = req.body.local_active_cases
    }
    if(req.body.total_pcr_testing_count != null){
        res.body.total_pcr_testing_count = req.body.total_pcr_testing_count
    }

    try{

        const updateCovid =  await res.covid.save()
        res.json(updateCovid)

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//Delete
router.delete('/:id', getCovid, async (req, res) => {
    try{
        await res.covid.remove()
        res.json({ message: 'Post has been removed' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getCovid (req, res, next) {
    let covid
    try{
        covid = await Covid.findById(req.params.id)
        if(covid == null){
            return res.status(404).json({ message: 'Cannot find Covid Data' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.covid = covid
    next()
}

export default router
