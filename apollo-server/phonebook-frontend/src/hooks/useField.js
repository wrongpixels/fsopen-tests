import { useState } from 'react'

const useField = (type, name = '') => {
  const [value, setValue] = useState('')
  const onChange = (e) => setValue(e.target.value)
  const clear = () => setValue('')
  return {
    value,
    props: { value, type, name, onChange },
    functions: { clear },
  }
}
export default useField
