import mongoose from 'mongoose';

const covidSchema = new mongoose.Schema({
    local_new_cases: {
        type: Number,
        required: true
    },
    local_total_cases: {
        type: Number,
        required: true
    },
    local_total_number_of_individuals_in_hospitals: {
        type: Number,
        required: true
    },
    local_deaths: {
        type: Number,
        required: true
    },
    local_new_deaths: {
        type: Number,
        required: true
    },
    local_recovered: {
        type: Number,
        required: true
    },
    local_active_cases: {
        type: Number,
        required: true
    },
    total_pcr_testing_count: {
        type: Number,
        required: true
    }
})

export default mongoose.model('Covid', covidSchema)