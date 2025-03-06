const save = (keyOrData, data = null) => {
  if (data === null && Object.keys(keyOrData).length === 1) {
    const key = Object.keys(keyOrData)[0]
    const value = Object.values(keyOrData)[0]
    window.localStorage.setItem(key, JSON.stringify(value))
  } else if (data) {
    window.localStorage.setItem(keyOrData, JSON.stringify(data))
  }
}

const load = (key) => {
  const existing = window.localStorage.getItem(key)
  return existing ? JSON.parse(existing) : null
}

const remove = (key) => window.localStorage.removeItem(key)

const addToExisting = (key, data) => {
  if (key && data) {
    let existing = JSON.parse(localStorage.getItem(key))
    if (existing) {
      existing = Array.isArray(existing) ? existing : [existing]
      const newData = Array.isArray(data) ? data : [data]
      save(key, [...existing, ...newData])
    } else {
      save(key, data)
    }
  }
}

export { save, addToExisting, load, remove }