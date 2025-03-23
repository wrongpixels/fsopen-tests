

case 'UPDATE': {
    updateNotes()
    return null
}

case 'DO_UPDATE': {
    return action.payload
}

const updateNotes = async () => {
    const response = await axios.get(URL)
    dispatch(doUpdate(response.data))
}

const doUpdate = (gotNotes) => {
    return {
        type: 'DO_UPDATE',
        payload: gotNotes
    }
}


