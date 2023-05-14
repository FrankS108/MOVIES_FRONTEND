import axios from "axios";

let values = [];

const handleRatingJorge = async(url) => {
    await axios.get(url).then((response) => {
        let value = scaleValue(response.data.rates, [0, 10], [0, 5]);
        values.push(value);
    })
}

const handleRatingCesar = async(url) => {
    await axios.get(url).then((response) => {
        
    })
}

const handleRatingCarlos= async(url) => {
    await axios.get(url).then((response) => {
        let value = response.data.local_rating;
        values.push(value);
    })
}

const handleRatingAngel = async(url) => {
    await axios.get(url).then((response) => {
        console.log(response.data)
    })
}

const handleRatingEdgar = async(url) => {
    await axios.get(url).then((response) => {
        console.log(response.data)
    })
}

const handleRatingCarlo = async(url) => {
    await axios.get(url).then((response) => {
        let value = response.data.rating;
        values.push(value);
        
    })
}

const setValues = (setRatingAll) => {
    console.log(values);
    setRatingAll(values);
}

function scaleValue(value, from, to) {
    var scale = (to[1] - to[0]) / (from[1] - from[0]);
    var capped = Math.min(from[1], Math.max(from[0], value)) - from[0];
    return ~~(capped * scale + to[0]);
}

const clean = () => {
    values = [];
}

export{
    handleRatingJorge,
    handleRatingCarlos,
    handleRatingCarlo,
    clean,
    setValues
}